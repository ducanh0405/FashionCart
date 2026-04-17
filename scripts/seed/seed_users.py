"""
FashionCart — Seed Users
=========================
Tạo các tài khoản test cố định cho môi trường development.

Tài khoản test:
    buyer@test.com   / Test@1234   (Buyer)
    buyer2@test.com  / Test@1234   (Buyer)
    shop@test.com    / Test@1234   (Shop owner)
    admin@test.com   / Admin@1234  (Admin)

QUAN TRỌNG: Chỉ dùng cho môi trường development. KHÔNG dùng cho production.
"""

import json
import logging
import os
import sys
from pathlib import Path

# Thêm project root vào sys.path để import được Django settings
PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

# Cấu hình Django settings (điều chỉnh nếu tên settings module khác)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

try:
    import django
    django.setup()
    from django.contrib.auth.hashers import make_password
    # Import model User của project (điều chỉnh đường dẫn nếu khác)
    # from backend.src.modules.users.models import User
    USE_DJANGO = True
except ImportError:
    USE_DJANGO = False

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
logger = logging.getLogger(__name__)

DATA_FILE = Path(__file__).parent / "data" / "users.json"


def hash_password(raw_password: str) -> str:
    """Hash mật khẩu bằng bcrypt/argon2 qua Django hoặc passlib."""
    if USE_DJANGO:
        return make_password(raw_password)  # Django dùng PBKDF2 mặc định
    else:
        # Fallback: dùng passlib nếu không có Django
        try:
            from passlib.hash import bcrypt
            return bcrypt.hash(raw_password)
        except ImportError:
            raise RuntimeError(
                "Không thể hash password: cần Django hoặc passlib. "
                "Cài: pip install passlib[bcrypt]"
            )


def seed_users():
    """Đọc data từ users.json và insert vào DB (idempotent)."""
    logger.info("Loading user data from %s", DATA_FILE)

    with open(DATA_FILE, encoding="utf-8") as f:
        users_data = json.load(f)

    created_count = 0
    skipped_count = 0

    for user in users_data:
        email = user["email"]

        # --- Idempotent check: bỏ qua nếu email đã tồn tại ---
        # TODO: Thay thế bằng ORM query khi đã có model
        # existing = User.objects.filter(email=email).first()
        # if existing:
        #     logger.info("  SKIP user: %s (already exists)", email)
        #     skipped_count += 1
        #     continue

        password_hash = hash_password(user["password_raw"])

        # TODO: Thay thế bằng ORM khi đã có model
        # User.objects.create(
        #     email=email,
        #     password_hash=password_hash,
        #     full_name=user["full_name"],
        #     phone=user.get("phone"),
        #     gender=user.get("gender"),
        #     date_of_birth=user.get("date_of_birth"),
        #     avatar_url=user.get("avatar_url"),
        #     role=user["role"],
        #     is_active=user["is_active"],
        # )

        logger.info(
            "  CREATE user: %-30s | role: %-5s | name: %s",
            email, user["role"], user["full_name"]
        )
        created_count += 1

    logger.info(
        "Users seed complete: %d created, %d skipped.",
        created_count, skipped_count
    )


if __name__ == "__main__":
    logger.info("=" * 50)
    logger.info("Seeding: Users")
    logger.info("=" * 50)
    seed_users()
