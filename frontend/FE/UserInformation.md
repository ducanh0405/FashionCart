# Module: User Information (Profile)

## Mô tả
Module giao diện quản lý thông tin cá nhân của buyer: xem/sửa profile, quản lý địa chỉ giao hàng, xem lịch sử đơn hàng, và quản lý preferences (chuẩn bị cho DSS Phase 2).

## Thuộc về
`frontend/src/features/profile/` & `frontend/src/pages/Profile.tsx`

## Route
`/profile` (yêu cầu đăng nhập)

## Layout dự kiến
```
┌──────────────────────────────────────────┐
│  👤 Tài khoản của tôi                    │
├────────────┬─────────────────────────────┤
│            │                             │
│  Sidebar   │  Content Area               │
│            │                             │
│  📝 Hồ sơ │  (hiển thị theo tab active) │
│  📍 Địa chỉ│                            │
│  📦 Đơn hàng│                            │
│  ⚙️ Cài đặt│                            │
│            │                             │
└────────────┴─────────────────────────────┘
```

## Các tab

### Tab 1: Hồ sơ cá nhân (`/profile`)
| Field | Mô tả | Editable |
|---|---|---|
| Avatar | Ảnh đại diện (upload) | ✅ |
| Họ tên | Tên hiển thị | ✅ |
| Email | Email tài khoản | ❌ (readonly) |
| SĐT | Số điện thoại | ✅ |
| Ngày sinh | Date picker | ✅ |
| Giới tính | Dropdown | ✅ |

### Tab 2: Địa chỉ giao hàng (`/profile/addresses`)
- Danh sách địa chỉ đã lưu.
- Nút "Thêm địa chỉ mới".
- Đánh dấu địa chỉ mặc định (⭐).
- Sửa / Xoá từng địa chỉ.

### Tab 3: Đơn hàng (`/profile/orders`)
```
┌────────────────────────────────────────┐
│  Tabs: [Tất cả] [Chờ xác nhận]        │
│        [Đang giao] [Đã giao] [Đã huỷ] │
├────────────────────────────────────────┤
│  ┌──────────────────────────────────┐  │
│  │ Đơn FC-20260408-001             │  │
│  │ 2 sản phẩm | 850,000₫          │  │
│  │ Trạng thái: Đang giao 🚚       │  │
│  │ [Xem chi tiết]                  │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │ Đơn FC-20260405-003             │  │
│  │ 1 sản phẩm | 299,000₫          │  │
│  │ Trạng thái: Đã giao ✅          │  │
│  │ [Xem chi tiết]                  │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
```

### Tab 4: Cài đặt (`/profile/settings`)
- Đổi mật khẩu.
- Body measurements (chiều cao, cân nặng — chuẩn bị cho Phase 2).
- Notification preferences (tương lai).

## Components
| Component | Mô tả |
|---|---|
| `ProfileForm` | Form sửa thông tin cá nhân |
| `AvatarUpload` | Upload + crop ảnh đại diện |
| `AddressList` | Danh sách địa chỉ + CRUD actions |
| `AddressForm` | Modal form thêm/sửa địa chỉ |
| `OrderList` | Danh sách đơn hàng có filter theo status |
| `OrderCard` | Card tóm tắt 1 đơn hàng |
| `OrderDetail` | Modal/trang chi tiết đơn hàng |
| `ChangePasswordForm` | Form đổi mật khẩu |

## Liên kết với backend
| Frontend Action | Backend API |
|---|---|
| Load profile | `GET /api/v1/users/me` |
| Update profile | `PATCH /api/v1/users/me` |
| Upload avatar | `POST /api/v1/users/me/avatar` |
| Load addresses | `GET /api/v1/users/me/addresses` |
| CRUD address | `POST/PATCH/DELETE /api/v1/users/me/addresses/:id` |
| Load orders | `GET /api/v1/orders?status=pending&page=1` |
| Order detail | `GET /api/v1/orders/:id` |
| Change password | `POST /api/v1/auth/change-password` |

## Scope Phase 1
- Xem/sửa profile cơ bản (tên, SĐT, ngày sinh).
- Xem danh sách đơn hàng + chi tiết.
- Quản lý địa chỉ cơ bản.
- Đổi mật khẩu.
- Avatar: placeholder hoặc default icon (upload có thể để Phase 2).

## UI States
| State | Hiển thị |
|---|---|
| Loading | Skeleton content area |
| Edit mode | Form inputs enabled, nút "Lưu" + "Huỷ" |
| Saving | Spinner trên nút "Lưu" |
| Success | Toast "Cập nhật thành công" |
| No orders | Illustration "Chưa có đơn hàng" + CTA "Mua sắm ngay" |
