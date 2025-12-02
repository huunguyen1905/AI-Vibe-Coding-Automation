import React, { useState } from 'react';
import { PRICING, PROGRAM_NAME, GOOGLE_SHEET_WEBAPP_URL } from '../constants';
import { Lock, Check, User, Phone, Mail, Loader2, PlayCircle } from 'lucide-react';

interface OrderFormProps {
  onSuccess: (orderId: string, customerName: string) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Logic tạo mã đơn hàng: AI + 4 số (Ngẫu nhiên tăng dần)
  const generateOrderId = () => {
    const storageKey = 'ai_vibe_last_seq';
    
    let currentSeq;
    const storedSeq = localStorage.getItem(storageKey);
    
    if (storedSeq) {
      // Nếu khách cũ (đã có trong localStorage), lấy số tiếp theo của họ
      currentSeq = parseInt(storedSeq, 10);
    } else {
      // Nếu là khách mới tinh: Random một số từ 1000 đến 8999
      // Điều này tạo ra "4 số bất kỳ" như bạn yêu cầu cho lần đầu tiên
      currentSeq = Math.floor(Math.random() * (8999 - 1000 + 1) + 1000);
    }
    
    // "Thứ tự tăng dần" cho các lần sau
    const nextSeq = currentSeq + 1;
    
    // Lưu lại trạng thái mới nhất
    localStorage.setItem(storageKey, nextSeq.toString());
    
    return `AI${nextSeq}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newOrderId = generateOrderId();

    // Sử dụng URLSearchParams thay vì FormData để Google Apps Script nhận diện chính xác
    const params = new URLSearchParams();
    params.append('orderId', newOrderId);
    params.append('name', formData.name);
    params.append('phone', formData.phone);
    params.append('email', formData.email);
    params.append('amount', PRICING.finalPrice.toString());
    params.append('status', 'PENDING');
    params.append('timestamp', new Date().toISOString());

    try {
      if (GOOGLE_SHEET_WEBAPP_URL) {
          await fetch(GOOGLE_SHEET_WEBAPP_URL, {
            method: 'POST',
            body: params,
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
      }
      
      // Gọi callback onSuccess để App mở modal
      onSuccess(newOrderId, formData.name || "Khách hàng");
      
    } catch (error) {
      console.error("Lỗi khi gửi đơn:", error);
      // Vẫn mở modal để khách thanh toán
      onSuccess(newOrderId, formData.name || "Khách hàng");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Form Header */}
      <div className="bg-gradient-to-b from-gray-50 to-white p-6 border-b border-gray-100 text-center relative overflow-hidden">
        <div className="flex justify-center items-center gap-4 text-sm font-medium text-gray-500 relative z-10">
          <span className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-full"><Check className="w-3 h-3" /> Đăng Ký</span>
          <div className="w-8 h-px bg-gray-300"></div>
          <span className="flex items-center gap-1 text-gray-600">Nhận Record</span>
        </div>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-50 rounded-full blur-2xl opacity-50"></div>
      </div>

      <div className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Inputs */}
          <div className="space-y-4">
            <div className="relative group">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Tên của bạn *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-500 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nhập họ và tên..."
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none"
                />
              </div>
            </div>
            
            <div className="relative group">
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Số điện thoại (Zalo) *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-500 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="0912..."
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none"
                />
              </div>
            </div>

            <div className="relative group">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Email nhận Record *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-500 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@gmail.com"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none"
                />
              </div>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-gray-50 rounded-xl p-5 space-y-3 text-sm border border-gray-100">
            <div className="flex justify-between text-gray-500">
              <span>{PROGRAM_NAME} x 1</span>
              <span className="line-through">{formatCurrency(PRICING.originalPrice)}</span>
            </div>
            <div className="flex justify-between items-center text-red-500 font-medium">
              <span>Mã giảm giá: RECORD-SALE</span>
              <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs border border-red-200">-{formatCurrency(PRICING.discountAmount)}</span>
            </div>
            <div className="border-t border-gray-200 dashed pt-3 flex justify-between items-center font-bold text-lg text-gray-900">
              <span>Tổng thanh toán</span>
              <span className="text-green-600 text-3xl">{formatCurrency(PRICING.finalPrice)}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="border rounded-xl p-4 border-green-200 bg-green-50/50 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-16 h-16 bg-green-100 rounded-bl-full opacity-50 pointer-events-none"></div>
            <label className="flex items-start gap-3 cursor-pointer relative z-10">
              <div className="mt-1">
                 <input type="radio" name="payment" defaultChecked className="w-5 h-5 text-green-600 focus:ring-green-500 border-gray-300" />
              </div>
              <div>
                <span className="block font-bold text-gray-800">Chuyển khoản ngân hàng</span>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Link Record và Tài khoản AI sẽ được gửi tự động qua Email/Zalo sau khi thanh toán thành công.
                </p>
              </div>
            </label>
          </div>

          {/* CTA Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-extrabold text-xl py-4 rounded-xl shadow-lg shadow-green-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
          >
            <div className="absolute top-0 left-0 -ml-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] animate-shimmer"></div>
            
            <div className="relative flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>ĐANG XỬ LÝ...</span>
                </>
              ) : (
                <>
                  <PlayCircle className="w-5 h-5 opacity-90" />
                  <span>MUA RECORD NGAY!</span>
                </>
              )}
            </div>
          </button>

          <p className="text-center text-[11px] text-gray-400 mt-4 leading-tight">
             Thông tin của bạn được dùng để gửi quyền truy cập khoá học.
          </p>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;