import React, { useState } from 'react';
import FeatureList from './components/FeatureList';
import OrderForm from './components/OrderForm';
import InfoSection from './components/InfoSection';
import BackgroundEffect from './components/BackgroundEffect';
import PaymentModal from './components/PaymentModal';
import { ShieldCheck, Terminal, Video } from 'lucide-react';
import { PROGRAM_NAME } from './constants';

const App: React.FC = () => {
  const [paymentModal, setPaymentModal] = useState({
    isOpen: false,
    orderId: '',
    name: ''
  });

  const handleOrderSuccess = (orderId: string, name: string) => {
    setPaymentModal({
      isOpen: true,
      orderId,
      name
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] relative selection:bg-green-100 selection:text-green-800 font-sans">
      {/* Dynamic Background */}
      <BackgroundEffect />
      
      {/* Content wrapper with z-index to sit above background */}
      <div className="relative z-10">
        
        {/* Brand Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 sticky top-0 z-40 transition-all">
          <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
            <div className="font-extrabold text-2xl tracking-tighter text-gray-900 flex items-center gap-1 group cursor-pointer">
              <Terminal className="w-6 h-6 text-gray-800 group-hover:text-green-500 transition-colors" />
              <span>HUNG<span className="text-gray-400 group-hover:text-gray-600 transition-colors">NPV</span></span>
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span>Bảo mật SSL</span>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Sales Copy - Added animation */}
            <div className="lg:col-span-7 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="mb-10">
                 {/* Decorative Tag */}
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-4 font-mono">
                    <Video className="w-3 h-3 animate-pulse" />
                    Record Available
                 </div>

                 {/* Static Headline */}
                 <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight text-gray-900">
                   {PROGRAM_NAME}
                   <span className="animate-pulse text-green-500">_</span>
                 </h1>
                 
                 <p className="text-lg text-gray-600 max-w-2xl leading-relaxed mb-8">
                    <span className="font-bold text-red-500">Chương trình LIVE đã kết thúc thành công!</span> Bạn đã bỏ lỡ? Đừng lo, hãy đăng ký ngay để sở hữu trọn bộ <span className="font-semibold text-gray-900 bg-gray-100 px-1 rounded">Video Record 4K</span> + Tài khoản AI Pro + Source Code để làm chủ Generative AI ngay hôm nay.
                 </p>
              </div>

              {/* Feature List (Now Grid) */}
              <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-1 md:p-6 border border-white shadow-xl shadow-gray-200/50 mb-8">
                 <FeatureList />
              </div>
              
              <div className="hidden lg:block mt-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <InfoSection />
              </div>
            </div>

            {/* Right Column: Order Form (Sticky Sidebar) */}
            <div className="lg:col-span-5 relative">
              <div className="lg:sticky lg:top-24">
                <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <OrderForm onSuccess={handleOrderSuccess} />
                  
                  {/* Social Proof / Trust below form */}
                  <div className="mt-6 flex flex-col items-center justify-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                     <div className="flex -space-x-2">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] text-gray-500 overflow-hidden">
                             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i*132}`} alt="user" />
                          </div>
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-green-100 flex items-center justify-center text-[10px] font-bold text-green-700">
                          +500
                        </div>
                     </div>
                     <span className="text-xs text-gray-400 font-medium font-mono">500+ members have joined</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile only Info Section */}
            <div className="lg:hidden col-span-1 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
               <InfoSection />
            </div>

          </div>
        </main>

        <footer className="bg-white border-t border-gray-200 py-12 mt-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
             <div className="font-bold text-xl text-gray-300 mb-4 font-mono">HUNGNPV.DEV</div>
            <p className="text-sm text-gray-500">&copy; 2025 HUNGNPV. All rights reserved.</p>
            <div className="flex justify-center gap-6 mt-4 text-sm text-gray-400">
               <a href="#" className="hover:text-gray-600">Privacy Policy</a>
               <a href="#" className="hover:text-gray-600">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>

      {/* Payment Modal moved to root level to avoid stacking context issues */}
      <PaymentModal 
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal(prev => ({ ...prev, isOpen: false }))}
        orderId={paymentModal.orderId}
        customerName={paymentModal.name}
      />
    </div>
  );
};

export default App;