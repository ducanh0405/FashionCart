# Module: Recommendations (Backend Integration Layer)

## Mô tả
Module tầng backend đóng vai trò **trung gian** giữa frontend và ML-Services (DSS). Nhận request từ frontend, gọi sang DSS service để lấy kết quả gợi ý, xử lý fallback khi ML service không hoạt động, và trả về dữ liệu sẵn sàng cho frontend hiển thị.

> ⚠️ Module này **KHÔNG** chứa logic ML/AI. Logic inference nằm ở `ml-services/dss/`.

## Thuộc về
`backend/src/modules/recommendations/`

## Chức năng chính
1. **Size recommendation**: gợi ý size phù hợp dựa trên thông tin cơ thể user (chiều cao, cân nặng, số đo).
2. **Product recommendation**: gợi ý sản phẩm tương tự hoặc phù hợp với sở thích user.
3. **Fallback handling**: khi DSS service lỗi/timeout → trả về kết quả mặc định hoặc rule-based đơn giản.
4. **Caching**: cache kết quả recommendation để giảm tải cho ML service.

## Luồng hoạt động
```
Frontend request
    ↓
Backend Recommendation Controller
    ↓
Gọi internal API sang DSS service (HTTP)
    ↓                        ↓ (timeout/error)
Nhận kết quả ML          Fallback logic
    ↓                        ↓
Enrich data (join product info)
    ↓
Trả response cho frontend
```

## API Endpoints
| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/api/v1/products/:id/size-recommendation` | Gợi ý size cho sản phẩm, dựa trên body info của user |
| GET | `/api/v1/recommendations/for-you` | Sản phẩm gợi ý cá nhân hoá |
| GET | `/api/v1/products/:id/similar` | Sản phẩm tương tự |

## Fallback Strategy
| Tình huống | Fallback |
|---|---|
| DSS service down | Trả về size phổ biến nhất (M) + top sản phẩm cùng category |
| DSS timeout (> 3s) | Trả về cached result hoặc rule-based suggestion |
| User chưa có body info | Hiện prompt yêu cầu nhập thông tin + gợi ý size chart |

## Liên kết với module khác
- **ML Services (DSS)**: gọi internal API để lấy prediction.
- **Account Data Storage**: lấy body measurements + preferences.
- **Product CRUD**: enrich recommendation results với product details.
- **Frontend Product Detail / Home**: hiển thị kết quả gợi ý.

## Scope Phase 1
- **KHÔNG** implement trong Phase 1.
- Chuẩn bị sẵn module structure và interface.

## Scope Phase 2
- Tích hợp size recommendation cơ bản.
- "Sản phẩm gợi ý cho bạn" trên Home / Product Detail.
- Fallback logic đầy đủ.

## Ghi chú kỹ thuật
- Sử dụng `httpx` hoặc `aiohttp` để gọi DSS service với timeout rõ ràng (3–5 giây).
- Cache kết quả recommendation (Redis, TTL 5–15 phút).
- Log mỗi lần gọi DSS (latency, status) để monitor performance.
