import React, { useState, useEffect } from 'react';
import { Clock, ShoppingBag } from 'lucide-react';
import { COUNTDOWN_TARGET } from '../constants';

const CountdownBar: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Lấy thời gian mục tiêu từ file constants
      const targetDate = new Date(COUNTDOWN_TARGET).getTime();
      const now = new Date().getTime();
      
      // Tính khoảng cách thời gian
      const difference = targetDate - now;
      
      // Nếu hết giờ thì trả về 0
      return difference > 0 ? Math.floor(difference / 1000) : 0;
    };

    // Set giá trị ban đầu ngay lập tức để tránh layout shift
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return { d, h, m, s };
  };

  const time = formatTime(timeLeft);

  return (
    // Added backdrop-blur and slight transparency for glass effect
    <div className="sticky top-0 z-50 bg-gradient-to-r from-red-700 via-red-600 to-red-700 backdrop-blur-md text-white shadow-lg border-b border-white/10">
      <div className="max-w-4xl mx-auto px-2 md:px-4 py-2 flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-between gap-y-2 gap-x-2">
        
        {/* Sale Badge & Text */}
        <div className="flex items-center justify-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <span className="bg-yellow-400 text-red-900 text-[10px] md:text-xs font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-tighter whitespace-nowrap flex items-center gap-1">
               <ShoppingBag className="w-3 h-3" />
               <span className="line-through decoration-red-900/50">Black Friday</span> / Cyber Monday
            </span>
          </div>
          
          <div className="flex items-center gap-1.5 text-xs md:text-sm font-medium opacity-90 whitespace-nowrap">
             <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 animate-pulse" />
             <span className="hidden sm:inline">Ưu đãi kết thúc sau:</span>
             <span className="sm:hidden">Kết thúc:</span>
          </div>
        </div>

        {/* Timer */}
        <div className="flex gap-1.5 md:gap-2 text-center">
          {time.d > 0 && (
            <div className="bg-black/30 rounded px-1.5 md:px-2 py-1 min-w-[36px] md:min-w-[44px] border border-white/10 backdrop-blur-sm">
              <span className="block font-bold text-base md:text-lg leading-none font-mono">{String(time.d).padStart(2, '0')}</span>
              <span className="text-[8px] md:text-[9px] opacity-80 uppercase tracking-wider">Ngày</span>
            </div>
          )}
          <div className="bg-black/30 rounded px-1.5 md:px-2 py-1 min-w-[36px] md:min-w-[44px] border border-white/10 backdrop-blur-sm">
            <span className="block font-bold text-base md:text-lg leading-none font-mono">{String(time.h).padStart(2, '0')}</span>
            <span className="text-[8px] md:text-[9px] opacity-80 uppercase tracking-wider">Giờ</span>
          </div>
          <div className="bg-black/30 rounded px-1.5 md:px-2 py-1 min-w-[36px] md:min-w-[44px] border border-white/10 backdrop-blur-sm">
            <span className="block font-bold text-base md:text-lg leading-none font-mono">{String(time.m).padStart(2, '0')}</span>
            <span className="text-[8px] md:text-[9px] opacity-80 uppercase tracking-wider">Phút</span>
          </div>
          <div className="bg-black/30 rounded px-1.5 md:px-2 py-1 min-w-[36px] md:min-w-[44px] border border-white/10 backdrop-blur-sm">
            <span className="block font-bold text-base md:text-lg leading-none font-mono">{String(time.s).padStart(2, '0')}</span>
            <span className="text-[8px] md:text-[9px] opacity-80 uppercase tracking-wider">Giây</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownBar;