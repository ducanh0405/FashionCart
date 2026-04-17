"""
FashionCart — Master Seed Script
=================================
Chạy tất cả seeder theo đúng thứ tự dependency.

Cách dùng:
    python scripts/seed/seed_all.py

Yêu cầu:
    - DB đã migrate xong (python manage.py migrate)
    - Django settings đã có DB credentials
"""

import subprocess
import sys
import time
from pathlib import Path

# Danh sách seeder theo thứ tự chạy (QUAN TRỌNG: phải đúng thứ tự FK)
SEEDERS = [
    "scripts/seed/seed_users.py",
    "scripts/seed/seed_shops.py",
    "scripts/seed/seed_categories.py",
    "scripts/seed/seed_products.py",
    "scripts/seed/seed_orders.py",
]


def run_seeder(script_path: str) -> tuple[bool, float]:
    """Chạy một seeder script và return (success, elapsed_seconds)."""
    start = time.time()
    print(f"\n{'='*60}")
    print(f"▶  Running: {script_path}")
    print(f"{'='*60}")

    result = subprocess.run(
        [sys.executable, script_path],
        capture_output=False,
    )

    elapsed = time.time() - start

    if result.returncode != 0:
        print(f"\n✗  FAILED: {script_path}  ({elapsed:.2f}s)")
        return False, elapsed

    print(f"\n✓  DONE: {script_path}  ({elapsed:.2f}s)")
    return True, elapsed


def main():
    print("\n" + "=" * 60)
    print("🌱  FashionCart — Seeding Database")
    print(f"    Total seeders: {len(SEEDERS)}")
    print("=" * 60)

    # Kiểm tra tất cả file tồn tại trước khi chạy
    missing = [s for s in SEEDERS if not Path(s).exists()]
    if missing:
        print("\n⚠  Missing seeder files:")
        for m in missing:
            print(f"   - {m}")
        print("\n   Hãy tạo các file còn thiếu trước khi chạy seed_all.py")
        sys.exit(1)

    failed = []
    total_time = 0.0

    for seeder in SEEDERS:
        success, elapsed = run_seeder(seeder)
        total_time += elapsed
        if not success:
            failed.append(seeder)

    print(f"\n{'='*60}")
    print(f"⏱  Tổng thời gian: {total_time:.2f}s")

    if failed:
        print(f"\n⚠  {len(failed)} seeder(s) FAILED:")
        for f in failed:
            print(f"   - {f}")
        print("\n   Kiểm tra lại lỗi ở trên và chạy lại.")
        sys.exit(1)
    else:
        print("\n✅  Tất cả seeders đã hoàn thành thành công!")
        print("    Database đã sẵn sàng để demo.\n")
        sys.exit(0)


if __name__ == "__main__":
    main()
