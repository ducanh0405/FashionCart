# Module: Cart Management UI

## Mô tả
Module giao diện quản lý giỏ hàng: hiển thị các sản phẩm đã thêm, cập nhật số lượng, xoá item, và xem tổng tiền. Là bước trung gian giữa "thêm vào giỏ" và "thanh toán".

## Thuộc về
`frontend/src/features/cart/` & `frontend/src/pages/Cart.tsx`

## Route
`/cart` (yêu cầu đăng nhập)

## Layout dự kiến
```
┌──────────────────────────────────────────────┐
│  🛒 Giỏ hàng của bạn (3 sản phẩm)           │
├──────────────────────────┬───────────────────┤
│                          │                   │
│  ┌────┬────────────────┐ │  📋 Tóm tắt      │
│  │ img│ Tên sản phẩm   │ │                   │
│  │    │ Size: M, Đen   │ │  Tạm tính: 750K  │
│  │    │ 250,000₫       │ │  Phí ship: 30K   │
│  │    │ [-] 2 [+] [🗑] │ │  ──────────────   │
│  └────┴────────────────┘ │  Tổng: 780,000₫  │
│                          │                   │
│  ┌────┬────────────────┐ │  [Mua hàng →]     │
│  │ img│ Tên sản phẩm 2 │ │                   │
│  │    │ Size: L, Trắng │ │                   │
│  │    │ 199,000₫       │ │  🚚 Mua thêm 220K│
│  │    │ [-] 1 [+] [🗑] │ │  để miễn phí ship │
│  └────┴────────────────┘ │                   │
│                          │                   │
├──────────────────────────┴───────────────────┤
│  [← Tiếp tục mua sắm]                       │
└──────────────────────────────────────────────┘
```

## Components

| Component | Mô tả |
|---|---|
| `CartItemRow` | Hiển thị 1 item: ảnh, tên, variant, giá, quantity selector, nút xoá |
| `QuantityControl` | Nút +/- với validation (min 1, max stock) |
| `CartSummary` | Tóm tắt: subtotal, shipping, total, nút checkout |
| `EmptyCart` | State khi giỏ hàng trống: illustration + CTA "Khám phá sản phẩm" |
| `CartBadge` | Badge số lượng trên icon giỏ hàng ở Navbar (global) |

## Luồng nghiệp vụ

### Cập nhật số lượng
```
1. User click +/- hoặc nhập số
2. Validate: 1 <= quantity <= stock
3. Gọi PATCH /api/v1/cart/items/:id
4. Cập nhật subtotal realtime
5. Nếu lỗi → revert về giá trị cũ + toast lỗi
```

### Xoá item
```
1. User click 🗑 → confirm dialog "Xoá sản phẩm này?"
2. Gọi DELETE /api/v1/cart/items/:id
3. Animate remove item khỏi list
4. Cập nhật subtotal + cart badge
```

### Proceed to checkout
```
1. Validate cart không rỗng
2. Redirect đến /checkout
```

## State Management
```typescript
interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  summary: {
    subtotal: number;
    shippingFee: number;
    discount: number;
    total: number;
  };
}
```

## Liên kết với backend
| Frontend Action | Backend API |
|---|---|
| Load giỏ hàng | `GET /api/v1/cart` |
| Update quantity | `PATCH /api/v1/cart/items/:id` |
| Remove item | `DELETE /api/v1/cart/items/:id` |
| Get cart summary | `GET /api/v1/cart/summary` |

## Scope Phase 1
- Hiển thị đầy đủ danh sách cart items.
- Update quantity + remove item.
- Cart summary (subtotal, shipping, total).
- Cart badge trên Navbar.
- Empty cart state.
- Nút checkout → navigate sang `/checkout`.

## UI States
| State | Hiển thị |
|---|---|
| Loading | Skeleton rows |
| Empty | Illustration + "Giỏ hàng trống" + "Mua sắm ngay" |
| Loaded | Danh sách items + summary |
| Updating | Spinner nhỏ trên quantity đang update |
| Error | Toast notification đỏ |
