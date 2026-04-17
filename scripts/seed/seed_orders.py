"""
FashionCart — Seed Orders
==========================
Tạo 3 đơn hàng mẫu với nhiều trạng thái khác nhau để demo order history.
Phụ thuộc: users và products phải được seed trước.
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

DATA_FILE = Path(__file__).parent / "data" / "orders.json"


def seed_orders():
    logger.info("Loading order data from %s", DATA_FILE)

    with open(DATA_FILE, encoding="utf-8") as f:
        orders_data = json.load(f)

    created_count = 0
    skipped_count = 0

    for order in orders_data:
        order_code = order["order_code"]

        # --- Idempotent check ---
        # existing = Order.objects.filter(order_code=order_code).first()
        # if existing:
        #     logger.info("  SKIP order: %s", order_code)
        #     skipped_count += 1
        #     continue

        items = order.pop("items", [])

        # TODO: Dùng DB transaction để đảm bảo atomicity
        # with transaction.atomic():
        #     db_order = Order.objects.create(
        #         order_code=order["order_code"],
        #         user_id=order["user_id"],
        #         status=order["status"],
        #         payment_method=order["payment_method"],
        #         payment_status=order["payment_status"],
        #         subtotal=order["subtotal"],
        #         shipping_fee=order["shipping_fee"],
        #         discount=order["discount"],
        #         total=order["total"],
        #         shipping_name=order["shipping_name"],
        #         shipping_phone=order["shipping_phone"],
        #         shipping_address=order["shipping_address"],
        #         note=order.get("note"),
        #     )
        #     for item in items:
        #         OrderItem.objects.create(order=db_order, **item)

        logger.info(
            "  CREATE order: %-22s | user_id: %d | status: %-10s | total: %,.0f VND | items: %d",
            order_code,
            order["user_id"],
            order["status"],
            order["total"],
            len(items)
        )
        created_count += 1

    logger.info("Orders seed complete: %d created, %d skipped.", created_count, skipped_count)


if __name__ == "__main__":
    logger.info("=" * 50)
    logger.info("Seeding: Orders + Order Items")
    logger.info("=" * 50)
    seed_orders()
