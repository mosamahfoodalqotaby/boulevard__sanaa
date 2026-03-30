import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Home } from 'lucide-react';

interface QRData {
  id: string;
}
const images = [
 '/1.jpg.jpeg',
    '/2.jpeg',
    '/3.jpeg',
    '/4.jpeg',
];

export default function QRCodeScanner() {
  const [, setLocation] = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const name = params.get('name');
    if (!name) {
      setLocation(`/qr-name-input?${window.location.search}`);
      return;
    }
  }, [setLocation]);

  return (
    <div className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory scrollbar-thin scrollbar-thumb-[#C5A059] scrollbar-track-black" dir="rtl">
      {images.map((src, index) => (
        <div key={index} className="h-screen w-screen snap-center snap-always flex items-center justify-center bg-black">
          <img 
            src={src}
            alt={`صورة ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white text-4xl font-bold drop-shadow-2xl z-10">
            صفحة {index + 1}
          </div>
        </div>
      ))}
    </div>
  );
}

