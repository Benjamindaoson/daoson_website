#!/usr/bin/env python3
"""Generate static project QR PNGs; no website runtime dependency or QR service.

Maintenance dependencies: qrcode==8.2, Pillow, PyYAML.
Run: python scripts/generate_project_qr.py
Check reproducibility: python scripts/generate_project_qr.py --check
Also decode every PNG: python scripts/generate_project_qr.py --check --verify
Decoding requires the optional maintenance dependency zxing-cpp.
"""

from __future__ import annotations

import argparse
import hashlib
import io
import json
from pathlib import Path
import re
from urllib.parse import urlsplit, urlunsplit

import qrcode
import yaml


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "assets" / "qr" / "projects"


def public_origin(config: dict) -> str:
    parsed = urlsplit(config["url"])
    if (
        parsed.scheme != "https"
        or not parsed.hostname
        or parsed.hostname in {"localhost", "127.0.0.1", "::1"}
        or parsed.username
        or parsed.password
        or parsed.query
        or parsed.fragment
        or parsed.path not in {"", "/"}
    ):
        raise ValueError("_config.yml must define an HTTPS public origin in url")
    return urlunsplit(("https", parsed.netloc.lower(), "", "", ""))


def make_png(url: str) -> bytes:
    qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=12, border=4)
    qr.add_data(url)
    qr.make(fit=True)
    stream = io.BytesIO()
    qr.make_image(fill_color="black", back_color="white").save(stream, format="PNG", optimize=True)
    return stream.getvalue()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Check tracked files without modifying them")
    parser.add_argument("--verify", action="store_true", help="Decode all PNGs using zxing-cpp")
    args = parser.parse_args()
    config = yaml.safe_load((ROOT / "_config.yml").read_text())
    projects = yaml.safe_load((ROOT / "_data" / "projects.yml").read_text())
    base = public_origin(config) + config.get("baseurl", "").rstrip("/")
    if args.verify:
        import zxingcpp
        from PIL import Image
    if not args.check:
        OUTPUT.mkdir(parents=True, exist_ok=True)
    manifest = {"format": "PNG", "error_correction": "M", "quiet_zone_modules": 4, "links": []}
    seen = set()
    for project in projects:
        path = project.get("case_url")
        if not path:
            continue
        project_id = project["id"]
        if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", project_id) or project_id in seen:
            raise ValueError(f"Invalid or duplicate project id: {project_id}")
        if not path.startswith("/projects/") or not path.endswith("/") or "?" in path or "#" in path:
            raise ValueError(f"Expected a stable project case path: {path}")
        seen.add(project_id)
        for lang in ("zh", "en"):
            url = base + path + "?lang=" + lang
            name = f"{project_id}-{lang}.png"
            image_bytes = make_png(url)
            target = OUTPUT / name
            if args.check:
                if not target.is_file() or target.read_bytes() != image_bytes:
                    raise SystemExit(f"Missing or stale QR file: {target.relative_to(ROOT)}")
            else:
                target.write_bytes(image_bytes)
            if args.verify:
                image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
                # Verify the full PNG and the actual 164px on-screen size.
                for size in (image.size[0], 164):
                    decoded = zxingcpp.read_barcodes(image.resize((size, size)))
                    if len(decoded) != 1 or decoded[0].text != url:
                        raise SystemExit(f"QR decode failed: {name}, {size}px")
            manifest["links"].append({"project": project_id, "language": lang, "url": url, "file": name, "sha256": hashlib.sha256(image_bytes).hexdigest()})
    manifest_bytes = (json.dumps(manifest, ensure_ascii=False, indent=2) + "\n").encode()
    manifest_path = OUTPUT / "manifest.json"
    if args.check:
        if not manifest_path.is_file() or manifest_path.read_bytes() != manifest_bytes:
            raise SystemExit("Missing or stale QR manifest")
    else:
        manifest_path.write_bytes(manifest_bytes)
    verb = "Checked" if args.check else "Generated"
    print(f"{verb} {len(manifest['links'])} project QR images; decode verification: {args.verify}")


if __name__ == "__main__":
    main()
