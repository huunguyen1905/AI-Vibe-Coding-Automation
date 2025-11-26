import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { COUNTDOWN_TARGET } from '../constants';

const CountdownBar: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Lấy thời gian mục tiêu từ file constants (đã chỉnh theo múi giờ VN)
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
    <div className="sticky top-0 z-50 bg-gradient-to-r from-red-600/95 to-red-500/95 backdrop-blur-md text-white shadow-lg border-b border-white/10">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-sm md:text-base uppercase tracking-wider">
          <Clock className="w-5 h-5 animate-pulse" />
          <span className="hidden sm:inline">Ưu đãi sẽ kết thúc sau:</span>
          <span className="sm:hidden">Kết thúc:</span>
        </div>
        <div className="flex gap-2 text-center">
          {time.d > 0 && (
            <div className="bg-black/20 rounded px-2 py-1 min-w-[40px] md:min-w-[44px] border border-white/10 backdrop-blur-sm">
              <span className="block font-bold text-lg leading-none font-mono">{String(time.d).padStart(2, '0')}</span>
              <span className="text-[9px] opacity-80 uppercase tracking-wider">Ngày</span>
            </div>
          )}
          <div className="bg-black/20 rounded px-2 py-1 min-w-[40px] md:min-w-[44px] border border-white/10 backdrop-blur-sm">
            <span className="block font-bold text-lg leading-none font-mono">{String(time.h).padStart(2, '0')}</span>
            <span className="text-[9px] opacity-80 uppercase tracking-wider">Giờ</span>
          </div>
          <div className="bg-black/20 rounded px-2 py-1 min-w-[40px] md:min-w-[44px] border border-white/10 backdrop-blur-sm">
            <span className="block font-bold text-lg leading-none font-mono">{String(time.m).padStart(2, '0')}</span>
            <span className="text-[9px] opacity-80 uppercase tracking-wider">Phút</span>
          </div>
          <div className="bg-black/20 rounded px-2 py-1 min-w-[40px] md:min-w-[44px] border border-white/10 backdrop-blur-sm">
            <span className="block font-bold text-lg leading-none font-mono">{String(time.s).padStart(2, '0')}</span>
            <span className="text-[9px] opacity-80 uppercase tracking-wider">Giây</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownBar;