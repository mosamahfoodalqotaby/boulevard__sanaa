import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Home } from 'lucide-react';

interface QRData {
  id: string;
}

export default function QRNameInput() {
  const [qrData, setQrData] = useState<QRData | null>(null);
  const [, setLocation] = useLocation();

  // قراءة بيانات QR من URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
      setQrData({
        id: decodeURIComponent(id),
      });
    }
  }, []);

  const goHome = () => {
    setLocation('/');
  };

  const images = [
    '/1.jpg.jpeg',
    '/2.jpeg',
    '/3.jpeg',
    '/4.jpeg',
  ];

  return (
    <>
      {/* قائمة جانبية ثابتة */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={goHome}
          className="bg-[#1e1b1c]/90 hover:bg-[#252525] border border-[#C5A059]/50 text-[#C5A059] p-3 rounded-xl backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-110"
          title="الصفحة الرئيسية"
        >
          <Home className="w-6 h-6" />
        </button>
      </div>

      {/* محتوى الصور */}
      <div className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide pt-20" dir="rtl">
        {images.map((src, index) => (
          <div key={index} className="h-screen w-screen snap-center snap-always bg-black flex items-center justify-center">
            <img 
              src={src}
              alt={`صورة ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </>
  );
}

