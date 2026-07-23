#!/usr/bin/env python3
"""Import an external article into a local review draft.

The output always goes to tmp/imports and is marked as needs_review. The script
does not publish, commit, push, run JavaScript, bypass login walls, or download
remote media.
"""

from __future__ import annotations

import argparse
import datetime as dt
from html.parser import HTMLParser
import hashlib
import html
from pathlib import Path
import re
import sys
import unicodedata
from urllib.parse import urlparse
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
FORBIDDEN_DIRS = {".git", "_site", "vendor", "node_modules", ".bundle", ".jekyll-cache"}


def now() -> dt.datetime:
    return dt.datetime.now(dt.timezone(dt.timedelta(hours=8)))


def safe_slug(title: str) -> str:
    normalized = unicodedata.normalize("NFKD", title)
    ascii_text = normalized.encode("ascii", "ignore").decode("ascii").lower()
    slug = re.sub(r"[^a-z0-9]+", "-", ascii_text).strip("-")
    if not slug:
        slug = "zh-" + hashlib.sha1(title.encode("utf-8")).hexdigest()[:10]
    return slug[:80].strip("-") or "imported-article"


def ensure_inside_root(root: Path, path: Path) -> Path:
    root = root.resolve()
    path = path.resolve()
    if root != path and root not in path.parents:
        raise SystemExit(f"拒绝写入项目目录外：{path}")
    if any(part in FORBIDDEN_DIRS for part in path.relative_to(root).parts):
        raise SystemExit(f"拒绝写入受保护目录：{path}")
    return path


def yaml_scalar(value) -> str:
    if isinstance(value, bool):
        return "true" if value else "false"
    text = "" if value is None else str(value)
    return '"' + text.replace("\\", "\\\\").replace('"', '\\"') + '"'


def yaml_block(data: dict) -> str:
    return "\n".join(f"{key}: {yaml_scalar(value)}" for key, value in data.items())


