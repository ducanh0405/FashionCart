# Module: Checkout Screens

## Mô tả
Module giao diện thanh toán — bước cuối cùng của buyer flow. Thu thập thông tin giao hàng, hiển thị tổng tiền, xác nhận đơn hàng, và hiển thị kết quả đặt hàng thành công.

## Thuộc về
`frontend/src/features/checkout/` & `frontend/src/pages/Checkout.tsx`

## Route
`/checkout` (yêu cầu đăng nhập + giỏ hàng không rỗng)

## Các bước checkout

### Bước 1: Thông tin giao hàng
```
┌──────────────────────────────────────────┐
│  📦 Thông tin giao hàng                  │
├──────────────────────────────────────────┤
│  [Chọn địa chỉ đã lưu ▾]               │
│  ─── hoặc ───                            │
│  Họ tên người nhận: [______________]     │
│  Số điện thoại:     [______________]     │
│  Tỉnh/Thành phố:   [Chọn ▾]            │
│  Quận/Huyện:        [Chọn ▾]            │
│  Phường/Xã:         [Chọn ▾]            │
│  Địa chỉ chi tiết:  [______________]    │
│  Ghi chú:           [______________]     │
│  ☐ Lưu làm địa chỉ mặc định            │
├──────────────────────────────────────────┤
│  💳 Phương thức thanh toán               │
│  ◉ Thanh toán khi nhận hàng (COD)       │
│  ○ Chuyển khoản ngân hàng (Sắp có)      │
│  ○ VNPay (Sắp có)                       │
└──────────────────────────────────────────┘
```

### Bước 2: Xác nhận đơn hàng
```
┌──────────────────────────────────────────┐
│  ✅ Xác nhận đơn hàng                    │
├──────────────────────────────────────────┤
│  📍 Giao đến: Nguyễn Văn A, 0912...     │
│      123 Đường ABC, Q.1, HCM            │
├──────────────────────────────────────────┤
│  🛍️ Sản phẩm (3 items)                  │
│  ┌────┬──────────────┬───────┐           │
│  │ img│ Áo thun M    │ x2   │ 500K      │
│  │ img│ Quần jeans L │ x1   │ 350K      │
│  └────┴──────────────┴───────┘           │
├──────────────────────────────────────────┤
│  Tạm tính:    850,000₫                  │
│  Phí vận chuyển: Miễn phí 🎉            │
│  ──────────────────────                  │
│  Tổng thanh toán: 850,000₫              │
├──────────────────────────────────────────┤
│  💳 Thanh toán: COD                      │
├──────────────────────────────────────────┤
│            [Đặt hàng]                    │
└──────────────────────────────────────────┘
```

### Bước 3: Đặt hàng thành công
```
┌──────────────────────────────────────────┐
│            ✅ 🎉                          │
│     Đặt hàng thành công!                │
│                                          │
│     Mã đơn hàng: FC-20260408-001        │
│     Tổng thanh toán: 850,000₫           │
│                                          │
│     [Xem đơn hàng]  [Tiếp tục mua sắm] │
└──────────────────────────────────────────┘
```

## Components

| Component | Mô tả |
|---|---|
| `ShippingForm` | Form nhập thông tin giao hàng với validation |
| `AddressSelector` | Dropdown chọn từ địa chỉ đã lưu |
| `PaymentMethodSelector` | Radio buttons chọn phương thức thanh toán |
| `OrderReview` | Tóm tắt đơn hàng trước khi confirm |
| `OrderConfirmation` | Trang thông báo thành công |
| `CheckoutSummary` | Sidebar tổng tiền (hiển thị suốt luồng checkout) |

## Validation (client-side)

| Field | Rule |
|---|---|
| Họ tên | Không rỗng, 2-100 ký tự |
| SĐT | Format VN, 10 số |
| Tỉnh/Quận/Phường | Phải chọn |
| Địa chỉ chi tiết | Không rỗng, ≥ 10 ký tự |
| Phương thức thanh toán | Phải chọn |

## Luồng đặt hàng
```
1. Validate form thông tin giao hàng
2. Hiển thị trang xác nhận (review)
3. User click "Đặt hàng"
4. Gọi POST /api/v1/orders
5. Thành công → hiển thị Order Confirmation + clear cart
6. Thất bại → hiển thị lỗi (hết hàng, server error, etc.)
```

## Liên kết với backend
| Frontend Action | Backend API |
|---|---|
| Load địa chỉ đã lưu | `GET /api/v1/users/me/addresses` |
| Lấy cart summary | `GET /api/v1/cart/summary` |
| Tạo đơn hàng | `POST /api/v1/orders` |

## Scope Phase 1
- Form thông tin giao hàng (nhập mới, chưa cần chọn từ saved addresses).
- Chỉ COD payment.
- Order review + confirmation page.
- Clear cart sau checkout thành công.

## UI States
| State | Hiển thị |
|---|---|
| Loading | Skeleton form |
| Form errors | Inline error messages dưới mỗi field |
| Submitting | Spinner trên nút "Đặt hàng", disable form |
| Success | Confetti animation + order confirmation |
| Error (out of stock) | Modal "Một số sản phẩm đã hết hàng" + link quay lại cart |
| Error (server) | Toast lỗi + nút "Thử lại" |
