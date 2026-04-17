# FashionCart — Seed Data

> Cung cấp dữ liệu mẫu đồng nhất cho toàn bộ team trong quá trình phát triển và demo.

---

## Cấu trúc thư mục

```
scripts/seed/
├── README.md               ← File này
├── seed_all.py             ← Master script: chạy tất cả theo thứ tự
├── seed_users.py           ← Seed 4 tài khoản test
├── seed_shops.py           ← Seed 1 shop mẫu
├── seed_categories.py      ← Seed 13 danh mục (3 root + 10 sub)
├── seed_products.py        ← Seed 15 sản phẩm + variants + images
├── seed_orders.py          ← Seed 3 đơn hàng mẫu
└── data/
    ├── users.json          ← Raw data cho users
    ├── shops.json          ← Raw data cho shops
    ├── categories.json     ← Raw data cho categories
    ├── products.json       ← Raw data cho products + variants + images
    └── orders.json         ← Raw data cho orders + order_items
```

---

## Cách chạy

### Bước 1: Đảm bảo DB đã migrate

```bash
# Django
python manage.py migrate

# FastAPI + Alembic
alembic upgrade head
```

### Bước 2: Chạy toàn bộ seed

```bash
python scripts/seed/seed_all.py
```

### Bước 3: Hoặc chạy từng phần (theo đúng thứ tự)

```bash
python scripts/seed/seed_users.py
python scripts/seed/seed_shops.py
python scripts/seed/seed_categories.py
python scripts/seed/seed_products.py
python scripts/seed/seed_orders.py
```

---

## Tài khoản test

| Role | Email | Password | Ghi chú |
|------|-------|----------|---------|
| Buyer | `buyer@test.com` | `Test@1234` | Tài khoản mua hàng chính |
| Buyer 2 | `buyer2@test.com` | `Test@1234` | Tài khoản phụ |
| Shop Owner | `shop@test.com` | `Test@1234` | Chủ shop `Urban Threads HCM` |
| Admin | `admin@test.com` | `Admin@1234` | Quản trị viên |

> ⚠️ **Chỉ dùng cho development.** Không bao giờ dùng các tài khoản này cho production.

---

## Dữ liệu mẫu tổng hợp

| Loại | Số lượng | Ghi chú |
|------|---------|---------|
| Users | 4 | 2 buyer, 1 shop, 1 admin |
| Shops | 1 | Urban Threads HCM |
| Categories | 13 | 3 root + 10 sub-categories |
| Products | 15 | Nam, nữ, phụ kiện |
| Product Variants | ~90 | Size + màu đa dạng |
| Orders | 3 | Trạng thái: `delivered`, `shipping`, `confirmed` |

---

## Thứ tự chạy (quan trọng)

```
1. users         (không có FK nào)
2. shops         (FK → users)
3. categories    (FK → categories self-ref, root trước children)
4. products      (FK → shops, categories)
   └── product_variants  (FK → products)
   └── product_images    (FK → products)
5. orders        (FK → users, products)
   └── order_items       (FK → orders, products)
```

---

## Quy tắc Idempotent

Tất cả seeder được thiết kế **idempotent** — chạy lại nhiều lần không tạo ra dữ liệu trùng lặp:
- Kiểm tra unique field (slug, email, order_code, sku) trước khi insert.
- Nếu đã tồn tại → log `SKIP` và bỏ qua.

---

## Tham chiếu

- **ERD chi tiết:** `scripts/ERD.md`
- **Team conventions:** `docs/team-conventions.md`
- **Backend module docs:** `backend/BE/*.md`
