# Module: Account Data Storage (Users)

## Mô tả
Module quản lý toàn bộ dữ liệu tài khoản người dùng: thông tin cá nhân, thông tin đăng nhập, preferences, và địa chỉ giao hàng. Là nền tảng dữ liệu cho auth, profile, checkout, và DSS recommendation.

## Thuộc về
`backend/src/modules/users/`

## Chức năng chính
1. **CRUD tài khoản**: tạo, đọc, cập nhật, xoá (soft delete) user.
2. **Lưu trữ thông tin cá nhân**: họ tên, email, số điện thoại, ngày sinh, giới tính.
3. **Quản lý địa chỉ giao hàng**: mỗi user có thể có nhiều địa chỉ, đánh dấu địa chỉ mặc định.
4. **Body measurements** (chuẩn bị cho Phase 2 - DSS): chiều cao, cân nặng, số đo cơ thể.
5. **Preferences**: style ưa thích, size thường mặc (phục vụ recommendation sau này).

## Database Schema (dự kiến)

### Bảng `users`
| Column | Type | Mô tả |
|---|---|---|
| `id` | UUID / BIGINT | Primary key |
| `email` | VARCHAR(255) | Unique, dùng để đăng nhập |
| `password_hash` | VARCHAR(255) | Mật khẩu đã hash |
| `full_name` | NVARCHAR(100) | Họ tên hiển thị |
| `phone` | VARCHAR(20) | Số điện thoại |
| `gender` | VARCHAR(10) | Giới tính |
| `date_of_birth` | DATE | Ngày sinh |
| `avatar_url` | VARCHAR(500) | Link ảnh đại diện |
| `role` | VARCHAR(20) | `buyer` / `shop` / `admin` |
| `is_active` | BOOLEAN | Trạng thái tài khoản |
| `created_at` | DATETIME | Ngày tạo |
| `updated_at` | DATETIME | Ngày cập nhật |

### Bảng `user_addresses`
| Column | Type | Mô tả |
|---|---|---|
| `id` | BIGINT | Primary key |
| `user_id` | FK → users | Liên kết user |
| `label` | NVARCHAR(50) | "Nhà", "Công ty", ... |
| `full_name` | NVARCHAR(100) | Tên người nhận |
| `phone` | VARCHAR(20) | SĐT người nhận |
| `address_line` | NVARCHAR(255) | Địa chỉ chi tiết |
| `ward` | NVARCHAR(100) | Phường/Xã |
| `district` | NVARCHAR(100) | Quận/Huyện |
| `city` | NVARCHAR(100) | Tỉnh/Thành phố |
| `is_default` | BOOLEAN | Địa chỉ mặc định |

## Liên kết với module khác
- **RBAC**: field `role` xác định vai trò user.
- **Cart / Orders**: user_id là FK cho giỏ hàng và đơn hàng.
- **Recommendations (Phase 2)**: body measurements + preferences → input cho DSS.
- **VTON (Phase 3)**: avatar/ảnh user → input cho Virtual Try-On.

## Scope Phase 1
- Đầy đủ CRUD cho buyer account.
- Quản lý địa chỉ giao hàng cơ bản.
- Body measurements/preferences: tạo sẵn cột trong DB, chưa cần UI.

## Ghi chú kỹ thuật
- Password **PHẢI** được hash (bcrypt/argon2), **KHÔNG BAO GIỜ** lưu plaintext.
- Email phải validate format và kiểm tra unique trước khi tạo.
- Sử dụng soft delete (`is_active = false`) thay vì xoá thật.
