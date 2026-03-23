import React, { useEffect, useState } from 'react';

export const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading or wait for window.onload
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-blue-950 transition-opacity duration-1000">
      <div className="relative flex flex-col items-center">
        {/* Simple bouncing branded book or logo shape */}
        <div className="w-20 h-20 border-4 border-t-white border-r-emerald-400 border-b-blue-400 border-l-transparent rounded-full animate-spin"></div>
        <div className="mt-8 text-white font-black tracking-[0.5em] uppercase text-sm animate-pulse">
          Loading Fesola
        </div>
      </div>
    </div>
  );
};
