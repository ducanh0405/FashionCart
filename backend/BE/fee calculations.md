# Module: Fee Calculations

## Mô tả
Module tính toán các loại phí liên quan đến đơn hàng: tổng tiền hàng (subtotal), phí vận chuyển (shipping fee), giảm giá (discount), và tổng thanh toán (total). Tập trung logic tính toán ở một nơi để đảm bảo nhất quán giữa frontend hiển thị và backend xử lý.

## Thuộc về
`backend/src/modules/orders/` (sub-module, service layer)

## Chức năng chính
1. **Tính subtotal**: tổng giá sản phẩm trong giỏ (quantity × unit_price cho mỗi item).
2. **Tính phí vận chuyển**: dựa trên địa chỉ giao hàng, tổng trọng lượng, hoặc flat rate.
3. **Áp dụng giảm giá / voucher** (tương lai): trừ discount vào subtotal.
4. **Tính tổng thanh toán**: `total = subtotal + shipping_fee - discount`.

## Công thức tính
```
subtotal = Σ (quantity × unit_price)  cho mỗi cart_item
shipping_fee = tính theo rule (flat rate trong MVP)
discount = 0  (chưa có trong MVP)
total = subtotal + shipping_fee - discount
```

## Phí vận chuyển (MVP)
| Điều kiện | Phí | Ghi chú |
|---|---|---|
| Mọi đơn hàng | Flat rate: 30,000 VND | Đơn giản cho demo |
| Đơn hàng ≥ 500,000 VND | Miễn phí | Khuyến khích mua nhiều |

> **Tương lai**: tích hợp API vận chuyển (GHN, GHTK, J&T) để tính phí thực tế theo khoảng cách + khối lượng.

## Luồng tính phí khi checkout
```
1. Lấy cart items của user
2. Tính subtotal = Σ (quantity × unit_price)
3. Lấy thông tin địa chỉ giao hàng
4. Tính shipping_fee theo rule
5. Áp dụng discount nếu có
6. Trả về breakdown: { subtotal, shipping_fee, discount, total }
```

## API
| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/api/v1/cart/summary` | Trả về breakdown phí cho cart hiện tại |

## Response Example
```json
{
  "subtotal": 450000,
  "shipping_fee": 30000,
  "discount": 0,
  "total": 480000,
  "currency": "VND",
  "free_shipping_threshold": 500000,
  "amount_to_free_shipping": 50000
}
```

## Liên kết với module khác
- **Cart State Storage**: lấy danh sách items để tính subtotal.
- **Order History**: lưu kết quả tính phí vào order record.
- **Payment Processing**: total amount dùng cho thanh toán.
- **Frontend Checkout**: hiển thị breakdown phí cho user xem trước khi confirm.

## Scope Phase 1
- Subtotal tính chính xác từ cart.
- Shipping fee: flat rate 30,000 VND, miễn phí cho đơn ≥ 500,000 VND.
- Discount/voucher: chưa implement, để 0.

## Ghi chú kỹ thuật
- Logic tính phí **PHẢI** nằm ở backend service — frontend chỉ hiển thị kết quả từ API, KHÔNG tự tính.
- Dùng `DECIMAL` cho mọi giá trị tiền tệ, KHÔNG dùng `FLOAT`.
- Đảm bảo tính phí nhất quán: giá trị hiển thị trên cart summary == giá trị lưu trong order.
