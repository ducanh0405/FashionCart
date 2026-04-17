# FashionCart — Quy ước làm việc của Team

> **Trạng thái:** Đã chốt  
> **Áp dụng từ:** Phase 1 – MVP e-commerce cơ bản  
> **Cập nhật lần cuối:** 2026-04-14

---

## 1. Quy ước Branch, PR, Review

### 1.1 Branching Strategy — GitHub Flow (đơn giản hóa)

```
main (production-ready)
 └── dev (integration branch — merge tất cả feature vào đây)
      ├── feature/FE-001-login-page
      ├── feature/BE-002-auth-api
      ├── feature/DB-003-seed-products
      ├── fix/FE-010-cart-total-bug
      └── hotfix/BE-020-token-expired
```

| Branch | Mục đích | Ai merge vào |
|--------|----------|--------------|
| `main` | Code ổn định, demo-ready | Merge từ `dev` khi chốt milestone |
| `dev` | Branch tích hợp chung, test nội bộ | Merge từ các feature/fix branches |
| `feature/*` | Tính năng mới | Dev tạo PR → merge vào `dev` |
| `fix/*` | Sửa bug thường | Dev tạo PR → merge vào `dev` |
| `hotfix/*` | Sửa bug khẩn cấp trên `main` | Merge vào cả `main` và `dev` |

### 1.2 Branch Naming Convention

```
<type>/<prefix>-<number>-<short-description>
```

**Type:**
- `feature/` — tính năng mới
- `fix/` — sửa bug
- `hotfix/` — sửa bug khẩn cấp
- `refactor/` — cải thiện code, không thay đổi chức năng
- `docs/` — cập nhật tài liệu

**Prefix (theo team phụ trách):**
- `FE` — Frontend
- `BE` — Backend
- `DB` — Database
- `ML` — ML Services
- `INFRA` — Infrastructure

**Ví dụ:**
```
feature/FE-001-product-listing-page
feature/BE-005-cart-api-crud
fix/FE-012-navbar-responsive
refactor/BE-008-auth-middleware
docs/DB-002-schema-diagram
```

### 1.3 Commit Message Convention

