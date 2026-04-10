# Phase 2 – Tích hợp Recommendation (DSS) cơ bản

> **Trạng thái:** Chưa bắt đầu
> **Yêu cầu trước:** Phase 1 hoàn thành (MVP e-commerce chạy ổn định)
> **Thời gian ước tính:** 2–3 tuần

---

### Mục tiêu phase
- Tích hợp **Size Recommendation** vào trang Product Detail: gợi ý size phù hợp dựa trên thông tin cơ thể buyer.
- Thêm section **"Gợi ý cho bạn"** trên trang Home / Product Detail: sản phẩm tương tự hoặc phù hợp sở thích.
- Đảm bảo hệ thống **graceful degradation**: nếu ML service lỗi/chậm, e-commerce flow vẫn hoạt động bình thường.
- Demo được: nhập body measurements → xem gợi ý size → có sản phẩm được suggest hợp lý.

### Phạm vi Phase 2

**In scope**
- Size recommendation dựa trên chiều cao/cân nặng/số đo cơ bản.
- Gợi ý sản phẩm tương tự (cùng category, cùng shop, cùng price range).
- UI nhập body measurements trong Profile Settings.
- Fallback khi DSS service không hoạt động.

**Out of scope**
- Personalized feed dựa trên browsing history (phức tạp, để sau).
- A/B testing recommendation quality.
- Rating/feedback cho recommendation.

---

### Những gì team cần chốt trước khi bắt đầu

- [ ] **Chốt use case recommendation cụ thể**
  - [ ] Size recommendation: input gì? output gì? Hiển thị ở đâu?
  - [ ] Product recommendation: logic gì? (content-based? collaborative? rule-based đơn giản?).
  - [ ] Có cần hiển thị "vì sao gợi ý size này" (explainability) hay chỉ kết quả?

- [ ] **Chốt data strategy**
  - [ ] Dataset size/style sẽ dùng loại gì? Có sẵn hay phải tạo?
  - [ ] Body measurements nào là bắt buộc vs optional?
  - [ ] Size chart chuẩn dùng cho hệ thống (S/M/L/XL hay số cm)?

- [ ] **Chốt architecture ML ↔ Backend**
  - [ ] DSS service expose API dạng nào? (REST endpoint cụ thể)
  - [ ] Response time chấp nhận được bao lâu? (target < 2 giây)
  - [ ] Caching strategy: cache kết quả bao lâu?

---

### Checklist triển khai chi tiết

#### 1. ML/DSS — Data & Model Preparation
> **Người phụ trách:** ML team
> **Tham khảo:** `ml-services/ML/DSS.md`

- [ ] **Thu thập / tạo dataset**
  - [ ] Dataset size chart từ các brand phổ biến (Uniqlo, Zara, H&M, local brands).
  - [ ] Mapping: (chiều cao, cân nặng, vòng ngực/eo/hông) → size phù hợp.
  - [ ] Ít nhất 200–500 data points cho MVP.
  - [ ] Lưu dataset tại `ml-services/dss/data/`.

- [ ] **Xây dựng model/pipeline**
  - [ ] Approach 1 (đơn giản): Rule-based system dựa trên size chart + body measurements.
  - [ ] Approach 2 (ML): Simple classifier (Random Forest / XGBoost) trên dataset.
  - [ ] Notebook thử nghiệm: `ml-services/dss/notebooks/size_recommendation.ipynb`.
  - [ ] Evaluate model: accuracy trên test set, kiểm tra edge cases.

- [ ] **Expose API service**
  - [ ] Tạo service wrapper tại `ml-services/dss/service/`.
  - [ ] API endpoint:
    ```
    POST /api/recommend/size
    Body: { "height_cm": 170, "weight_kg": 65, "product_id": 42 }
    Response: { "recommended_size": "M", "confidence": 0.85, "size_chart": {...} }
    ```
  - [ ] API endpoint:
    ```
    GET /api/recommend/similar?product_id=42&limit=8
    Response: { "products": [{ "id": 15, "score": 0.92 }, ...] }
    ```
  - [ ] Chạy được dưới dạng standalone service (Flask/FastAPI).
  - [ ] Viết Dockerfile cho DSS service.

#### 2. Backend Integration
> **Người phụ trách:** Backend team
> **Tham khảo:** `backend/BE/recommendations.md`

- [ ] **Tạo module recommendations**
  - [ ] Tạo `backend/src/modules/recommendations/`.
  - [ ] Service layer gọi DSS internal API (dùng `httpx` hoặc `requests`).
  - [ ] Set timeout: **3 giây** cho mỗi request đến DSS.

- [ ] **Implement fallback logic**
  - [ ] DSS service down → trả về size phổ biến nhất (M) + thông báo "Gợi ý size tạm thời".
  - [ ] DSS timeout → trả về cached result nếu có, hoặc fallback rule-based.
  - [ ] User chưa nhập body measurements → hiện bảng size chart tĩnh + prompt nhập thông tin.

- [ ] **Expose API cho frontend**
  - [ ] `GET /api/v1/products/:id/size-recommendation` — gợi ý size.
  - [ ] `GET /api/v1/products/:id/similar` — sản phẩm tương tự.
  - [ ] `GET /api/v1/recommendations/for-you` — sản phẩm gợi ý cá nhân hoá.

- [ ] **Caching**
  - [ ] Cache kết quả size recommendation theo (user_measurements_hash + product_id).
  - [ ] Cache sản phẩm tương tự theo product_id (TTL: 15 phút).
  - [ ] Dùng Redis hoặc in-memory cache đơn giản.

