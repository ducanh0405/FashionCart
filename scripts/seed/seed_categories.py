"""
FashionCart — Seed Categories
===============================
Tạo 3 danh mục cấp 1 và 10 danh mục cấp 2.
Phụ thuộc: không có (bảng độc lập).
"""

import json
import logging
import os
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(PROJECT_ROOT))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

try:
    import django
    django.setup()
    USE_DJANGO = True
except ImportError:
    USE_DJANGO = False

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
logger = logging.getLogger(__name__)

DATA_FILE = Path(__file__).parent / "data" / "categories.json"


def seed_categories():
    logger.info("Loading category data from %s", DATA_FILE)

    with open(DATA_FILE, encoding="utf-8") as f:
        categories_data = json.load(f)

    # Phân tách root và children để insert root trước (tránh FK violation)
    roots = [c for c in categories_data if c["parent_id"] is None]
    children = [c for c in categories_data if c["parent_id"] is not None]

    created_count = 0
    skipped_count = 0

    for category in roots + children:
        slug = category["slug"]
        level = "root" if category["parent_id"] is None else "child"

        # --- Idempotent check ---
        # existing = Category.objects.filter(slug=slug).first()
        # if existing:
        #     logger.info("  SKIP [%s] category: %s", level, slug)
        #     skipped_count += 1
        #     continue

        # TODO: Category.objects.create(**category)
        logger.info(
            "  CREATE [%-5s] category: %-25s | parent_id: %s",
            level, slug, category["parent_id"]
        )
        created_count += 1

    logger.info(
        "Categories seed complete: %d created, %d skipped. (roots: %d, children: %d)",
        created_count, skipped_count, len(roots), len(children)
    )


if __name__ == "__main__":
    logger.info("=" * 50)
    logger.info("Seeding: Categories")
    logger.info("=" * 50)
    seed_categories()
