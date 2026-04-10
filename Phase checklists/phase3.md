# Phase 3 – Tích hợp Virtual Try-On (VTON) mức demo

> **Trạng thái:** Chưa bắt đầu
> **Yêu cầu trước:** Phase 1 hoàn thành, Phase 2 nên hoàn thành (DSS đã chạy)
> **Thời gian ước tính:** 3–4 tuần

---

### Mục tiêu phase
- Tích hợp **Virtual Try-On** vào trang Product Detail: buyer có thể upload ảnh bản thân hoặc chọn ảnh mẫu → xem ảnh mình mặc sản phẩm đó.
- Demo được **2–3 case thành công đẹp** cho presentation.
- Hệ thống xử lý VTON **bất đồng bộ** (background job) vì inference nặng.
- Graceful degradation: nếu VTON service lỗi → e-commerce flow vẫn hoạt động, nút "Thử đồ" hiện thông báo phù hợp.

### Phạm vi Phase 3

**In scope**
- VTON cho **1–2 category** sản phẩm (ví dụ: áo thun, áo sơ mi).
- User upload ảnh **hoặc** chọn từ ảnh mẫu có sẵn.
- Hiển thị ảnh kết quả try-on trên Product Detail page.
- Async processing với loading/progress state.

**Out of scope**
- VTON cho tất cả category (quần, váy, phụ kiện — phức tạp hơn).
- Realtime VTON (video stream).
- VTON trên mobile camera.
- Multi-garment try-on (mặc nhiều đồ cùng lúc).

---

### Những gì team cần chốt trước khi bắt đầu

- [ ] **Chốt VTON model**
  - [ ] Dùng model nào? (IDM-VTON, TryOnDiffusion, HR-VITON, hoặc khác?)
  - [ ] Yêu cầu GPU: loại gì, VRAM bao nhiêu, chạy ở đâu (local/cloud)?
  - [ ] Inference time trung bình trên 1 ảnh?

- [ ] **Chốt input/output format**
  - [ ] Input: ảnh người (resolution tối thiểu, format, crop body hay full?), ảnh sản phẩm (flat-lay hay model?).
  - [ ] Output: ảnh kết quả try-on (resolution, format).
  - [ ] Có cần ảnh segmentation mask / pose estimation không?

- [ ] **Chốt UX flow**
  - [ ] User upload ảnh tự chụp hay chỉ chọn từ ảnh mẫu?
  - [ ] Có cần crop/adjust ảnh upload?
  - [ ] Hiển thị kết quả: modal, trang riêng, hay inline trên Product Detail?
  - [ ] Thời gian chờ chấp nhận được? (target: < 30 giây)

- [ ] **Chốt infrastructure**
  - [ ] VTON service chạy ở đâu? (local GPU machine, Google Colab, cloud GPU?)
  - [ ] Cần background job queue: Celery + Redis hay giải pháp khác?
  - [ ] Caching: lưu kết quả VTON để không chạy lại cùng input?

---

### Checklist triển khai chi tiết

#### 1. ML/VTON — Model Setup & Service
> **Người phụ trách:** ML team
> **Tham khảo:** `ml-services/ML/VTON.md`

- [ ] **Thiết lập VTON model**
  - [ ] Clone/setup model chạy được trên local (notebook hoặc script).
  - [ ] Test với sample data: 5 ảnh người + 5 ảnh áo → 25 kết quả.
  - [ ] Đánh giá chất lượng output: chọn 2–3 best cases cho demo.
  - [ ] Notebook: `ml-services/vton/notebooks/vton_experiment.ipynb`.

- [ ] **Chuẩn bị dữ liệu demo**
  - [ ] **Ảnh người mẫu** (3–5 ảnh): đa dạng body type, pose đứng thẳng, nền sạch.
  - [ ] **Ảnh sản phẩm** (5–10 ảnh): áo thun và áo sơ mi, nền trắng/flat-lay.
  - [ ] Lưu tại `ml-services/vton/data/demo/`.
  - [ ] Đảm bảo ảnh được xử lý (resize, crop) phù hợp model input.

- [ ] **Expose VTON API**
  - [ ] Tạo service wrapper: `ml-services/vton/service/`.
  - [ ] API endpoint:
    ```
    POST /api/vton/try-on
    Body (multipart/form): 
      - person_image: file (hoặc person_image_id nếu dùng ảnh mẫu)
      - garment_image_url: string (URL ảnh sản phẩm)
    Response: 
      { "job_id": "abc123", "status": "processing" }
    ```
  - [ ] API endpoint (polling kết quả):
    ```
    GET /api/vton/result/:job_id
    Response: 
      { "status": "completed", "result_image_url": "https://..." }
      hoặc
      { "status": "processing", "progress": 60 }
      hoặc
      { "status": "failed", "error": "..." }
    ```
  - [ ] Viết Dockerfile cho VTON service (cần CUDA nếu dùng GPU).

