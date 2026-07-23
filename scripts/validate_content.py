#!/usr/bin/env python3
"""Validate local content files before publishing."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
import re
import shutil
import subprocess
import sys
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {".git", "_site", ".jekyll-cache", ".bundle", "node_modules", ".tmp-npm-cache", "vendor"}
CONTENT_DIRS = ["_posts", "_notes", "_til"]
DANGEROUS_HTML = [
    re.compile(r"<\s*script\b", re.I),
    re.compile(r"<\s*iframe\b", re.I),
    re.compile(r"\son[a-z]+\s*=", re.I),
    re.compile(r"javascript\s*:", re.I),
]
SENSITIVE_PATTERNS = [
    re.compile(r"(^|/)\.env(\.|$)", re.I),
    re.compile(r"\.(sqlite|sqlite3|db)$", re.I),
    re.compile(r"(id_rsa|id_dsa|private[_-]?key|secret|token)", re.I),
]
BLOCKED_EXTS = {".mp4", ".mov", ".avi", ".zip", ".rar", ".7z", ".pt", ".pth", ".onnx", ".safetensors", ".sqlite", ".sqlite3", ".db"}


def find_ruby() -> str | None:
    ruby = shutil.which("ruby")
    if ruby:
        return ruby
    candidate = Path(r"C:\Ruby34-x64\bin\ruby.exe")
    return str(candidate) if candidate.exists() else None


def ruby_yaml(path: Path):
    ruby = find_ruby()
    if not ruby:
        raise RuntimeError("未找到 Ruby，无法执行完整 YAML 解析。")
    code = (
        "require 'yaml'; require 'json'; require 'date'; "
        "data = YAML.safe_load_file(ARGV[0], permitted_classes: [Date, Time], aliases: true); "
        "puts JSON.generate(data)"
    )
    result = subprocess.run([ruby, "-e", code, str(path)], capture_output=True, text=True, encoding="utf-8")
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or result.stdout.strip())
    return json.loads(result.stdout)


def front_matter(path: Path) -> tuple[dict, str]:
    text = path.read_text(encoding="utf-8", errors="replace")
    match = re.match(r"\A---\s*\n(.*?)\n---\s*\n", text, re.S)
    if not match:
        return {}, text
    tmp = path.parent / f".{path.name}.frontmatter.tmp.yml"
    tmp.write_text(match.group(1), encoding="utf-8")
    try:
        data = ruby_yaml(tmp)
        return (data or {}), text[match.end():]
    finally:
        tmp.unlink(missing_ok=True)


def valid_url(value: str) -> bool:
    parsed = urlparse(str(value))
    return parsed.scheme in {"http", "https"} and bool(parsed.netloc)


def validate(root: Path) -> tuple[list[str], list[str]]:
    errors: list[str] = []
    warnings: list[str] = []
    root = root.resolve()

    for yaml_rel in ["_data/projects.yml", "_data/elsewhere.yml"]:
        path = root / yaml_rel
        if path.exists():
            try:
                ruby_yaml(path)
            except Exception as exc:
                errors.append(f"{yaml_rel}: YAML 无法解析：{exc}")

    seen_slugs: dict[str, str] = {}
    rules = {
        "_posts": (re.compile(r"^\d{4}-\d{2}-\d{2}-[a-z0-9][a-z0-9-]*(?:\.en)?\.md$"), ["title", "date", "description", "lang"]),
        "_notes": (re.compile(r"^[a-z0-9][a-z0-9-]*\.md$"), ["title", "date", "description", "lang"]),
        "_til": (re.compile(r"^\d{4}-\d{2}-\d{2}-[a-z0-9][a-z0-9-]*\.md$"), ["title", "date", "lang"]),
    }
    for dirname, (pattern, required) in rules.items():
        directory = root / dirname
        if not directory.exists():
            continue
        for path in sorted(directory.glob("*.md")):
            rel = path.relative_to(root).as_posix()
            if not pattern.match(path.name):
                errors.append(f"{rel}: 文件名不符合规则。")
            try:
                meta, body = front_matter(path)
            except Exception as exc:
                errors.append(f"{rel}: Front Matter 无法解析：{exc}")
                continue
            for field in required:
                if not str(meta.get(field, "")).strip():
                    errors.append(f"{rel}: 缺少必填字段 {field}。")
            slug = str(meta.get("slug") or re.sub(r"^\d{4}-\d{2}-\d{2}-", "", path.stem))
            if slug in seen_slugs:
                errors.append(f"{rel}: slug 与 {seen_slugs[slug]} 重复：{slug}")
            else:
                seen_slugs[slug] = rel
            if meta.get("import_status") == "needs_review":
                if dirname == "_posts":
                    errors.append(f"{rel}: 未确认导入草稿不能进入 _posts。")
                if meta.get("featured") is True:
                    errors.append(f"{rel}: 未确认导入草稿不能 featured。")
            scan_dangerous_html(rel, body, errors)
            check_local_images(root, rel, meta, body, errors)

    elsewhere_path = root / "_data" / "elsewhere.yml"
    if elsewhere_path.exists():
        try:
            items = ruby_yaml(elsewhere_path)
            if not isinstance(items, list):
                errors.append("_data/elsewhere.yml: 必须是 YAML 数组，空时使用 []。")
            else:
                validate_elsewhere(items, errors)
        except Exception:
            pass

    for path in root.rglob("*"):
        if any(part in SKIP_DIRS for part in path.relative_to(root).parts):
            continue
        rel = path.relative_to(root).as_posix()
        if path.is_file():
            if any(pattern.search(rel) for pattern in SENSITIVE_PATTERNS):
                errors.append(f"{rel}: 疑似敏感文件，禁止提交。")
            if path.suffix.lower() in BLOCKED_EXTS:
                errors.append(f"{rel}: 文件类型不适合进入仓库。")
            size = path.stat().st_size
            if path.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"} and size > 2 * 1024 * 1024:
                warnings.append(f"{rel}: 图片超过 2 MB，建议压缩。")
            if path.suffix.lower() == ".pdf" and size > 5 * 1024 * 1024:
                warnings.append(f"{rel}: PDF 超过 5 MB，建议外链或压缩。")
    return errors, warnings


def scan_dangerous_html(rel: str, text: str, errors: list[str]) -> None:
    text = re.sub(r"```.*?```", "", text, flags=re.S)
    text = re.sub(r"`[^`\n]+`", "", text)
    for pattern in DANGEROUS_HTML:
        if pattern.search(text):
            errors.append(f"{rel}: 包含危险 HTML 或脚本模式：{pattern.pattern}")


def check_local_images(root: Path, rel: str, meta: dict, body: str, errors: list[str]) -> None:
    candidates = []
    cover = meta.get("cover")
    if isinstance(cover, str) and cover.startswith("/assets/"):
        candidates.append(cover)
    candidates.extend(match.group(1) for match in re.finditer(r"!\[[^\]]*\]\((/assets/[^)]+)\)", body))
    for image in candidates:
        clean = image.split("#", 1)[0].split("?", 1)[0].lstrip("/")
        if not (root / clean).exists():
            errors.append(f"{rel}: 本地资源不存在：{image}")


def validate_elsewhere(items, errors: list[str]) -> None:
    modes = {"local", "external", "embed"}
    urls = set()
    for index, item in enumerate(items, 1):
        if not isinstance(item, dict):
            errors.append(f"_data/elsewhere.yml: 第 {index} 项必须是对象。")
            continue
        label = item.get("title") or f"第 {index} 项"
        for field in ["title", "platform", "url"]:
            if not str(item.get(field, "")).strip():
                errors.append(f"{label}: 缺少字段 {field}。")
        if not (item.get("published_at") or item.get("date")):
            errors.append(f"{label}: 缺少 published_at 或 date。")
        if not (item.get("category") or item.get("type")):
            errors.append(f"{label}: 缺少 category 或 type。")
        mode = item.get("content_mode") or "external"
        if mode not in modes:
            errors.append(f"{label}: content_mode 必须是 local、external 或 embed。")
        url = str(item.get("url", ""))
        if url:
            if not valid_url(url):
                errors.append(f"{label}: URL 无效：{url}")
            if url in urls:
                errors.append(f"{label}: 外部 URL 重复：{url}")
            urls.add(url)


def build_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="校验 Jekyll 内容、外部链接数据和本地资源安全。")
    parser.add_argument("--root", default=str(ROOT), help="项目根目录。")
    return parser.parse_args()


def main() -> int:
    args = build_args()
    errors, warnings = validate(Path(args.root))
    for warning in warnings:
        print(f"WARNING: {warning}")
    if errors:
        print("内容校验失败：", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1
    print("OK: 内容校验通过。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
