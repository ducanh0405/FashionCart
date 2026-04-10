# Module: APIs (Backend REST API Layer)

## Mô tả
Module định nghĩa tất cả HTTP endpoints mà frontend sẽ gọi. Đóng vai trò là **cổng giao tiếp duy nhất** giữa frontend và backend, tuân thủ kiến trúc RESTful.

## Thuộc về
`backend/src/api/`

## Cấu trúc
```
api/
├── routes/          # Khai báo URL patterns + method
├── controllers/     # Nhận request, gọi service, trả response
├── middlewares/      # Auth, RBAC, validation, error handling, logging
├── serializers/      # Request/Response schema validation
└── docs/            # API documentation (Swagger/OpenAPI)
```

## Quy tắc thiết kế API

### URL Convention
| Resource | Method | Endpoint | Mô tả |
|---|---|---|---|
| Auth | POST | `/api/v1/auth/register` | Đăng ký |
| Auth | POST | `/api/v1/auth/login` | Đăng nhập |
| Auth | POST | `/api/v1/auth/refresh` | Refresh token |
| Auth | POST | `/api/v1/auth/logout` | Đăng xuất |
| Products | GET | `/api/v1/products` | Danh sách sản phẩm (có phân trang, filter) |
| Products | GET | `/api/v1/products/:id` | Chi tiết sản phẩm |
| Cart | GET | `/api/v1/cart` | Lấy giỏ hàng hiện tại |
| Cart | POST | `/api/v1/cart/items` | Thêm item vào giỏ |
| Cart | PATCH | `/api/v1/cart/items/:id` | Cập nhật số lượng |
| Cart | DELETE | `/api/v1/cart/items/:id` | Xoá item khỏi giỏ |
| Orders | POST | `/api/v1/orders` | Tạo đơn hàng từ giỏ |
| Orders | GET | `/api/v1/orders` | Lịch sử đơn hàng |
| Orders | GET | `/api/v1/orders/:id` | Chi tiết đơn hàng |
| Users | GET | `/api/v1/users/me` | Thông tin user hiện tại |
| Users | PATCH | `/api/v1/users/me` | Cập nhật profile |

### Response Format chuẩn
```json
{
  "success": true,
  "data": { ... },
  "message": "Thành công",
  "errors": null
}
```

### Error Response
```json
{
  "success": false,
  "data": null,
  "message": "Mô tả lỗi",
  "errors": [
    { "field": "email", "message": "Email đã tồn tại" }
  ]
}
```

### HTTP Status Codes
| Code | Sử dụng khi |
|---|---|
| 200 | Thành công |
| 201 | Tạo mới thành công |
| 400 | Dữ liệu đầu vào không hợp lệ |
| 401 | Chưa đăng nhập / token hết hạn |
| 403 | Không có quyền truy cập |
| 404 | Không tìm thấy resource |
| 500 | Lỗi server |

## Middleware Pipeline
```
Request → CORS → Rate Limiter → Auth (JWT) → RBAC → Validation → Controller → Response
```

## Liên kết với module khác
- **Tất cả module BE**: mỗi module expose endpoints qua API layer này.
- **Frontend**: gọi trực tiếp các endpoint này.
- **ML Services (Phase 2+)**: backend gọi internal API sang ML, **KHÔNG** để frontend gọi trực tiếp.

## Scope Phase 1
- Auth APIs (register, login, logout, refresh).
- Product list + detail APIs.
- Cart CRUD APIs.
- Order creation + history APIs.
- User profile API.

## Ghi chú kỹ thuật
- Tất cả API đều versioned (`/api/v1/`).
- Sử dụng pagination cho list endpoints (offset-based hoặc cursor-based).
- API docs tự động bằng Swagger/OpenAPI (Django REST Framework hoặc FastAPI tự có).