#### 2. Backend Integration
> **Người phụ trách:** Backend team
> **Tham khảo:** `backend/BE/recommendations.md` (pattern tương tự)

- [ ] **Tạo module VTON backend**
  - [ ] Tạo `backend/src/modules/vton/`.
  - [ ] Service layer: gọi VTON internal API.
  - [ ] Background job: submit request VTON → return job_id → poll cho kết quả.

- [ ] **Image upload & validation**
  - [ ] Endpoint upload ảnh user: `POST /api/v1/vton/upload`.
  - [ ] Validate:
    - [ ] File type: JPEG, PNG only.
    - [ ] File size: max 10MB.
    - [ ] Scan cho malware/invalid content (basic check).
  - [ ] Lưu ảnh upload vào cloud storage hoặc local `/media/vton/uploads/`.
  - [ ] Trả về `image_id` để dùng cho request try-on.

- [ ] **Expose API cho frontend**
  - [ ] `POST /api/v1/vton/try-on` — Submit request try-on.
    ```json
    {
      "person_image_id": "uploaded_img_123",
      "product_id": 42
    }
    ```
    Response: `{ "job_id": "job_456", "estimated_time_seconds": 25 }`
  - [ ] `GET /api/v1/vton/result/:job_id` — Poll kết quả.
  - [ ] `GET /api/v1/vton/sample-models` — Danh sách ảnh mẫu có sẵn.

- [ ] **Background job processing**
  - [ ] Setup Celery + Redis (nếu dùng Django).
  - [ ] Tạo VTON worker: nhận job → gọi ML service → lưu result → update status.
  - [ ] Timeout cho mỗi job: **60 giây max**.
  - [ ] Retry logic: 1 lần retry nếu thất bại, sau đó mark failed.

- [ ] **Caching kết quả**
  - [ ] Cache key: hash(person_image + product_id).
  - [ ] Nếu đã có kết quả → trả về ngay, không chạy lại inference.
  - [ ] TTL cache: 24 giờ hoặc vĩnh viễn (kết quả VTON ít thay đổi).

- [ ] **Logging**
  - [ ] Log mỗi job: job_id, user_id, product_id, start_time, end_time, status.
  - [ ] Log lỗi chi tiết khi inference fail.
  - [ ] Dashboard đơn giản: tổng số jobs, success rate, avg processing time.

#### 3. Frontend Integration
> **Người phụ trách:** Frontend team

- [ ] **Nút "Thử đồ ảo" trên Product Detail**
  - [ ] Vị trí: bên cạnh nút "Thêm vào giỏ hàng".
  - [ ] Chỉ hiện cho sản phẩm thuộc category hỗ trợ VTON.
  - [ ] Sản phẩm không hỗ trợ: ẩn nút hoặc hiện nút disabled "Sắp ra mắt".

- [ ] **Modal / Flow thử đồ**
  ```
  ┌──────────────────────────────────┐
  │  👗 Thử đồ ảo                    │
  ├──────────────────────────────────┤
  │                                  │
  │  Chọn ảnh của bạn:              │
  │  [📷 Upload ảnh]                │
  │  ─── hoặc ───                    │
  │  Chọn người mẫu:                │
  │  [img1] [img2] [img3]           │
  │                                  │
  │  Sản phẩm: Áo thun trắng       │
  │  [img sản phẩm]                 │
  │                                  │
  │  [✨ Bắt đầu thử đồ]            │
  ├──────────────────────────────────┤
  │  ⏳ Đang xử lý... (15/30 giây)  │
  │  [===████████░░░░░] 60%          │
  ├──────────────────────────────────┤
  │  ✅ Kết quả:                     │
  │  [ảnh before] → [ảnh after]     │
  │                                  │
  │  [Tải ảnh] [Thử sản phẩm khác] │
  │  [🛒 Thêm vào giỏ hàng]         │
  └──────────────────────────────────┘
  ```

- [ ] **Upload ảnh**
  - [ ] Hỗ trợ: JPEG, PNG, max 10MB.
  - [ ] Preview ảnh trước khi submit.
  - [ ] Crop tool cơ bản (nếu kịp, hoặc để Phase 4).

