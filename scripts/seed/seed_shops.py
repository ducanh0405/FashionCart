"""
FashionCart — Seed Shops
=========================
Tạo 1 shop mẫu cho môi trường development.
Phụ thuộc: users phải được seed trước.
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

DATA_FILE = Path(__file__).parent / "data" / "shops.json"


def seed_shops():
    logger.info("Loading shop data from %s", DATA_FILE)

    with open(DATA_FILE, encoding="utf-8") as f:
        shops_data = json.load(f)

    created_count = 0
    skipped_count = 0

    for shop in shops_data:
        shop_slug = shop["slug"]

        # --- Idempotent check ---
        # existing = Shop.objects.filter(slug=shop_slug).first()
        # if existing:
        #     logger.info("  SKIP shop: %s", shop_slug)
        #     skipped_count += 1
        #     continue

        # TODO: Shop.objects.create(**shop)
        logger.info("  CREATE shop: %-30s | owner_id: %s", shop_slug, shop["owner_id"])
        created_count += 1

    logger.info("Shops seed complete: %d created, %d skipped.", created_count, skipped_count)


if __name__ == "__main__":
    logger.info("=" * 50)
    logger.info("Seeding: Shops")
    logger.info("=" * 50)
    seed_shops()
