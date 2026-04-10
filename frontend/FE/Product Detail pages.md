# Module: Product Detail Pages

## Mô tả
Module hiển thị trang chi tiết sản phẩm — nơi buyer xem đầy đủ thông tin, chọn variant (size/màu), và thêm sản phẩm vào giỏ hàng. Đây là trang quan trọng nhất cho quyết định mua hàng.

## Thuộc về
`frontend/src/pages/ProductDetail.tsx` & `frontend/src/features/catalog/`

## Route
`/products/:id`

## Layout dự kiến
```
┌──────────────────────────────────────────┐
│  Breadcrumb: Home > Áo thun > Sản phẩm  │
├────────────────┬─────────────────────────┤
│                │  Tên sản phẩm           │
│  Image Gallery │  ⭐⭐⭐⭐☆ (4.2) | Đã bán 156  │
│                │                         │
│  [main image]  │  💰 299,000₫            │
│                │  ~~399,000₫~~ -25%      │
│  [thumbnails]  │                         │
│                │  📏 Chọn size: [S] [M] [L] [XL]  │
│                │  🎨 Chọn màu: ● ● ● ●  │
│                │  📦 Kho: Còn 23 sản phẩm │
│                │                         │
│                │  Số lượng: [-] 1 [+]    │
│                │                         │
│                │  [🛒 Thêm vào giỏ hàng] │
│                │  [👗 Thử đồ ảo] (Phase 3) │
├────────────────┴─────────────────────────┤
│  📋 Mô tả sản phẩm                      │
│  Chi tiết về chất liệu, kiểu dáng, ...  │
├──────────────────────────────────────────┤
│  📏 Bảng size (Size Chart)               │
├──────────────────────────────────────────┤
│  🏪 Thông tin shop                       │
│  [Tên shop] | [Xem shop]                │
├──────────────────────────────────────────┤
│  💡 Sản phẩm tương tự (Phase 2)         │
│  [Card] [Card] [Card] [Card]            │
└──────────────────────────────────────────┘
```

## Components

| Component | Mô tả |
|---|---|
| `ImageGallery` | Ảnh chính + thumbnails, click để zoom, swipe trên mobile |
| `VariantSelector` | Chọn size + màu, hiển thị stock theo variant |
| `QuantitySelector` | Nút +/- với min=1, max=stock |
| `AddToCartButton` | Nút thêm vào giỏ, disable khi chưa chọn variant hoặc hết hàng |
| `ProductDescription` | Mô tả sản phẩm, có thể collapse nếu dài |
| `SizeChart` | Bảng size tham khảo |
| `ShopInfo` | Tên shop, đánh giá shop, link xem shop |
| `SimilarProducts` | Grid sản phẩm tương tự (Phase 2) |

## Luồng "Thêm vào giỏ hàng"
```
1. User chọn size + màu (bắt buộc nếu có variants)
2. User chọn số lượng
3. Click "Thêm vào giỏ hàng"
4. Validate: đã chọn variant? quantity <= stock?
5. Gọi POST /api/v1/cart/items
6. Thành công → toast "Đã thêm vào giỏ hàng" + update cart badge trên Navbar
7. Thất bại → toast lỗi
```

## Liên kết với backend
| Frontend Action | Backend API |
|---|---|
| Load chi tiết sản phẩm | `GET /api/v1/products/:id` |
| Thêm vào giỏ | `POST /api/v1/cart/items` |
| Gợi ý size (Phase 2) | `GET /api/v1/products/:id/size-recommendation` |
| Sản phẩm tương tự (Phase 2) | `GET /api/v1/products/:id/similar` |
| Thử đồ ảo (Phase 3) | `POST /api/v1/vton/try-on` |

## Scope Phase 1
- Hiển thị đầy đủ: ảnh, tên, giá, mô tả, shop info.
- Chọn variant (size/color) với stock display.
- Thêm vào giỏ hàng hoàn chỉnh.
- Bảng size tĩnh (hardcode hoặc từ data).
- Placeholder cho nút "Thử đồ ảo" (disabled, hiện "Sắp ra mắt").

## UI States
| State | Hiển thị |
|---|---|
| Loading | Skeleton layout toàn trang |
| Product not found | 404 page hoặc "Sản phẩm không tồn tại" |
| Out of stock | Badge "Hết hàng", disable nút mua |
| Variant not selected | Nút mua disabled + hint "Vui lòng chọn size" |
| Add to cart success | Toast notification + cart badge update |
| Add to cart error | Toast lỗi đỏ |
