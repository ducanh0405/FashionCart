# Module: Login / Logout / Register (Auth UI)

## Mô tả
Module giao diện xác thực người dùng: đăng ký tài khoản mới, đăng nhập, đăng xuất. Quản lý trạng thái auth ở phía client (token storage, route protection).

## Thuộc về
`frontend/src/features/auth/`

## Các trang / components

### 1. Trang Đăng ký (`/register`)
**Giao diện:**
- Form nhập: Email, Mật khẩu, Xác nhận mật khẩu, Họ tên, Số điện thoại.
- Nút "Đăng ký".
- Link "Đã có tài khoản? Đăng nhập".

**Validation (client-side):**
| Field | Rule |
|---|---|
| Email | Đúng format, không rỗng |
| Mật khẩu | Tối thiểu 8 ký tự, có chữ hoa + số |
| Xác nhận mật khẩu | Khớp với mật khẩu |
| Họ tên | Không rỗng |
| SĐT | Đúng format VN (10 số, bắt đầu 0) |

**Luồng xử lý:**
```
1. User nhập thông tin → validate client-side
2. Gọi POST /api/v1/auth/register
3. Thành công → chuyển sang trang Login (hoặc tự động đăng nhập)
4. Thất bại → hiển thị lỗi (email đã tồn tại, etc.)
```

### 2. Trang Đăng nhập (`/login`)
**Giao diện:**
- Form nhập: Email, Mật khẩu.
- Checkbox "Ghi nhớ đăng nhập".
- Nút "Đăng nhập".
- Link "Chưa có tài khoản? Đăng ký".

**Luồng xử lý:**
```
1. User nhập email + mật khẩu
2. Gọi POST /api/v1/auth/login
3. Thành công → lưu JWT token (localStorage/cookie) → redirect về trang trước đó hoặc Home
4. Thất bại → hiển thị "Email hoặc mật khẩu không đúng"
```

### 3. Đăng xuất
- Nút Logout ở Navbar (chỉ hiện khi đã đăng nhập).
- Xoá token khỏi storage.
- Reset auth state.
- Redirect về trang Home.

## State Management
```typescript
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
```

## Route Protection
- Các trang yêu cầu đăng nhập (Cart, Checkout, Profile) → redirect về `/login` nếu chưa auth.
- Trang Login/Register → redirect về Home nếu đã đăng nhập.

## Components
| Component | Mô tả |
|---|---|
| `LoginForm` | Form đăng nhập với validation |
| `RegisterForm` | Form đăng ký với validation |
| `ProtectedRoute` | HOC/wrapper kiểm tra auth trước khi render trang |
| `AuthProvider` | Context provider quản lý auth state toàn app |

## Liên kết với backend
| Frontend Action | Backend API |
|---|---|
| Đăng ký | `POST /api/v1/auth/register` |
| Đăng nhập | `POST /api/v1/auth/login` |
| Refresh token | `POST /api/v1/auth/refresh` |
| Đăng xuất | `POST /api/v1/auth/logout` |
| Lấy user info | `GET /api/v1/users/me` |

## Scope Phase 1
- Đăng ký, đăng nhập, đăng xuất: đầy đủ.
- Route protection cơ bản.
- Token auto-refresh khi gần hết hạn.

## UI States
| State | Hiển thị |
|---|---|
| Loading | Spinner trên nút submit, disable form |
| Error | Thông báo lỗi dưới form (đỏ) |
| Success (register) | Thông báo "Đăng ký thành công" + redirect |
| Success (login) | Redirect về trang trước đó |
