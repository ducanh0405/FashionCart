# Module: Shipping Address Forms

## Mô tả
Module giao diện quản lý địa chỉ giao hàng: form nhập/sửa địa chỉ, dropdown chọn tỉnh/quận/phường, và lưu địa chỉ cho lần mua sau. Được sử dụng ở cả trang Checkout và trang Profile.

## Thuộc về
`frontend/src/features/checkout/` & `frontend/src/features/profile/`

## Component chính: `AddressForm`

### Layout
```
┌──────────────────────────────────────┐
│  📍 Địa chỉ giao hàng               │
├──────────────────────────────────────┤
│  Họ tên người nhận:                  │
│  [_________________________________]│
│                                      │
│  Số điện thoại:                      │
│  [_________________________________]│
│                                      │
│  Tỉnh / Thành phố:                  │
│  [Chọn tỉnh/thành ▾               ]│
│                                      │
│  Quận / Huyện:                       │
│  [Chọn quận/huyện ▾               ]│
│                                      │
│  Phường / Xã:                        │
│  [Chọn phường/xã ▾                ]│
│                                      │
│  Địa chỉ chi tiết:                  │
│  [Số nhà, tên đường...            ]│
│                                      │
│  ☐ Đặt làm địa chỉ mặc định        │
│                                      │
│  [Huỷ]              [Lưu địa chỉ]  │
└──────────────────────────────────────┘
```

## Tỉnh / Quận / Phường (Cascading Dropdown)
- **Tỉnh/Thành phố**: load danh sách 63 tỉnh thành.
- **Quận/Huyện**: load theo tỉnh đã chọn.
- **Phường/Xã**: load theo quận đã chọn.

> **Data source**: sử dụng API công khai hoặc static JSON file cho danh sách đơn vị hành chính VN.
> Ví dụ: `https://provinces.open-api.vn/api/`

## Validation

| Field | Rule | Error message |
|---|---|---|
| Họ tên | Không rỗng, 2-100 ký tự | "Vui lòng nhập tên người nhận" |
| SĐT | 10 số, bắt đầu 0 | "Số điện thoại không hợp lệ" |
| Tỉnh/TP | Phải chọn | "Vui lòng chọn tỉnh/thành phố" |
| Quận/Huyện | Phải chọn | "Vui lòng chọn quận/huyện" |
| Phường/Xã | Phải chọn | "Vui lòng chọn phường/xã" |
| Địa chỉ chi tiết | Không rỗng, ≥ 5 ký tự | "Vui lòng nhập địa chỉ chi tiết" |

## Sử dụng trong các context

### 1. Checkout
- Inline trong checkout flow.
- Có option chọn từ địa chỉ đã lưu (nếu có).
- Pre-fill với địa chỉ mặc định.

### 2. Profile → Quản lý địa chỉ
- Mở dạng modal khi "Thêm địa chỉ mới" hoặc "Sửa".
- CRUD operations: tạo, sửa, xoá, đặt mặc định.

## Components
| Component | Mô tả |
|---|---|
| `AddressForm` | Form nhập/sửa địa chỉ (reusable) |
| `AddressSelector` | Dropdown chọn từ danh sách đã lưu |
| `ProvinceSelector` | Cascading dropdown tỉnh → quận → phường |
| `AddressCard` | Hiển thị 1 địa chỉ đã lưu (tên, SĐT, địa chỉ, badge mặc định) |

## Liên kết với backend
| Frontend Action | Backend API |
|---|---|
| Load danh sách địa chỉ | `GET /api/v1/users/me/addresses` |
| Thêm địa chỉ | `POST /api/v1/users/me/addresses` |
| Sửa địa chỉ | `PATCH /api/v1/users/me/addresses/:id` |
| Xoá địa chỉ | `DELETE /api/v1/users/me/addresses/:id` |
| Đặt mặc định | `PATCH /api/v1/users/me/addresses/:id` (`is_default: true`) |

## Scope Phase 1
- Form nhập địa chỉ trong checkout (nhập trực tiếp).
- Cascading dropdown tỉnh/quận/phường (có thể dùng static data).
- Chưa cần saved addresses — nhập mới mỗi lần checkout.
- Saved addresses chuẩn bị backend, UI có thể làm sau Phase 1.

## Ghi chú kỹ thuật
- Component `AddressForm` phải reusable — dùng được ở cả Checkout và Profile.
- Validate cả client-side (UX) và server-side (security).
- Dữ liệu tỉnh/quận/phường nên cache ở client (không thay đổi thường xuyên).
