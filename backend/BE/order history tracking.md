# Module: Order History Tracking

## Mô tả
Module quản lý toàn bộ vòng đời đơn hàng: tạo đơn từ giỏ hàng, lưu trữ lịch sử, theo dõi trạng thái, và cung cấp thông tin cho buyer xem lại các đơn hàng đã đặt.

## Thuộc về
`backend/src/modules/orders/`

## Chức năng chính
1. **Tạo đơn hàng**: chuyển đổi cart → order kèm thông tin giao hàng.
2. **Lưu snapshot sản phẩm**: lưu lại thông tin sản phẩm tại thời điểm mua (tránh bị ảnh hưởng khi sản phẩm thay đổi giá/tên sau này).
3. **Tracking trạng thái đơn hàng**: pending → confirmed → shipping → delivered / cancelled.
4. **Xem lịch sử đơn hàng**: danh sách đơn hàng của buyer, có phân trang.
5. **Chi tiết đơn hàng**: xem từng item, giá, trạng thái, thông tin giao hàng.

## Database Schema (dự kiến)

### Bảng `orders`
| Column | Type | Mô tả |
|---|---|---|
| `id` | BIGINT | Primary key |
| `order_code` | VARCHAR(20) | Mã đơn hàng hiển thị (FC-20260408-001) |
| `user_id` | FK → users | Người mua |
| `status` | VARCHAR(20) | Trạng thái đơn (xem bên dưới) |
| `subtotal` | DECIMAL(12,2) | Tổng tiền hàng |
| `shipping_fee` | DECIMAL(12,2) | Phí vận chuyển |
| `total` | DECIMAL(12,2) | Tổng thanh toán |
| `shipping_name` | NVARCHAR(100) | Tên người nhận |
| `shipping_phone` | VARCHAR(20) | SĐT người nhận |
| `shipping_address` | NVARCHAR(500) | Địa chỉ giao hàng đầy đủ |
| `note` | NVARCHAR(500) | Ghi chú đơn hàng |
| `payment_method` | VARCHAR(30) | `cod` / `bank_transfer` / ... |
| `created_at` | DATETIME | Ngày tạo đơn |
| `updated_at` | DATETIME | Lần cập nhật cuối |

### Bảng `order_items`
| Column | Type | Mô tả |
|---|---|---|
| `id` | BIGINT | Primary key |
| `order_id` | FK → orders | Đơn hàng |
| `product_id` | FK → products | Reference sản phẩm gốc |
| `product_name` | NVARCHAR(200) | **Snapshot** tên SP tại thời điểm mua |
| `product_image` | VARCHAR(500) | **Snapshot** ảnh SP |
| `variant_info` | NVARCHAR(100) | "Size M, Màu Đen" |
| `quantity` | INT | Số lượng |
| `unit_price` | DECIMAL(12,2) | Giá tại thời điểm mua |
| `subtotal` | DECIMAL(12,2) | quantity × unit_price |

### Trạng thái đơn hàng (Order Status Flow)
```
pending → confirmed → shipping → delivered
                ↘ cancelled
```

| Status | Mô tả |
|---|---|
| `pending` | Đơn mới tạo, chờ xác nhận |
| `confirmed` | Shop/hệ thống đã xác nhận |
| `shipping` | Đang giao hàng |
| `delivered` | Đã giao thành công |
| `cancelled` | Đã huỷ |

## Luồng tạo đơn hàng
```
1. Validate cart không rỗng
2. Validate thông tin giao hàng đầy đủ
3. Kiểm tra lại tồn kho cho mỗi cart item
4. Tạo order + order_items (snapshot product info)
5. Trừ stock trong product_variants
6. Chuyển cart status → "converted"
7. Trả về order confirmation
```

## Liên kết với module khác
- **Cart**: nguồn dữ liệu tạo đơn hàng.
- **Product CRUD**: reference sản phẩm gốc + trừ stock.
- **Account Data**: lấy thông tin giao hàng.
- **Fee Calculations**: tính shipping_fee và total.
- **Payment Processing**: xử lý thanh toán (giả lập trong MVP).

## Scope Phase 1
- Tạo đơn hàng từ cart: đầy đủ flow.
- Xem danh sách + chi tiết đơn hàng đã đặt.
- Trạng thái đơn: chỉ cần `pending` → `confirmed` → `delivered` cho demo.
- Thanh toán: giả lập COD (Cash on Delivery).

## Ghi chú kỹ thuật
- **BẮT BUỘC** snapshot thông tin sản phẩm vào order_items — không dùng JOIN lấy từ products vì giá/tên có thể thay đổi.
- `order_code` sinh tự động theo format có ý nghĩa (vd: FC-YYYYMMDD-XXX).
- Sử dụng database transaction khi tạo đơn để đảm bảo tính nhất quán (tạo order + trừ stock + clear cart phải atomic).