- [ ] **Loading / Processing state**
  - [ ] Progress bar hoặc timer countdown.
  - [ ] Polling kết quả mỗi 2–3 giây.
  - [ ] Thông báo: "Đang xử lý ảnh, vui lòng chờ khoảng 20–30 giây...".
  - [ ] User có thể đóng modal → quay lại xem kết quả sau (notification).

- [ ] **Kết quả VTON**
  - [ ] Hiển thị ảnh before (gốc) và after (try-on) cạnh nhau hoặc slider.
  - [ ] Nút download ảnh kết quả.
  - [ ] Nút "Thử sản phẩm khác" → chọn sản phẩm mới, giữ ảnh người.
  - [ ] CTA: "Thêm vào giỏ hàng" trực tiếp từ kết quả.

- [ ] **Error states**
  - [ ] VTON service down: "Tính năng thử đồ đang bảo trì, vui lòng thử lại sau".
  - [ ] Ảnh không hợp lệ: "Vui lòng upload ảnh rõ mặt, toàn thân, nền đơn giản".
  - [ ] Timeout: "Xử lý quá lâu, vui lòng thử lại" + nút retry.

#### 4. Quality Control & Testing

- [ ] **Test VTON quality**
  - [ ] Thử với 3 body types khác nhau (nhỏ, trung bình, lớn).
  - [ ] Thử với 3 loại áo khác nhau.
  - [ ] Đánh giá chất lượng: fit chính xác, màu sắc, tự nhiên.
  - [ ] Chọn ra 3 best cases cho demo.

- [ ] **Test async flow**
  - [ ] Submit → đợi → nhận kết quả: flow hoạt động đúng.
  - [ ] Submit → đóng modal → quay lại → kết quả vẫn có.
  - [ ] Submit 2 request cùng lúc → xử lý đúng.

- [ ] **Test fallback**
  - [ ] Tắt VTON service → nút "Thử đồ" hiện thông báo bảo trì.
  - [ ] Upload ảnh quá lớn → validation bắt đúng.
  - [ ] Upload file không phải ảnh → validation bắt đúng.

- [ ] **Performance test**
  - [ ] Đo processing time trung bình.
  - [ ] Kiểm tra cache: request lần 2 cho cùng input → trả về ngay.
  - [ ] Kiểm tra memory/CPU usage khi có nhiều request.

#### 5. Demo Preparation

- [ ] **Chuẩn bị kịch bản demo VTON**
  - [ ] Chọn 2 sản phẩm demo đẹp nhất (đã test output tốt).
  - [ ] Chọn 2 ảnh mẫu (người) cho best results.
  - [ ] Pre-cache kết quả cho kịch bản demo (tránh chờ lâu khi demo live).

- [ ] **Backup plan cho demo**
  - [ ] Nếu VTON service chậm → có ảnh kết quả pre-rendered sẵn.
  - [ ] Nếu VTON service lỗi → demo fallback graceful degradation.

- [ ] **Script demo VTON**
  ```
  1. Mở Product Detail của áo thun demo
  2. Click "Thử đồ ảo"
  3. Chọn ảnh mẫu số 1
  4. Click "Bắt đầu thử đồ" → chờ ~20 giây
  5. Xem kết quả before/after
  6. Thử lại với ảnh mẫu số 2
  7. Click "Thêm vào giỏ hàng" từ kết quả
  ```

---

### Điều kiện để được xem là hoàn thành Phase 3
- [ ] VTON hoạt động end-to-end cho ít nhất 1 category sản phẩm.
- [ ] Có ít nhất 2–3 case demo với output chất lượng chấp nhận được.
- [ ] Async processing hoạt động (user không bị block khi chờ).
- [ ] Fallback hoạt động khi VTON service down.
- [ ] Upload ảnh + validation hoạt động đúng.
- [ ] Demo script chạy mượt ≥ 3 lần liên tiếp.

---

### Tổng kết / Kết quả

- **ML/VTON**
  - Model sử dụng:
  - Avg processing time:
  - Quality assessment (1–10):
  - Số cases demo đẹp:

- **Backend**
  - VTON API endpoints hoạt động:
  - Background job setup:
  - Cache hit rate:

- **Frontend**
  - VTON UI flow:
  - UX feedback:
  - Mobile responsive:

- **Giới hạn hiện tại**
  - Categories hỗ trợ:
  - Processing time:
  - Chất lượng output:
  - Cải thiện cho tương lai:

---

### Tiếp theo → [Phase 4: Tối ưu demo & hoàn thiện trải nghiệm](phase4.md)
