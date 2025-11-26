import { FeatureItem, Speaker, BundlePricing } from './types';

export const PROGRAM_NAME = "AI Vibe Coding & Automation";

// Mốc thời gian đếm ngược (Format ISO 8601) - 19:30 ngày 29/11/2025 theo giờ Việt Nam
export const COUNTDOWN_TARGET = "2025-11-29T19:30:00+07:00";

// Link tham gia nhóm Zalo sau khi thanh toán thành công
export const ZALO_GROUP_URL = "https://zalo.me/g/ujsagp464";

// URL Web App Google Apps Script của bạn
export const GOOGLE_SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxzwhl9XDXW5NqYYeDuYmyG_cMomnK_GgpwVmMDoSlV0N22sJFpZwko_cBdQaeeTjWM/exec"; 

export const BANK_INFO = {
  bankId: "TCB", // Techcombank
  accountNo: "19036653277011",
  accountName: "NGUYEN PHUOC VINH HUNG",
  template: "compact2" // Giao diện QR
};

export const FEATURES: FeatureItem[] = [
  {
    text: "Module 1: Tài khoản Google AI PRO chính chủ, 6 tháng",
    highlight: "(Veo 3 + NotebookLM Plus + Gemini PRO..)",
    value: "1.500.000đ"
  },
  {
    text: "Module 2: Kỹ Thuật Prompt Nâng Cao",
    highlight: "Dành riêng Nano Banana Pro và Gemini 3.0 Pro",
    value: "1.200.000đ"
  },
  {
    text: "Module 3: Chatbot AI Vibe Coding",
    highlight: "Xây dựng chatbot hỗ trợ lập trình viên",
    value: "1.800.000đ"
  },
  {
    text: "Module 4: Chatbot chuyên sâu",
    highlight: "Tối ưu riêng cho Nano Banana Pro",
    value: "1.800.000đ"
  },
  {
    text: "Module 5: Landing Page AI Automation",
    highlight: "Tự động hóa tạo trang đích chuyển đổi cao",
    value: "2.000.000đ"
  },
  {
    text: "Module 6: Tự Vibe Code Hệ thống",
    highlight: "Email AI Automation",
    value: "1.200.000đ"
  },
  {
    text: "Module 7: App AI Thực Tế",
    highlight: "Định hướng ứng dụng AI Vibe Code cho công việc hàng ngày",
    value: "1.200.000đ"
  },
  {
    text: "Module 8: Học LIVE trực tuyến cùng chuyên gia",
    highlight: "19h30 - 22h30, 01/12/2025",
    value: "2.500.000đ"
  }
];

export const SPEAKER_INFO: Speaker = {
  name: "Mr Nguyễn Phước Vĩnh Hưng",
  role: "COO/Co-founder Mochimin (AI thành lập tại Singapore)",
  imageUrl: "https://i.imgur.com/HIDog7f.jpeg",
  achievements: [
    "Kinh nghiệm Kinh Doanh Online từ 2016",
    "500.000++ followers trên TikTok về AI, Kinh Doanh & Marketing",
    "Quản Trị Viên Group AI (200.000++ thành viên)",
    "Triển khai Marketing cho nhiều công ty với các ngành hàng khác nhau",
    "Từng đào tạo Inhouse cho Trung Sơn Pharma, Hệ Thống Nhà Thuốc Big Family, Sàn thương mại điện tử tư vấn Droppii, Phương Trường An Group..."
  ]
};

export const PRICING: BundlePricing = {
  // Tổng giá trị thực tế của 8 module
  originalPrice: 13200000, 
  // Số tiền giảm để còn lại 379k (13.200.000 - 379.000 = 12.821.000)
  discountAmount: 12821000,
  finalPrice: 379000
};

export const TARGET_AUDIENCE = [
  "Những ai bán hàng online, làm internet marketing, affiliate, dropship...",
  "Người muốn làm content để xây kênh thu hút khách hàng tiềm năng.",
  "Trainer, Diễn giả, Coach muốn ứng dụng A.I để tối ưu công việc của mình.",
  "Và bất cứ ai không muốn \"phớt lờ\" làn sóng A.I này để bắt kịp sự phát triển 4.0."
];