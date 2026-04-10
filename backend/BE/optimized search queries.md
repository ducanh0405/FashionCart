# Module: Optimized Search Queries

## Mô tả
Module tối ưu hoá truy vấn tìm kiếm và filter sản phẩm. Đảm bảo trải nghiệm tìm kiếm nhanh, chính xác ngay cả khi số lượng sản phẩm tăng lên. Hỗ trợ tìm kiếm theo từ khoá, filter theo nhiều tiêu chí, và sắp xếp kết quả.

## Thuộc về
`backend/src/modules/products/` (service layer, query optimization)

## Chức năng chính
1. **Full-text search**: tìm kiếm sản phẩm theo tên, mô tả.
2. **Multi-filter**: filter đồng thời theo category, giá, size, màu, shop.
3. **Sorting**: sắp xếp theo giá, mới nhất, bán chạy, đánh giá.
4. **Pagination**: phân trang hiệu quả cho danh sách lớn.
5. **Search suggestions** (tương lai): gợi ý từ khoá khi user gõ.

## Filter Parameters
| Parameter | Type | Mô tả | Ví dụ |
|---|---|---|---|
| `q` | string | Từ khoá tìm kiếm | `áo thun trắng` |
| `category` | string | Slug danh mục | `ao-thun` |
| `min_price` | number | Giá tối thiểu (VND) | `100000` |
| `max_price` | number | Giá tối đa (VND) | `500000` |
| `sizes` | string[] | Lọc theo size | `S,M,L` |
| `colors` | string[] | Lọc theo màu | `Trắng,Đen` |
| `shop_id` | number | Sản phẩm của shop cụ thể | `5` |
| `sort` | string | Tiêu chí sắp xếp | `price_asc`, `price_desc`, `newest`, `best_selling` |
| `page` | number | Trang hiện tại | `1` |
| `page_size` | number | Số kết quả / trang | `20` |

## Chiến lược tối ưu

### Phase 1 (MVP)
- **Database indexing**: tạo index trên các cột thường query: `name`, `category_id`, `base_price`, `status`, `created_at`.
- **Efficient JOINs**: chỉ JOIN bảng cần thiết, tránh N+1 query.
- **Pagination**: dùng `OFFSET/LIMIT` cho đơn giản.

### Tương lai
- **Full-text search engine**: Elasticsearch hoặc SQL Server Full-Text Index.
- **Cursor-based pagination**: hiệu quả hơn cho dataset lớn.
- **Query caching**: cache kết quả search phổ biến với Redis.
- **Search analytics**: tracking từ khoá phổ biến để cải thiện UX.

## SQL Index Plan
```sql
-- Indexes cho bảng products
CREATE INDEX idx_products_category ON products(category_id) WHERE status = 'active';
CREATE INDEX idx_products_price ON products(base_price) WHERE status = 'active';
CREATE INDEX idx_products_created ON products(created_at DESC) WHERE status = 'active';
CREATE INDEX idx_products_name ON products(name);

-- Indexes cho bảng product_variants
CREATE INDEX idx_variants_product ON product_variants(product_id);
CREATE INDEX idx_variants_size ON product_variants(size);
```

## Liên kết với module khác
- **Product CRUD**: truy vấn dữ liệu sản phẩm.
- **Category Classification**: filter theo category tree.
- **Frontend Search & Filter**: UI gọi API search.
- **Recommendations (Phase 2)**: kết hợp search results với personalized suggestions.

## Scope Phase 1
- Search theo tên sản phẩm (LIKE query hoặc basic full-text).
- Filter theo category, price range.
- Sort theo price, newest.
- Pagination cơ bản.
- Database indexing cho các truy vấn phổ biến.

## Ghi chú kỹ thuật
- Luôn filter `status = 'active'` — không hiển thị sản phẩm đã ẩn/xoá.
- Sanitize search input để tránh SQL injection.
- Trả về `total_count` cùng với results để frontend hiển thị pagination.
- Giới hạn `page_size` tối đa (vd: 50) để tránh truy vấn quá nặng.