- [ ] **Logging & monitoring**
  - [ ] Log mỗi lần gọi DSS: request_time, response_time, status, fallback_used.
  - [ ] Theo dõi tỉ lệ fallback vs successful DSS calls.

#### 3. Backend — User Measurements API
> **Người phụ trách:** Backend team

- [ ] **Mở rộng User model/schema**
  - [ ] Thêm fields body measurements vào bảng users (nếu chưa có):
    - `height_cm` (INT, nullable)
    - `weight_kg` (INT, nullable)
    - `chest_cm`, `waist_cm`, `hip_cm` (INT, nullable)
    - `usual_size` (VARCHAR, nullable)
  - [ ] Migration script cho SQL Server.

- [ ] **API endpoints**
  - [ ] `GET /api/v1/users/me` — include body measurements trong response.
  - [ ] `PATCH /api/v1/users/me` — cho phép cập nhật measurements.

#### 4. Frontend Integration
> **Người phụ trách:** Frontend team

- [ ] **UI nhập Body Measurements** (trang Profile → Settings)
  - [ ] Form nhập: chiều cao, cân nặng, vòng ngực/eo/hông (optional), size thường mặc.
  - [ ] Validation: height 100–220cm, weight 30–200kg.
  - [ ] Gọi `PATCH /api/v1/users/me` để lưu.
  - [ ] Thông báo privacy: "Thông tin này chỉ dùng để gợi ý size phù hợp".

- [ ] **Hiển thị Size Recommendation trên Product Detail**
  - [ ] Section "Gợi ý size cho bạn" dưới variant selector.
  - [ ] Hiển thị: recommended size (highlight), confidence badge, giải thích ngắn.
  - [ ] Nếu user chưa nhập measurements: hiện CTA "Nhập thông tin cơ thể để nhận gợi ý size".
  - [ ] Loading state: skeleton khi đang gọi API.
  - [ ] Error/fallback state: "Không thể gợi ý size, vui lòng tham khảo bảng size".

- [ ] **Section "Sản phẩm tương tự" trên Product Detail**
  - [ ] Grid 4 cards dưới mô tả sản phẩm.
  - [ ] Gọi `GET /api/v1/products/:id/similar`.
  - [ ] Fallback: hiện sản phẩm cùng category nếu API lỗi.

- [ ] **Section "Gợi ý cho bạn" trên Home** (nếu kịp)
  - [ ] Row sản phẩm gợi ý trên trang Home.
  - [ ] Gọi `GET /api/v1/recommendations/for-you`.
  - [ ] Fallback: hiện sản phẩm bán chạy.

#### 5. Quality Control & Testing

- [ ] **Test size recommendation**
  - [ ] Chuẩn bị 5 user profiles với body measurements khác nhau.
  - [ ] Kiểm tra kết quả gợi ý có hợp lý cho mỗi profile.
  - [ ] Test edge cases: người rất cao/thấp, cân nặng cực đoan.

- [ ] **Test fallback scenarios**
  - [ ] Tắt DSS service → kiểm tra fallback hoạt động.
  - [ ] Delay DSS response > 3 giây → kiểm tra timeout handling.
  - [ ] User chưa nhập measurements → kiểm tra UI prompt.

- [ ] **Test product recommendations**
  - [ ] Sản phẩm gợi ý có cùng category / price range hợp lý không?
  - [ ] Không gợi ý sản phẩm đã hết hàng.
  - [ ] Grid hiển thị đúng, responsive, có lazy loading.

- [ ] **Integration test E2E**
  - [ ] Full flow: Nhập measurements → Xem product → Thấy gợi ý size → Gợi ý hợp lý.
  - [ ] Full flow: Xem product → Thấy sản phẩm tương tự → Click vào → Đúng category.

#### 6. Demo Preparation

- [ ] Chuẩn bị **3 tài khoản test** với body measurements khác nhau (nhỏ/trung bình/lớn).
- [ ] Chuẩn bị **5 sản phẩm demo** có đầy đủ size variants.
- [ ] Script demo: đăng nhập → vào product detail → thấy gợi ý size → thay đổi user → gợi ý size thay đổi.
- [ ] Test offline flow: tắt DSS → demo fallback hoạt động mượt.

---

### Điều kiện để được xem là hoàn thành Phase 2
- [ ] Size recommendation hiển thị đúng trên Product Detail cho user đã nhập measurements.
- [ ] Sản phẩm tương tự / gợi ý hiển thị hợp lý.
- [ ] Fallback hoạt động khi DSS service down — e-commerce flow không bị ảnh hưởng.
- [ ] UI nhập measurements trong Profile Settings hoạt động ổn.
- [ ] Không có bug blocker trong luồng demo.

---

### Tổng kết / Kết quả

- **ML/DSS**
  - Dataset sử dụng:
  - Model/approach đã chọn:
  - Metrics accuracy:
  - DSS service endpoint:

- **Backend**
  - Recommendation API endpoints hoạt động:
  - Fallback logic đã implement:
  - Cache strategy:

- **Frontend**
  - Các màn hình đã tích hợp recommendation:
  - UX feedback:

- **Bài học cho Phase 3**
  - Performance bottlenecks:
  - Những điểm cần cải thiện:

---

### Tiếp theo → [Phase 3: Tích hợp Virtual Try-On (VTON)](phase3.md)
