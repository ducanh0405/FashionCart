# Module: Role-Based Access Control (RBAC)

## Mô tả
Module quản lý phân quyền người dùng theo vai trò (Role-Based Access Control). Đảm bảo mỗi user chỉ được truy cập đúng tài nguyên và hành động phù hợp với vai trò của mình trong hệ thống FashionCart.

## Thuộc về
`backend/src/modules/auth/`

## Vai trò trong hệ thống

| Role | Mô tả | Quyền chính |
|---|---|---|
| **Buyer** | Người mua hàng (user chính trong MVP) | Xem sản phẩm, quản lý giỏ hàng, đặt hàng, xem lịch sử đơn |
| **Shop** | Chủ cửa hàng / người bán | Quản lý sản phẩm của shop, xem đơn hàng đến, cập nhật trạng thái đơn |
| **Admin** | Quản trị viên hệ thống | Toàn quyền: quản lý user, shop, sản phẩm, hệ thống |

## Chức năng chính
1. **Gán vai trò cho user** khi đăng ký hoặc do admin chỉ định.
2. **Middleware kiểm tra quyền**: chặn request nếu user không có vai trò phù hợp.
3. **Permission checks** ở tầng service: kiểm tra quyền cụ thể trước khi thực hiện hành động (vd: chỉ shop owner mới được sửa sản phẩm của mình).
4. **Bảo vệ API endpoints**: mỗi route xác định rõ role nào được truy cập.

## Luồng hoạt động
```
Request → Auth Middleware (xác thực JWT) → RBAC Middleware (kiểm tra role) → Controller → Service
```

## Liên kết với module khác
- **Account Data Storage**: lưu trữ `role` field trong bảng User.
- **APIs**: mỗi endpoint khai báo `required_roles`.
- **Tất cả module khác**: đều cần gọi qua RBAC trước khi thực hiện nghiệp vụ.

## Scope Phase 1
- MVP chỉ cần **Buyer** role đầy đủ.
- **Shop** và **Admin** chuẩn bị sẵn ở tầng data, chưa cần giao diện.

## Ghi chú kỹ thuật
- Sử dụng decorator/middleware pattern để tái sử dụng logic kiểm tra quyền.
- Không hardcode quyền trong từng view — tập trung vào permission constants hoặc enum.
