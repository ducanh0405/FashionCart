# Module: Preference Settings

## Mô tả
Module giao diện cài đặt preferences của buyer: body measurements cho size recommendation, style preferences, và đổi mật khẩu. Phục vụ DSS (Phase 2) nhưng UI chuẩn bị sẵn.

## Thuộc về
`frontend/src/features/profile/`

## Route
`/profile/settings`

## Sections

### 1. Body Measurements (cho Phase 2 - DSS)
- Chiều cao (cm), Cân nặng (kg)
- Vòng ngực, eo, hông (optional)
- Size thường mặc (dropdown)

### 2. Style Preferences (cho Phase 2)
- Tags chọn style: Casual, Streetwear, Minimalist, Korean, Vintage...
- Màu sắc ưa thích
- Ngân sách thường mua

### 3. Đổi mật khẩu
- Mật khẩu cũ + mới + xác nhận

## Liên kết với backend
| Action | API |
|---|---|
| Load preferences | `GET /api/v1/users/me` |
| Save measurements | `PATCH /api/v1/users/me` |
| Đổi mật khẩu | `POST /api/v1/auth/change-password` |

## Scope Phase 1
- Đổi mật khẩu: implement đầy đủ.
- Body measurements / style: tạo sẵn UI, chưa dùng cho recommendation.

## Ghi chú
- Measurements là sensitive data → nhấn mạnh privacy.
- Tất cả measurements optional.
