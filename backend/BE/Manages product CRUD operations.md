# Module: Product CRUD Operations

## Mô tả
Module quản lý toàn bộ vòng đời sản phẩm: tạo, đọc, cập nhật, xoá sản phẩm và các thông tin liên quan (variant size/màu, ảnh, mô tả). Là module trung tâm của hệ thống e-commerce.

## Thuộc về
`backend/src/modules/products/`

## Chức năng chính
1. **Danh sách sản phẩm**: lấy list sản phẩm có phân trang, hỗ trợ filter/sort.
2. **Chi tiết sản phẩm**: lấy đầy đủ thông tin 1 sản phẩm bao gồm variants, ảnh, shop info.
3. **Tạo sản phẩm** (shop owner): tạo sản phẩm mới với đầy đủ thông tin.
4. **Cập nhật sản phẩm** (shop owner): sửa thông tin, giá, ảnh, variant.
5. **Xoá / ẩn sản phẩm** (shop owner / admin): soft delete hoặc đánh dấu ẩn.
6. **Quản lý variants**: size, màu, tồn kho cho từng variant.

## Database Schema (dự kiến)

### Bảng `products`
| Column | Type | Mô tả |
|---|---|---|
| `id` | BIGINT | Primary key |
| `shop_id` | FK → shops | Shop sở hữu sản phẩm |
| `category_id` | FK → categories | Danh mục sản phẩm |
| `name` | NVARCHAR(200) | Tên sản phẩm |
| `description` | NTEXT | Mô tả chi tiết |
| `base_price` | DECIMAL(12,2) | Giá cơ bản |
| `discount_price` | DECIMAL(12,2) | Giá sau giảm (nullable) |
| `thumbnail_url` | VARCHAR(500) | Ảnh đại diện chính |
| `status` | VARCHAR(20) | `active` / `draft` / `hidden` / `deleted` |
| `total_sold` | INT | Tổng số lượng đã bán |
| `average_rating` | DECIMAL(2,1) | Đánh giá trung bình |
| `created_at` | DATETIME | Ngày tạo |
| `updated_at` | DATETIME | Ngày cập nhật |

### Bảng `product_variants`
| Column | Type | Mô tả |
|---|---|---|
| `id` | BIGINT | Primary key |
| `product_id` | FK → products | Sản phẩm cha |
| `size` | VARCHAR(10) | S, M, L, XL, ... |
| `color` | NVARCHAR(30) | Tên màu |
| `color_code` | VARCHAR(7) | Mã màu hex (#FF0000) |
| `stock` | INT | Số lượng tồn kho |
| `price_adjustment` | DECIMAL(12,2) | Chênh lệch giá so với base_price (default 0) |
| `sku` | VARCHAR(50) | Mã SKU duy nhất |

### Bảng `product_images`
| Column | Type | Mô tả |
|---|---|---|
| `id` | BIGINT | Primary key |
| `product_id` | FK → products | Sản phẩm |
| `image_url` | VARCHAR(500) | URL ảnh |
| `display_order` | INT | Thứ tự hiển thị |
| `alt_text` | NVARCHAR(200) | Mô tả ảnh |

## API Endpoints
| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| GET | `/api/v1/products` | Public | Danh sách + filter + pagination |
| GET | `/api/v1/products/:id` | Public | Chi tiết sản phẩm |
| POST | `/api/v1/products` | Shop | Tạo sản phẩm mới |
| PATCH | `/api/v1/products/:id` | Shop (owner) | Cập nhật sản phẩm |
| DELETE | `/api/v1/products/:id` | Shop (owner) / Admin | Xoá sản phẩm |

## Query Parameters cho listing
| Param | Mô tả | Ví dụ |
|---|---|---|
| `page` | Trang hiện tại | `?page=1` |
| `page_size` | Số item/trang | `?page_size=20` |
| `category` | Filter theo danh mục | `?category=ao-thun` |
| `min_price` | Giá tối thiểu | `?min_price=100000` |
| `max_price` | Giá tối đa | `?max_price=500000` |
| `sort` | Sắp xếp | `?sort=price_asc` / `newest` / `best_selling` |
| `q` | Tìm kiếm theo tên | `?q=áo thun` |

## Liên kết với module khác
- **Category Classification**: phân loại sản phẩm theo danh mục.
- **Cart**: cart items reference tới product + variant.
- **Orders**: order items snapshot thông tin sản phẩm tại thời điểm mua.
- **Search**: module search queries tối ưu truy vấn sản phẩm.
- **Recommendations (Phase 2)**: product data là input cho DSS.
- **VTON (Phase 3)**: product images là input cho Virtual Try-On.

## Scope Phase 1
- GET list + detail: đầy đủ cho buyer.
- CRUD cho shop owner: chuẩn bị sẵn API, ưu tiên seed data qua script.
- Variants (size/color): có sẵn trong schema, frontend hiển thị được.
- Filter/sort cơ bản.

## Ghi chú kỹ thuật
- Ảnh sản phẩm nên lưu trên cloud storage (S3/GCS), DB chỉ lưu URL.
- Khi xoá sản phẩm → soft delete (`status = 'deleted'`), không xoá thật.
- `discount_price` nếu null → hiển thị `base_price`, nếu có → hiển thị giá giảm + gạch giá gốc.
