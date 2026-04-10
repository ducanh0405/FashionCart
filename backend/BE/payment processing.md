# Module: Payment Processing

## Mô tả
Module xử lý thanh toán đơn hàng. Trong Phase 1 (MVP), chỉ hỗ trợ **thanh toán giả lập** (COD — thanh toán khi nhận hàng). Kiến trúc được thiết kế sẵn để dễ dàng tích hợp cổng thanh toán thật trong tương lai.

## Thuộc về
`backend/src/modules/orders/` (sub-module của orders)

## Chức năng chính
1. **Xác định phương thức thanh toán** khi checkout.
2. **Validate thanh toán**: kiểm tra phương thức hợp lệ, tổng tiền chính xác.
3. **Ghi nhận trạng thái thanh toán**: paid / unpaid / refunded.
4. **Payment gateway abstraction**: interface chuẩn để sau này plug-in VNPay, MoMo, etc.

## Phương thức thanh toán

### Phase 1 (MVP)
| Phương thức | Mã | Mô tả |
|---|---|---|
| Thanh toán khi nhận hàng | `cod` | Giả lập — đơn tạo xong = thanh toán thành công |

### Tương lai (Phase 4+)
| Phương thức | Mã | Ghi chú |
|---|---|---|
| VNPay | `vnpay` | Cổng thanh toán phổ biến VN |
| MoMo | `momo` | Ví điện tử |
| Bank Transfer | `bank_transfer` | Chuyển khoản ngân hàng |

## Luồng thanh toán (MVP - COD)
```
1. User chọn phương thức "Thanh toán khi nhận hàng"
2. Backend validate → tạo order với payment_method = "cod"
3. Order status = "pending", payment_status = "unpaid"
4. Khi đơn delivered → payment_status = "paid" (cập nhật thủ công hoặc tự động)
```

## Design Pattern cho mở rộng
```python
# Interface chuẩn cho mọi payment provider
class PaymentProvider:
    def initiate_payment(order_id, amount) → PaymentResult
    def verify_payment(transaction_id) → PaymentStatus
    def refund(transaction_id, amount) → RefundResult

# Implementations
class CODProvider(PaymentProvider): ...
class VNPayProvider(PaymentProvider): ...  # Tương lai
```

## Liên kết với module khác
- **Order History**: ghi nhận `payment_method` và `payment_status` trong order.
- **Cart**: total amount tính từ cart trước khi thanh toán.
- **Fee Calculations**: tổng tiền thanh toán = subtotal + shipping_fee.

## Scope Phase 1
- Chỉ COD, không tích hợp payment gateway thật.
- Tạo sẵn abstraction layer để mở rộng sau.
- Payment status tracking cơ bản.

## Ghi chú kỹ thuật
- **KHÔNG** lưu thông tin thẻ/tài khoản ngân hàng trong DB.
- Mọi giao dịch thanh toán phải có log/audit trail.
- Khi tích hợp payment gateway thật → cần HTTPS, webhook verification, và idempotency key.
