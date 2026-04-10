# Module: Product Feeds (Home Page & Listing)

## Mô tả
Module hiển thị danh sách sản phẩm trên trang Home và trang Catalog/Listing. Là điểm tiếp xúc đầu tiên của buyer với sản phẩm — cần ưu tiên trải nghiệm hấp dẫn, tải nhanh, và dễ browse.

## Thuộc về
`frontend/src/features/catalog/` & `frontend/src/pages/Home.tsx`

## Các trang / sections

### 1. Trang Home (`/`)
**Layout dự kiến:**
```
┌─────────────────────────────────┐
│          Hero Banner            │  ← Banner quảng cáo / seasonal
├─────────────────────────────────┤
│     Category Navigation         │  ← Icons danh mục nhanh
├─────────────────────────────────┤
│   🔥 Sản phẩm nổi bật          │  ← Grid cards, có thể scroll
├─────────────────────────────────┤
│   🆕 Sản phẩm mới nhất         │  ← Grid cards
├─────────────────────────────────┤
│   💰 Đang giảm giá             │  ← Sản phẩm có discount_price
└─────────────────────────────────┘
```

### 2. Trang Product Listing (`/products`)
**Layout dự kiến:**
```
┌────────────┬────────────────────┐
│            │   Sort dropdown    │
│  Sidebar   ├────────────────────┤
│  Filters   │                    │
│            │   Product Grid     │
│  - Category│   (3-4 cols)       │
│  - Price   │                    │
│  - Size    │   Card Card Card   │
│  - Color   │   Card Card Card   │
│            │   Card Card Card   │
│            ├────────────────────┤
│            │   Pagination       │
└────────────┴────────────────────┘
```

## Components

### ProductCard
| Element | Mô tả |
|---|---|
| Ảnh sản phẩm | Thumbnail, lazy loading, hover zoom nhẹ |
| Tên sản phẩm | Giới hạn 2 dòng, truncate |
| Giá | Hiển thị `discount_price` (nếu có) + gạch `base_price` |
| Đánh giá | Stars + số lượng đánh giá |
| Đã bán | "Đã bán 123" |
| Shop name | Tên shop nhỏ bên dưới |

### ProductGrid
- Responsive grid: 2 cols (mobile) → 3 cols (tablet) → 4 cols (desktop).
- Loading skeleton khi đang fetch.
- Empty state khi không có kết quả.

### FilterSidebar
- Category tree (collapsible).
- Price range slider hoặc input min/max.
- Size checkboxes (S, M, L, XL, ...).
- Color swatches.
- Nút "Áp dụng" / auto-apply khi thay đổi.

## Data Fetching
```typescript
// API call
const { data, loading, error } = useProducts({
  page: 1,
  page_size: 20,
  category: 'ao-thun',
  sort: 'newest',
  min_price: 100000,
  max_price: 500000,
});
```

## Liên kết với backend
| Frontend Action | Backend API |
|---|---|
| Load danh sách sản phẩm | `GET /api/v1/products?page=1&sort=newest` |
| Filter theo category | `GET /api/v1/products?category=ao-thun` |
| Tìm kiếm | `GET /api/v1/products?q=áo thun` |
| Load categories cho filter/nav | `GET /api/v1/categories` |

## Scope Phase 1
- Trang Home với ít nhất 1 section sản phẩm (mới nhất hoặc nổi bật).
- Trang Product Listing với grid + pagination.
- Filter cơ bản: category, price range.
- Sort: giá tăng/giảm, mới nhất.
- Responsive layout.

## UI States
| State | Hiển thị |
|---|---|
| Loading | Skeleton cards (shimmer effect) |
| Empty | Illustration + "Không tìm thấy sản phẩm" |
| Error | Thông báo lỗi + nút "Thử lại" |
| Loaded | Product grid với data |
