# Module: Search & Filter UI

## Mô tả
Module giao diện tìm kiếm và lọc sản phẩm. Bao gồm thanh tìm kiếm trên Navbar, bộ lọc sidebar, và hiển thị kết quả. Giúp buyer tìm nhanh sản phẩm mong muốn.

## Thuộc về
`frontend/src/features/catalog/` & `frontend/src/components/SearchBar.tsx`

## Components

### 1. SearchBar (trên Navbar — global)
```
┌─────────────────────────────────────┐
│  🔍 [Tìm kiếm sản phẩm...    ] 🔎 │
└─────────────────────────────────────┘
```
- Hiện trên tất cả các trang (nằm trong Navbar).
- Enter hoặc click icon → navigate đến `/products?q=keyword`.
- Có thể thêm search suggestions dropdown (tương lai).

### 2. FilterSidebar (trang Product Listing)
```
┌─────────────────────┐
│  📂 Danh mục        │
│  ▸ Áo thun          │
│  ▸ Áo sơ mi         │
│  ▸ Quần jeans       │
│                     │
│  💰 Khoảng giá      │
│  [100K] — [500K]    │
│  ○ Dưới 200K        │
│  ○ 200K - 500K      │
│  ○ Trên 500K        │
│                     │
│  📏 Size            │
│  ☐ S  ☐ M           │
│  ☐ L  ☐ XL          │
│                     │
│  🎨 Màu sắc        │
│  ● ● ● ● ● ●       │
│                     │
│  [Áp dụng] [Xoá bộ lọc] │
└─────────────────────┘
```

### 3. ActiveFilters (trang listing, trên grid)
```
Đang lọc: [Áo thun ×] [Size M ×] [200K-500K ×]  [Xoá tất cả]
```

### 4. SortDropdown
```
Sắp xếp: [Mới nhất ▾]
  ├── Mới nhất
  ├── Bán chạy
  ├── Giá thấp → cao
  └── Giá cao → thấp
```

## State Management
```typescript
interface FilterState {
  q: string;           // Từ khoá tìm kiếm
  category: string;    // Slug danh mục
  minPrice: number;
  maxPrice: number;
  sizes: string[];     // ["S", "M"]
  colors: string[];    // ["Trắng", "Đen"]
  sort: 'newest' | 'best_selling' | 'price_asc' | 'price_desc';
  page: number;
  pageSize: number;
}
```

## Luồng tìm kiếm
```
1. User nhập keyword vào SearchBar → Enter
2. Navigate đến /products?q=keyword
3. ProductListing page đọc query params → fetch API
4. Hiển thị kết quả + tổng số kết quả
```

## Luồng filter
```
1. User thay đổi filter (category/price/size/color)
2. Update URL query params (sync state với URL)
3. Debounce 300ms → fetch API với params mới
4. Hiển thị kết quả mới, reset về page 1
```

## Liên kết với backend
| Frontend Action | Backend API |
|---|---|
| Search | `GET /api/v1/products?q=keyword` |
| Filter | `GET /api/v1/products?category=x&min_price=y` |
| Sort | `GET /api/v1/products?sort=price_asc` |
| Load categories | `GET /api/v1/categories` |

## Scope Phase 1
- SearchBar trên Navbar.
- Filter cơ bản: category, price range.
- Sort: mới nhất, giá tăng/giảm.
- URL sync (bookmark/share được kết quả search).
- Pagination.

## Ghi chú kỹ thuật
- Filter state nên sync với URL query params → user có thể bookmark/share link tìm kiếm.
- Debounce API calls khi filter thay đổi liên tục.
- Mobile: FilterSidebar chuyển thành bottom sheet hoặc modal.
