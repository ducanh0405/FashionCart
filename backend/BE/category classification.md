# Module: Category Classification

## Mô tả
Module quản lý hệ thống danh mục sản phẩm (categories). Hỗ trợ phân loại sản phẩm theo cấu trúc cây (parent-child), giúp buyer dễ dàng duyệt và filter sản phẩm theo loại.

## Thuộc về
`backend/src/modules/products/` (sub-module của products)

## Chức năng chính
1. **Quản lý danh mục**: CRUD categories (admin only).
2. **Cấu trúc cây (hierarchical)**: hỗ trợ danh mục cha - con (vd: Thời trang nam → Áo → Áo thun).
3. **Gán sản phẩm vào danh mục**: mỗi sản phẩm thuộc 1 category.
4. **Hiển thị menu danh mục** cho frontend navigation.
5. **Filter sản phẩm theo danh mục** khi browse.

## Database Schema (dự kiến)

### Bảng `categories`
| Column | Type | Mô tả |
|---|---|---|
| `id` | BIGINT | Primary key |
| `parent_id` | FK → categories (nullable) | Danh mục cha (null = root) |
| `name` | NVARCHAR(100) | Tên danh mục |
| `slug` | VARCHAR(100) | URL-friendly name (unique) |
| `icon_url` | VARCHAR(500) | Icon/ảnh danh mục |
| `display_order` | INT | Thứ tự hiển thị |
| `is_active` | BOOLEAN | Ẩn/hiện danh mục |

## Cấu trúc danh mục dự kiến (cho demo)
```
├── Thời trang nam
│   ├── Áo thun
│   ├── Áo sơ mi
│   ├── Quần jeans
│   └── Quần shorts
├── Thời trang nữ
│   ├── Áo croptop
│   ├── Đầm / Váy
│   ├── Quần jeans
│   └── Chân váy
└── Phụ kiện
    ├── Mũ / Nón
    ├── Túi xách
    └── Kính mát
```

## API Endpoints
| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| GET | `/api/v1/categories` | Public | Lấy toàn bộ category tree |
| GET | `/api/v1/categories/:slug/products` | Public | Sản phẩm thuộc danh mục |
| POST | `/api/v1/categories` | Admin | Tạo danh mục mới |
| PATCH | `/api/v1/categories/:id` | Admin | Cập nhật danh mục |
| DELETE | `/api/v1/categories/:id` | Admin | Xoá danh mục |

## Liên kết với module khác
- **Product CRUD**: mỗi product có `category_id`.
- **Search / Filter**: filter sản phẩm theo category.
- **Frontend Product Feeds**: hiển thị navigation menu dựa trên categories.
- **Recommendations (Phase 2)**: category là input cho gợi ý sản phẩm tương tự.

## Scope Phase 1
- Seed 2–3 cấp danh mục cho demo.
- GET API để frontend hiển thị menu + filter.
- Chưa cần giao diện quản lý category (seed qua script/admin).

## Ghi chú kỹ thuật
- Sử dụng `slug` cho URL thân thiện (vd: `/categories/ao-thun`).
- Category tree nên được cache vì ít thay đổi nhưng được query thường xuyên.
- Khi xoá category: kiểm tra còn sản phẩm thuộc category không → cảnh báo hoặc chặn.
