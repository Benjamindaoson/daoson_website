#!/usr/bin/env python3
"""Create local content files for the Jekyll site.

This script is intentionally local-only. It writes Markdown/YAML into the
repository, never commits, never pushes, never stores tokens, and never calls
network APIs.
"""

from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import os
from pathlib import Path
import re
import shutil
import sys
import unicodedata
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]
TYPES = {
    "post": "正式文章",
    "note": "技术笔记",
    "til": "每日所学",
    "external": "外部文章链接",
    "project": "项目数据草稿",
}
FORBIDDEN_DIRS = {".git", "_site", "vendor", "node_modules", ".bundle", ".jekyll-cache"}


def today() -> dt.date:
    return dt.datetime.now(dt.timezone(dt.timedelta(hours=8))).date()


def now_text() -> str:
    return dt.datetime.now(dt.timezone(dt.timedelta(hours=8))).strftime("%Y-%m-%d %H:%M:%S +0800")


def ensure_inside_root(root: Path, path: Path) -> Path:
    root = root.resolve()
    path = path.resolve()
    if root != path and root not in path.parents:
        raise SystemExit(f"拒绝写入项目目录外：{path}")
    if any(part in FORBIDDEN_DIRS for part in path.relative_to(root).parts):
        raise SystemExit(f"拒绝写入受保护目录：{path}")
    return path


def safe_slug(title: str) -> str:
    normalized = unicodedata.normalize("NFKD", title)
    ascii_text = normalized.encode("ascii", "ignore").decode("ascii").lower()
    slug = re.sub(r"[^a-z0-9]+", "-", ascii_text).strip("-")
    if not slug:
        digest = hashlib.sha1(title.encode("utf-8")).hexdigest()[:10]
        slug = f"zh-{digest}"
    return slug[:80].strip("-") or "untitled"


def split_tags(value: str) -> list[str]:
    if not value:
        return []
    return [item.strip() for item in re.split(r"[,，]", value) if item.strip()]


def yaml_scalar(value):
    if isinstance(value, bool):
        return "true" if value else "false"
    if value is None:
        return '""'
    text = str(value).replace("\\", "\\\\").replace('"', '\\"')
    return f'"{text}"'


def yaml_block(data: dict) -> str:
    lines = []
    for key, value in data.items():
        if isinstance(value, list):
            if value:
                lines.append(f"{key}: [{', '.join(yaml_scalar(v) for v in value)}]")
            else:
                lines.append(f"{key}: []")
        else:
            lines.append(f"{key}: {yaml_scalar(value)}")
    return "\n".join(lines)


def markdown_file(path: Path, front_matter: dict, body: str) -> None:
    if path.exists():
        raise SystemExit(f"文件已存在，拒绝覆盖：{path}")
    path.parent.mkdir(parents=True, exist_ok=True)
    content = f"---\n{yaml_block(front_matter)}\n---\n\n{body}\n"
    path.write_text(content, encoding="utf-8", newline="\n")


def is_valid_url(url: str) -> bool:
    parsed = urlparse(url)
    return parsed.scheme in {"http", "https"} and bool(parsed.netloc)


def prompt(label: str, default: str = "") -> str:
    suffix = f" [{default}]" if default else ""
    value = input(f"{label}{suffix}：").strip()
    return value or default


def choose_type(value: str | None) -> str:
    if value:
        if value not in TYPES:
            raise SystemExit(f"未知内容类型：{value}")
        return value
    print("请选择内容类型：")
    for index, (key, label) in enumerate(TYPES.items(), 1):
        print(f"{index}. {label} ({key})")
    raw = prompt("输入编号或英文类型", "post")
    if raw.isdigit():
        keys = list(TYPES)
        idx = int(raw) - 1
        if 0 <= idx < len(keys):
            return keys[idx]
    if raw in TYPES:
        return raw
    raise SystemExit("内容类型无效。")


def optional_arg(value: str | None, label: str, default: str = "", interactive: bool = False) -> str:
    if value is not None:
        return value
    if interactive:
        return prompt(label, default)
    return default


def backup_file(path: Path) -> Path:
    stamp = dt.datetime.now().strftime("%Y%m%d%H%M%S")
    backup = path.with_name(f"{path.name}.bak-{stamp}")
    shutil.copy2(path, backup)
    return backup


def append_elsewhere(root: Path, item: dict) -> tuple[Path, Path]:
    path = ensure_inside_root(root, root / "_data" / "elsewhere.yml")
    path.parent.mkdir(parents=True, exist_ok=True)
    if not path.exists():
        path.write_text("[]\n", encoding="utf-8")
    text = path.read_text(encoding="utf-8")
    if item["url"] in text:
        raise SystemExit("外部链接已存在，拒绝重复添加。")
    backup = backup_file(path)
    rendered = render_list_item(item)
    meaningful = [line.strip() for line in text.splitlines() if line.strip() and not line.strip().startswith("#")]
    if meaningful == ["[]"]:
        lines = text.splitlines()
        for i in range(len(lines) - 1, -1, -1):
            if lines[i].strip() == "[]":
                lines[i] = rendered.rstrip()
                break
        new_text = "\n".join(lines) + "\n"
    else:
        new_text = text.rstrip() + "\n\n" + rendered
    path.write_text(new_text, encoding="utf-8", newline="\n")
    return path, backup