Sử dụng format [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <mô tả ngắn>

[body — optional, giải thích chi tiết]
```

**Type:**
| Type | Ý nghĩa |
|------|----------|
| `feat` | Thêm tính năng mới |
| `fix` | Sửa bug |
| `refactor` | Cải thiện code, không đổi chức năng |
| `style` | Format, lint, không ảnh hưởng logic |
| `docs` | Cập nhật tài liệu |
| `test` | Thêm hoặc sửa test |
| `chore` | Config, build, dependency |

**Scope (optional):** `auth`, `cart`, `products`, `orders`, `vton`, `dss`, `db`, `ui`

**Ví dụ:**
```
feat(auth): add JWT login endpoint with refresh token
fix(cart): correct subtotal calculation when quantity is 0
refactor(products): extract product serializer to shared utils
docs(db): add ER diagram for Phase 1 schema
chore: update ESLint config for React 19
```

### 1.4 Pull Request (PR) Rules

#### Tạo PR
- **Title:** Theo commit convention — `feat(scope): mô tả`.
- **Description template:**

```markdown
## Mô tả
<!-- Thay đổi gì, tại sao -->

## Loại thay đổi
- [ ] Feature mới
- [ ] Bug fix
- [ ] Refactor
- [ ] Docs / Config

## Checklist
- [ ] Code chạy được ở local
- [ ] Không có linting error
- [ ] Đã test thủ công flow chính
- [ ] Cập nhật tài liệu liên quan (nếu cần)
- [ ] Không hardcode secrets / credentials

## Screenshots (nếu có UI)
<!-- Đính kèm screenshot hoặc recording -->
```

#### Review Rules
| Quy tắc | Chi tiết |
|----------|----------|
| **Reviewer tối thiểu** | 1 người (khác team thì càng tốt) |
| **Thời gian review** | Trong vòng 24h sau khi tạo PR |
| **Ai review ai** | FE review FE; BE review BE; cross-review khi thay đổi API contract |
| **Merge method** | **Squash and Merge** vào `dev` |
| **Conflict resolution** | Người tạo PR chịu trách nhiệm resolve conflict |
| **Auto-merge** | Không dùng, luôn cần ít nhất 1 approval |

#### Review Checklist (cho Reviewer)
- [ ] Code đúng architecture boundaries (xem `agentrules.md` §4)
- [ ] Không có business logic trong frontend
- [ ] Không hardcode secrets
- [ ] API response đúng format chuẩn (`{ status, message, data }`)
- [ ] Có error handling hợp lý
- [ ] Naming convention nhất quán

---

## 2. Coding Conventions & Format/Lint Rules

### 2.1 Ngôn ngữ sử dụng trong code

| Phần | Ngôn ngữ |
|------|----------|
| Tên biến, hàm, class | **English** |
| Commit message | **English** |
| Comment giải thích | **Vietnamese** (khi cần thiết cho team hiểu nhanh) |
| UI text cho người dùng | **Vietnamese** |
| Tài liệu kỹ thuật | **English** hoặc **Vietnamese** (thống nhất theo file) |

### 2.2 Frontend — React + Vite

#### Formatting & Linting

| Tool | Config |
|------|--------|
| **ESLint** | `eslint.config.js` — extends `@eslint/js`, `eslint-plugin-react` |
| **Prettier** | `.prettierrc` — thống nhất format cả team |

**`.prettierrc`:**
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "crlf"
}
```

#### Naming Convention

| Đối tượng | Convention | Ví dụ |
|-----------|-----------|-------|
| Component | PascalCase | `ProductCard.jsx` |
| Hook | camelCase, bắt đầu `use` | `useCart.js` |
| Utility function | camelCase | `formatPrice.js` |
| Constant | UPPER_SNAKE_CASE | `API_BASE_URL` |
| CSS class | kebab-case hoặc CSS Modules | `.product-card`, `styles.productCard` |
| File component | PascalCase | `ProductDetail.jsx` |
| File utility | camelCase | `httpClient.js` |
| Folder | camelCase | `components/`, `services/` |

#### File Structure Convention

```
src/
├── components/          # Reusable UI components
│   ├── ProductCard/
│   │   ├── ProductCard.jsx
│   │   └── ProductCard.module.css
│   └── ...
├── pages/               # Page-level views
│   ├── HomePage.jsx
│   ├── ProductListPage.jsx
│   └── ...
├── features/            # Feature-specific logic
│   ├── auth/
│   ├── cart/
│   └── ...
├── hooks/               # Custom hooks
├── services/            # API client functions
│   ├── httpClient.js    # Axios/fetch wrapper
│   ├── authService.js
│   ├── productService.js
│   └── ...
├── store/               # State management (Context hoặc Zustand)
├── styles/              # Global styles, design tokens
│   ├── variables.css
│   └── global.css
└── utils/               # Shared utilities
```

#### Frontend Rules
1. **Không viết business logic trong component** — tách vào `hooks/` hoặc `services/`.
2. **Mỗi component một folder** (nếu có file CSS riêng).
3. **Sử dụng `httpClient.js`** cho mọi API call — không gọi `fetch`/`axios` trực tiếp trong component.
4. **Error handling chung** — implement ở service layer, component chỉ hiển thị.
5. **Không dùng `console.log()`** trong production code — dùng custom logger nếu cần.

### 2.3 Backend — Django / FastAPI (Python)

#### Formatting & Linting

| Tool | Mục đích |
|------|----------|
| **Ruff** | Linting + formatting (thay thế Flake8 + Black + isort) |
| **mypy** (optional) | Type checking |

**`ruff.toml` (đề xuất):**
```toml
line-length = 100
target-version = "py311"

[lint]
select = ["E", "F", "W", "I", "N", "UP"]

[format]
quote-style = "double"
indent-style = "space"
```

#### Naming Convention

| Đối tượng | Convention | Ví dụ |
|-----------|-----------|-------|
| Module / file | snake_case | `product_service.py` |
| Class | PascalCase | `ProductSerializer` |
| Function / method | snake_case | `get_product_by_id()` |
| Variable | snake_case | `total_price` |
| Constant | UPPER_SNAKE_CASE | `MAX_CART_ITEMS` |
| URL path | kebab-case | `/api/v1/product-variants/` |
| DB table | snake_case, số nhiều | `products`, `order_items` |
| DB column | snake_case | `created_at`, `unit_price` |

#### Backend Rules
1. **API response luôn theo format chuẩn:**
   ```json
   {
     "status": "success",
     "message": "Products retrieved successfully",
     "data": { }
   }
   ```
2. **Không return raw DB object** — luôn serialize qua serializer/schema.
3. **Tách rõ layers:** `routes/controllers` → `services` → `repositories/models`.
4. **Validate input** ở controller layer, business logic ở service layer.
5. **Dùng `logging` module**, không dùng `print()`.
6. **Environment variables** qua `.env` — không hardcode.

### 2.4 Database — SQL Server

#### Naming Convention

| Đối tượng | Convention | Ví dụ |
|-----------|-----------|-------|
| Table | snake_case, số nhiều | `users`, `products`, `order_items` |
| Column | snake_case | `first_name`, `unit_price`, `created_at` |
| Primary Key | `id` (auto-increment hoặc UUID) | `id` |
| Foreign Key | `<referenced_table_singular>_id` | `user_id`, `product_id` |
| Index | `idx_<table>_<column(s)>` | `idx_products_category_id` |
| Constraint | `ck_<table>_<description>` | `ck_products_price_positive` |

#### Database Rules
1. **Mọi table phải có** `id`, `created_at`, `updated_at`.
2. **Foreign key phải có index**.
3. **Không lưu dữ liệu nhạy cảm** ở dạng plaintext (password phải hash).
4. **Migration file phải được commit** vào repo.
5. **Không ALTER trực tiếp trên DB** — luôn qua migration.

---

## 3. Cách chia task giữa Frontend, Backend, Database

### 3.1 Nguyên tắc chia task

```
┌─────────────────────────────────────────────────────────┐
│                    Feature Request                       │
│              (ví dụ: "Thêm giỏ hàng")                  │
└──────────────────────┬──────────────────────────────────┘
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
    ┌──────────┐ ┌──────────┐ ┌──────────┐
    │    DB    │ │ Backend  │ │ Frontend │
    │  Task    │ │  Task    │ │  Task    │
    │          │ │          │ │          │
    │ Schema + │ │ API +    │ │ UI +     │
    │ Migration│ │ Service  │ │ State    │
    │ + Seed   │ │ Logic    │ │ Mgmt     │
    └────┬─────┘ └────┬─────┘ └────┬─────┘
         │            │            │
         └────────────┼────────────┘
                      ▼
              PR → Review → Merge
```

### 3.2 Thứ tự thực hiện cho mỗi feature

| Bước | Ai làm | Nội dung | Output |
|------|--------|----------|--------|
| 1 | **Cả team** | Chốt spec / use case cho feature | Tài liệu spec ngắn |
| 2 | **DB** | Thiết kế schema, viết migration, viết seed | Migration files + seed script |
| 3 | **Backend** | Implement API endpoints + service logic | API endpoints + Postman/docs |
| 4 | **Frontend** | Implement UI + kết nối API | UI hoạt động trên local |
| 5 | **Cả team** | Test integration, fix bug | Feature chạy end-to-end |

> **Lưu ý:** Bước 3 và 4 có thể chạy song song nếu đã chốt API contract trước. Frontend dùng mock data / JSON server trong khi chờ backend hoàn thành.

### 3.3 API Contract First

Trước khi implement, team **PHẢI** chốt API contract cho từng feature:

```markdown
## API: Add item to cart

### Request
POST /api/v1/cart/items

Headers:
  Authorization: Bearer <token>

Body:
{
  "product_variant_id": 123,
  "quantity": 2
}

### Response (success)
{
  "status": "success",
  "message": "Item added to cart",
  "data": {
    "cart_item_id": 456,
    "product_variant_id": 123,
    "quantity": 2,
    "unit_price": 350000,
    "subtotal": 700000
  }
}

### Response (error)
{
  "status": "error",
  "message": "Product variant not found",
  "data": null
}
```

Lưu các API contract vào `backend/BE/APIs.md` hoặc file riêng theo module.

### 3.4 Task Board Labels (gợi ý)

| Label | Màu | Mô tả |
|-------|-----|-------|
| `team:frontend` | 🔵 Blue | Task của frontend |
| `team:backend` | 🟢 Green | Task của backend |
| `team:database` | 🟠 Orange | Task liên quan DB |
| `team:ml` | 🟣 Purple | Task liên quan ML |
| `priority:high` | 🔴 Red | Blocker hoặc critical |
| `priority:medium` | 🟡 Yellow | Quan trọng nhưng không khẩn |
| `priority:low` | ⚪ Grey | Nice to have |
| `status:blocked` | 🔴 Red | Đang bị chặn, cần người khác |
| `type:feature` | — | Tính năng mới |
| `type:bug` | — | Sửa lỗi |
| `type:docs` | — | Tài liệu |

### 3.5 Ví dụ chia task cho feature "Cart" (Phase 1)

| Task ID | Team | Mô tả | Dependency |
|---------|------|-------|------------|
| DB-010 | Database | Tạo table `carts`, `cart_items` + migration | — |
| DB-011 | Database | Seed data mẫu cho cart | DB-010 |
| BE-010 | Backend | API `POST /cart/items` (thêm SP vào giỏ) | DB-010 |
| BE-011 | Backend | API `GET /cart` (lấy giỏ hàng) | DB-010 |
| BE-012 | Backend | API `PUT /cart/items/:id` (update số lượng) | DB-010 |
| BE-013 | Backend | API `DELETE /cart/items/:id` (xóa SP) | DB-010 |
| FE-010 | Frontend | UI trang Cart + hiển thị items | BE-011 |
| FE-011 | Frontend | Chức năng thêm vào giỏ từ Product Detail | BE-010 |
| FE-012 | Frontend | Chức năng update/delete trong Cart | BE-012, BE-013 |

---

## 4. Cách Seed Data dùng chung cho Demo

### 4.1 Tổng quan

Seed data đảm bảo mọi thành viên trong team có **cùng một bộ dữ liệu mẫu** khi chạy local, phục vụ cho phát triển và demo.

```
scripts/
├── seed/
│   ├── README.md              # Hướng dẫn chạy seed
│   ├── seed_all.py            # Script chạy tất cả seeder theo thứ tự
│   ├── seed_users.py          # Seed users + test accounts
│   ├── seed_shops.py          # Seed shops
│   ├── seed_categories.py     # Seed categories
│   ├── seed_products.py       # Seed products + variants
│   ├── seed_orders.py         # Seed sample orders (optional)
│   └── data/
│       ├── users.json         # Raw data cho users
│       ├── shops.json         # Raw data cho shops
│       ├── categories.json    # Raw data cho categories
│       ├── products.json      # Raw data cho products
│       └── images/            # Ảnh sản phẩm mẫu
│           ├── product_001.jpg
│           ├── product_002.jpg
│           └── ...
```

### 4.2 Quy tắc Seed Data

| Quy tắc | Chi tiết |
|----------|----------|
| **Format dữ liệu** | JSON files trong `scripts/seed/data/` |
| **Thứ tự chạy** | `users` → `shops` → `categories` → `products` → `orders` |
| **Idempotent** | Chạy lại không bị duplicate (check trước khi insert) |
| **Tài khoản test** | Luôn có sẵn tài khoản test cố định (xem bên dưới) |
| **Ảnh sản phẩm** | Lưu trong `scripts/seed/data/images/` hoặc dùng URL external |
| **Dữ liệu demo** | Phải trông thực tế, đủ đẹp để demo trước khách |

### 4.3 Tài khoản Test cố định

Mọi thành viên team dùng chung các tài khoản sau khi test local:

| Role | Email | Password | Ghi chú |
|------|-------|----------|---------|
| Buyer (test) | `buyer@test.com` | `Test@1234` | Tài khoản mua hàng chính |
| Buyer 2 | `buyer2@test.com` | `Test@1234` | Tài khoản phụ |
| Shop Owner | `shop@test.com` | `Test@1234` | Chủ shop mẫu |
| Admin | `admin@test.com` | `Admin@1234` | Quản trị viên |

> ⚠️ **QUAN TRỌNG:** Đây chỉ là tài khoản cho môi trường development. Không bao giờ dùng password này cho production.

### 4.4 Dữ liệu mẫu tối thiểu (Phase 1)

| Loại dữ liệu | Số lượng tối thiểu | Ghi chú |
|---------------|---------------------|---------|
| Users | 4 (2 buyer, 1 shop, 1 admin) | Theo bảng tài khoản test |
| Shops | 1–2 | Ít nhất 1 shop có đủ sản phẩm |
| Categories | 3–5 | Ví dụ: Áo, Quần, Váy, Phụ kiện |
| Products | 15–20 | Mỗi category ít nhất 3–4 sản phẩm |
| Product Variants | 2–4 per product | Size + Color combinations |
| Orders (sample) | 2–3 | Để test order history |

### 4.5 Cách chạy Seed Data

```bash
# Bước 1: Đảm bảo DB đã được tạo và migrate
python manage.py migrate  # Django
# hoặc
alembic upgrade head      # FastAPI + Alembic

# Bước 2: Chạy toàn bộ seed
python scripts/seed/seed_all.py

# Hoặc chạy từng phần
python scripts/seed/seed_users.py
python scripts/seed/seed_shops.py
python scripts/seed/seed_categories.py
python scripts/seed/seed_products.py
```

### 4.6 Template file `seed_all.py`

```python
"""
FashionCart — Master Seed Script
Chạy tất cả seeder theo đúng thứ tự dependency.
"""

import subprocess
import sys

SEEDERS = [
    "scripts/seed/seed_users.py",
    "scripts/seed/seed_shops.py",
    "scripts/seed/seed_categories.py",
    "scripts/seed/seed_products.py",
    "scripts/seed/seed_orders.py",
]


def run_seeder(script_path: str) -> bool:
    """Chạy một seeder script và return True nếu thành công."""
    print(f"\n{'='*50}")
    print(f"▶ Running: {script_path}")
    print(f"{'='*50}")

    result = subprocess.run([sys.executable, script_path], capture_output=False)

    if result.returncode != 0:
        print(f"✗ FAILED: {script_path}")
        return False

    print(f"✓ DONE: {script_path}")
    return True


def main():
    print("🌱 FashionCart — Seeding Database...")
    print(f"Total seeders: {len(SEEDERS)}\n")

    failed = []
    for seeder in SEEDERS:
        if not run_seeder(seeder):
            failed.append(seeder)

    print(f"\n{'='*50}")
    if failed:
        print(f"⚠ {len(failed)} seeder(s) failed:")
        for f in failed:
            print(f"  - {f}")
        sys.exit(1)
    else:
        print("✅ All seeders completed successfully!")
        sys.exit(0)


if __name__ == "__main__":
    main()
```

### 4.7 Template file `data/products.json` (ví dụ)

```json
[
  {
    "name": "Áo Thun Basic Cotton",
    "slug": "ao-thun-basic-cotton",
    "category": "ao",
    "shop_id": 1,
    "description": "Áo thun basic 100% cotton, thoáng mát, phù hợp mặc hàng ngày.",
    "base_price": 199000,
    "images": ["product_001.jpg", "product_001_2.jpg"],
    "variants": [
      { "size": "S", "color": "Trắng", "stock": 50 },
      { "size": "M", "color": "Trắng", "stock": 30 },
      { "size": "L", "color": "Trắng", "stock": 20 },
      { "size": "M", "color": "Đen", "stock": 40 }
    ]
  },
  {
    "name": "Quần Jean Slim Fit",
    "slug": "quan-jean-slim-fit",
    "category": "quan",
    "shop_id": 1,
    "description": "Quần jean slim fit co giãn tốt, phom chuẩn Hàn Quốc.",
    "base_price": 450000,
    "images": ["product_002.jpg"],
    "variants": [
      { "size": "29", "color": "Xanh đậm", "stock": 25 },
      { "size": "30", "color": "Xanh đậm", "stock": 30 },
      { "size": "31", "color": "Xanh nhạt", "stock": 15 }
    ]
  }
]
```

---

## Tóm tắt — Quick Reference

| Hạng mục | Quyết định |
|----------|-----------|
| **Branching** | GitHub Flow: `main` ← `dev` ← `feature/*`, `fix/*` |
| **Branch naming** | `<type>/<PREFIX>-<number>-<description>` |
| **Commit** | Conventional Commits: `feat(scope): message` |
| **PR review** | Tối thiểu 1 reviewer, squash merge, review trong 24h |
| **FE lint** | ESLint + Prettier (xem `.prettierrc` ở trên) |
| **BE lint** | Ruff (PEP 8, line-length=100) |
| **DB naming** | snake_case, số nhiều cho table, `_id` suffix cho FK |
| **API format** | `{ status, message, data }` — luôn luôn |
| **Task flow** | DB → BE → FE (song song nếu có API contract) |
| **Seed data** | JSON files trong `scripts/seed/data/`, chạy `seed_all.py` |
| **Test accounts** | `buyer@test.com` / `Test@1234` (xem bảng đầy đủ) |

---

> **Tài liệu liên quan:**
> - Kiến trúc hệ thống: `docs/architecture.md`
> - Agent rules: `agentrules.md`
> - Phase 1 checklist: `Phase checklists/phase1.md`
