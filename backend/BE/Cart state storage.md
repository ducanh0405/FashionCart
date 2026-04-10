# Module: Cart State Storage

## Mô tả
Module quản lý trạng thái giỏ hàng của người dùng. Lưu trữ, cập nhật, và truy vấn các sản phẩm mà buyer đã thêm vào giỏ, cùng với thông tin variant (size, màu) và số lượng.

## Thuộc về
`backend/src/modules/cart/`

## Chức năng chính
1. **Lấy giỏ hàng hiện tại** của user đang đăng nhập.
2. **Thêm sản phẩm vào giỏ**: kiểm tra tồn kho, kiểm tra trùng lặp (nếu đã có thì tăng quantity).
3. **Cập nhật số lượng** item trong giỏ.
4. **Xoá item** khỏi giỏ.
5. **Tính toán subtotal**: tổng tiền sản phẩm trong giỏ (chưa tính phí vận chuyển).
6. **Clear giỏ hàng** sau khi checkout thành công.

## Database Schema (dự kiến)

### Bảng `carts`
| Column | Type | Mô tả |
|---|---|---|
| `id` | BIGINT | Primary key |
| `user_id` | FK → users | Mỗi user có 1 cart active |
| `status` | VARCHAR(20) | `active` / `converted` / `abandoned` |
| `created_at` | DATETIME | Ngày tạo |
| `updated_at` | DATETIME | Ngày cập nhật |

### Bảng `cart_items`
| Column | Type | Mô tả |
|---|---|---|
| `id` | BIGINT | Primary key |
| `cart_id` | FK → carts | Giỏ hàng chứa item này |
| `product_id` | FK → products | Sản phẩm |
| `variant_id` | FK → product_variants | Size/Màu cụ thể (nullable nếu sản phẩm không có variant) |
| `quantity` | INT | Số lượng (≥ 1) |
| `unit_price` | DECIMAL(12,2) | Giá tại thời điểm thêm vào giỏ |
| `added_at` | DATETIME | Thời điểm thêm |

## Luồng nghiệp vụ chính

### Thêm vào giỏ
```
1. Kiểm tra product_id và variant_id có tồn tại không
2. Kiểm tra số lượng tồn kho (stock >= requested quantity)
3. Nếu item đã có trong giỏ (cùng product + variant) → tăng quantity
4. Nếu chưa có → tạo cart_item mới
5. Cập nhật updated_at của cart
```

### Checkout → Clear
```
1. Order module tạo order từ cart items
2. Cart status chuyển sang "converted"
3. Tạo cart mới (active) cho user
```

## Liên kết với module khác
- **Product CRUD**: validate product/variant tồn tại và còn hàng.
- **Orders**: chuyển đổi cart → order khi checkout.
- **Fee Calculations**: tính subtotal dựa trên cart items.
- **Frontend Cart UI**: hiển thị dữ liệu từ cart API.

## Scope Phase 1
- CRUD đầy đủ cho cart items.
- Mỗi user chỉ có 1 cart active tại một thời điểm.
- Tính subtotal cơ bản.
- Clear cart sau checkout.

## Ghi chú kỹ thuật
- `unit_price` lưu giá tại thời điểm thêm vào giỏ — tránh giá thay đổi sau khi user đã thêm.
- Validate `quantity > 0` và `quantity <= stock` ở tầng service.
- Cart phải gắn với user đã đăng nhập (không hỗ trợ guest cart trong MVP).