def render_list_item(item: dict) -> str:
    lines = []
    for index, (key, value) in enumerate(item.items()):
        prefix = "-" if index == 0 else " "
        if isinstance(value, list):
            lines.append(f"{prefix} {key}: [{', '.join(yaml_scalar(v) for v in value)}]")
        elif value != "":
            lines.append(f"{prefix} {key}: {yaml_scalar(value)}")
    return "\n".join(lines) + "\n"


def build_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="本地创建文章、笔记、TIL、外部链接或项目草稿。")
    parser.add_argument("--root", default=str(ROOT), help="项目根目录，默认自动识别。")
    parser.add_argument("--type", choices=list(TYPES), help="内容类型。")
    parser.add_argument("--title", help="标题。")
    parser.add_argument("--summary", help="摘要。")
    parser.add_argument("--category", help="分类。")
    parser.add_argument("--tags", default="", help="标签，逗号分隔。")
    parser.add_argument("--slug", help="自定义 slug。")
    parser.add_argument("--url", help="外部文章 URL。")
    parser.add_argument("--platform", help="外部平台。")
    parser.add_argument("--cover", default="", help="封面路径。")
    parser.add_argument("--date", help="发布日期，默认今天。")
    return parser.parse_args()


def main() -> int:
    args = build_args()
    root = Path(args.root).resolve()
    interactive = args.type is None
    ctype = choose_type(args.type)
    title = args.title or (prompt("标题") if interactive else "")
    if not title:
        raise SystemExit("标题不能为空。")
    slug = safe_slug(args.slug or title)
    date = args.date or today().isoformat()
    summary = optional_arg(args.summary, "摘要", "", interactive)
    category = optional_arg(args.category, "分类", "", interactive)
    tags_source = args.tags if args.tags else (prompt("标签（逗号分隔）", "") if interactive else "")
    tags = split_tags(tags_source)

    if ctype == "post":
        path = ensure_inside_root(root, root / "_posts" / f"{date}-{slug}.md")
        fm = {
            "title": title,
            "date": now_text(),
            "description": summary,
            "summary": summary,
            "category": category,
            "tags": tags,
            "lang": "zh",
            "content_mode": "local",
            "featured": False,
            "visibility": "public",
        }
        markdown_file(path, fm, "<!-- 在这里写正文。 -->")
        print(f"已创建正式文章：{path}")
    elif ctype == "note":
        path = ensure_inside_root(root, root / "_notes" / f"{slug}.md")
        fm = {
            "title": title,
            "date": date,
            "updated": date,
            "description": summary,
            "tags": tags,
            "status": "seedling",
            "lang": "zh",
        }
        markdown_file(path, fm, "<!-- 在这里写笔记。 -->")
        print(f"已创建技术笔记：{path}")
    elif ctype == "til":
        path = ensure_inside_root(root, root / "_til" / f"{date}-{slug}.md")
        fm = {
            "title": title,
            "date": date,
            "tags": tags,
            "lang": "zh",
        }
        markdown_file(path, fm, "<!-- 记录一个具体发现、命令或修复。 -->")
        print(f"已创建每日所学：{path}")
    elif ctype == "external":
        url = args.url or (prompt("原文 URL") if interactive else "")
        if not is_valid_url(url):
            raise SystemExit("URL 必须是 http 或 https。")
        platform = args.platform or (prompt("发布平台") if interactive else "")
        item = {
            "title": title,
            "summary": summary,
            "platform": platform,
            "url": url,
            "published_at": date,
            "date": date,
            "category": category or "article",
            "type": "article",
            "tags": tags,
            "cover": args.cover,
            "featured": False,
            "content_mode": "external",
            "language": "zh",
        }
        path, backup = append_elsewhere(root, item)
        print(f"已添加外部文章链接：{path}")
        print(f"已备份原文件：{backup}")
    elif ctype == "project":
        path = ensure_inside_root(root, root / "tmp" / "content-drafts" / "projects" / f"{slug}.yml")
        if path.exists():
            raise SystemExit(f"项目草稿已存在，拒绝覆盖：{path}")
        path.parent.mkdir(parents=True, exist_ok=True)
        data = {
            "draft": True,
            "name_zh": title,
            "description_zh": summary,
            "status": "learning",
            "category": category or "ai",
            "year": today().year,
            "tags": tags,
            "visibility": "private",
            "content_mode": "local",
        }
        path.write_text(yaml_block(data) + "\n", encoding="utf-8", newline="\n")
        print(f"已创建项目数据草稿：{path}")
        print("注意：项目草稿位于 tmp/content-drafts，不会自动进入公开项目页。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