class MarkdownExtractor(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.parts: list[str] = []
        self.skip_stack: list[str] = []
        self.link_stack: list[str] = []
        self.current_heading = ""

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in {"script", "style", "iframe", "noscript", "form"}:
            self.skip_stack.append(tag)
            return
        if self.skip_stack:
            return
        if tag in {"p", "div", "section", "article"}:
            self.parts.append("\n\n")
        elif tag in {"br"}:
            self.parts.append("\n")
        elif tag in {"h1", "h2", "h3"}:
            level = {"h1": "#", "h2": "##", "h3": "###"}[tag]
            self.parts.append(f"\n\n{level} ")
        elif tag == "li":
            self.parts.append("\n- ")
        elif tag == "blockquote":
            self.parts.append("\n\n> ")
        elif tag == "pre":
            self.parts.append("\n\n```\n")
        elif tag == "code":
            self.parts.append("`")
        elif tag == "a":
            self.link_stack.append(attrs.get("href", ""))
            self.parts.append("[")
        elif tag == "img":
            src = attrs.get("src") or ""
            alt = attrs.get("alt") or "图片"
            if src:
                self.parts.append(f"\n\n![{alt}]({src})\n\n")

    def handle_endtag(self, tag):
        if self.skip_stack:
            if tag == self.skip_stack[-1]:
                self.skip_stack.pop()
            return
        if tag == "a":
            href = self.link_stack.pop() if self.link_stack else ""
            self.parts.append(f"]({href})" if href else "]")
        elif tag == "code":
            self.parts.append("`")
        elif tag == "pre":
            self.parts.append("\n```\n\n")
        elif tag in {"p", "div", "section", "article", "h1", "h2", "h3", "blockquote"}:
            self.parts.append("\n\n")

    def handle_data(self, data):
        if self.skip_stack:
            return
        text = html.unescape(data)
        text = re.sub(r"\s+", " ", text)
        if text.strip():
            self.parts.append(text)

    def markdown(self) -> str:
        text = "".join(self.parts)
        text = re.sub(r"[ \t]+\n", "\n", text)
        text = re.sub(r"\n{3,}", "\n\n", text)
        return text.strip()


def extract_title(raw_html: str, fallback: str) -> str:
    match = re.search(r"<title[^>]*>(.*?)</title>", raw_html, re.I | re.S)
    if match:
        title = re.sub(r"\s+", " ", html.unescape(match.group(1))).strip()
        if title:
            return title
    return fallback


def fetch_url(url: str) -> tuple[str, str, list[str]]:
    parsed = urlparse(url)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        raise RuntimeError("URL 必须是 http 或 https。")
    request = Request(url, headers={"User-Agent": "BenjemingLocalImporter/1.0"})
    with urlopen(request, timeout=12) as response:
        ctype = response.headers.get("content-type", "")
        body = response.read(2_000_000)
    if "text/html" not in ctype and "application/xhtml" not in ctype:
        raise RuntimeError(f"不是 HTML 页面：{ctype or 'unknown content-type'}")
    raw = body.decode("utf-8", errors="replace")
    title = extract_title(raw, parsed.netloc)
    extractor = MarkdownExtractor()
    extractor.feed(raw)
    markdown = extractor.markdown()
    warnings = []
    if len(markdown) < 300:
        warnings.append("正文少于 300 字符，可能提取不完整，请人工核对。")
    if re.search(r"!\[[^\]]*\]\(https?://", markdown):
        warnings.append("图片仍为远程 URL，第一版不会自动下载图片，请确认防盗链和版权。")
    return title, markdown, warnings


def read_local_file(path: Path) -> tuple[str, str, list[str]]:
    if not path.exists() or not path.is_file():
        raise RuntimeError(f"文件不存在：{path}")
    if path.suffix.lower() not in {".md", ".markdown", ".txt"}:
        raise RuntimeError("第一版只支持 Markdown 或 TXT 文件。")
    text = path.read_text(encoding="utf-8", errors="replace")
    title = path.stem
    if path.suffix.lower() == ".txt":
        text = text.strip()
    warnings = []
    if len(text) < 300:
        warnings.append("正文少于 300 字符，可能不适合作为正式文章。")
    return title, text, warnings


def source_platform_from_url(url: str) -> str:
    if not url:
        return ""
    return urlparse(url).netloc.replace("www.", "")


def write_preview(root: Path, title: str, body: str, source_url: str, platform: str, warnings: list[str]) -> Path:
    slug = safe_slug(title)
    date = now().strftime("%Y-%m-%d")
    path = ensure_inside_root(root, root / "tmp" / "imports" / f"{date}-{slug}.md")
    if path.exists():
        raise SystemExit(f"导入预览已存在，拒绝覆盖：{path}")
    path.parent.mkdir(parents=True, exist_ok=True)
    front_matter = {
        "title": title,
        "date": now().strftime("%Y-%m-%d %H:%M:%S +0800"),
        "description": "",
        "lang": "zh",
        "draft": True,
        "import_status": "needs_review",
        "content_mode": "local",
        "source_platform": platform,
        "source_url": source_url,
        "imported_at": now().isoformat(),
        "featured": False,
        "visibility": "draft",
    }
    warning_block = ""
    if warnings:
        warning_block = "\n\n## 导入警告\n\n" + "\n".join(f"- {w}" for w in warnings) + "\n"
    content = (
        f"---\n{yaml_block(front_matter)}\n---\n\n"
        "<!-- 等待人工确认：检查版权、标题、摘要、图片、链接、正文完整性后，再手动移动到 _posts。 -->\n\n"
        f"{body.strip()}\n"
        f"{warning_block}"
    )
    path.write_text(content, encoding="utf-8", newline="\n")
    return path


def build_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="本地导入 URL / Markdown / TXT 为待确认草稿。")
    group = parser.add_mutually_exclusive_group()
    group.add_argument("--url", help="要尝试导入的文章 URL。")
    group.add_argument("--file", help="本地 Markdown 或 TXT 文件。")
    group.add_argument("--manual", action="store_true", help="从标准输入粘贴正文。")
    parser.add_argument("--root", default=str(ROOT), help="项目根目录。")
    parser.add_argument("--title", help="手动指定标题。")
    parser.add_argument("--source-url", default="", help="本地文件或粘贴内容的原文 URL。")
    parser.add_argument("--platform", default="", help="来源平台。")
    return parser.parse_args()


def main() -> int:
    args = build_args()
    root = Path(args.root).resolve()
    try:
        if args.url:
            title, body, warnings = fetch_url(args.url)
            source_url = args.url
            platform = args.platform or source_platform_from_url(args.url)
        elif args.file:
            title, body, warnings = read_local_file(Path(args.file))
            source_url = args.source_url
            platform = args.platform or source_platform_from_url(source_url)
        elif args.manual:
            print("请粘贴正文，结束后按 Ctrl+Z 再回车（Windows）或 Ctrl+D（Unix）：", file=sys.stderr)
            body = sys.stdin.read().strip()
            if not body:
                raise RuntimeError("未读取到正文。")
            title = args.title or "手动导入文章"
            warnings = []
            if len(body) < 300:
                warnings.append("正文少于 300 字符，可能不适合作为正式文章。")
            source_url = args.source_url
            platform = args.platform or source_platform_from_url(source_url)
        else:
            raise RuntimeError("请提供 --url、--file 或 --manual。")
        title = args.title or title
        preview = write_preview(root, title, body, source_url, platform, warnings)
        print(f"已生成待确认导入草稿：{preview}")
        if warnings:
            print("警告：")
            for warning in warnings:
                print(f"- {warning}")
        print("注意：该文件不会自动发布、commit 或 push。")
        return 0
    except Exception as exc:
        print(f"导入失败：{exc}", file=sys.stderr)
        print("可改用 --manual 手动粘贴，或用 scripts/new_content.py --type external 添加链接卡片。", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
