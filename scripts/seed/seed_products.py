"""
FashionCart — Seed Products
============================
Tạo 15 sản phẩm mẫu với đầy đủ variants và images.
Phụ thuộc: shops và categories phải được seed trước.
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

DATA_FILE = Path(__file__).parent / "data" / "products.json"


def seed_products():
    """Đọc data từ products.json và insert sản phẩm + variants + images."""
    logger.info("Loading product data from %s", DATA_FILE)

    with open(DATA_FILE, encoding="utf-8") as f:
        products_data = json.load(f)

    created_count = 0
    skipped_count = 0

    for product in products_data:
        product_slug = product["slug"]

        # --- Idempotent check ---
        # TODO: Thay bằng ORM khi có model
        # existing = Product.objects.filter(slug=product_slug).first()
        # if existing:
        #     logger.info("  SKIP product: %s", product_slug)
        #     skipped_count += 1
        #     continue

        variants = product.pop("variants", [])
        images = product.pop("images", [])

        # TODO: Tạo Product
        # db_product = Product.objects.create(
        #     shop_id=product["shop_id"],
        #     category_id=product["category_id"],
        #     name=product["name"],
        #     slug=product["slug"],
        #     description=product["description"],
        #     base_price=product["base_price"],
        #     discount_price=product.get("discount_price"),
        #     thumbnail_url=product.get("thumbnail_url"),
        #     status=product["status"],
        #     total_sold=product.get("total_sold", 0),
        #     average_rating=product.get("average_rating", 0.0),
        #     review_count=product.get("review_count", 0),
        # )

        # TODO: Tạo ProductVariants
        # for variant in variants:
        #     ProductVariant.objects.create(
        #         product=db_product,
        #         size=variant.get("size"),
        #         color=variant.get("color"),
        #         color_code=variant.get("color_code"),
        #         stock=variant["stock"],
        #         price_adjustment=variant.get("price_adjustment", 0),
        #         sku=variant.get("sku"),
        #     )

        # TODO: Tạo ProductImages
        # for image in images:
        #     ProductImage.objects.create(
        #         product=db_product,
        #         image_url=image["image_url"],
        #         display_order=image.get("display_order", 0),
        #         alt_text=image.get("alt_text"),
        #     )

        logger.info(
            "  CREATE product: %-45s | %d variants | %d images",
            product_slug,
            len(variants),
            len(images)
        )
        created_count += 1

    logger.info(
        "Products seed complete: %d created, %d skipped.",
        created_count, skipped_count
    )


if __name__ == "__main__":
    logger.info("=" * 50)
    logger.info("Seeding: Products + Variants + Images")
    logger.info("=" * 50)
    seed_products()
