import { MessageCircle } from 'lucide-react';

export default function Footer() {
  const whatsappNumber = '967784442228'; // رقم WhatsApp
  const whatsappMessage = 'مرحبا، أود الاستفسار عن الحجوزات والخدمات المتاحة في بوليفارد صنعاء';

  const handleWhatsApp = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      '_blank'
    );
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#1e1b1c] border-t border-[#C5A059]/30 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="text-sm text-[#C5A059]">
          <p>&copy; 2026 بوليفارد صنعاء. جميع الحقوق محفوظة.</p>
        </div>

        {/* Right Section - Book Now Button */}
        <button
          onClick={handleWhatsApp}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C5A059] to-[#b89447] hover:from-[#b89447] hover:to-[#a89350] text-[#1e1b1c] font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
        >
          <MessageCircle size={20} />
          <span>احجز الآن</span>
        </button>
      </div>
    </footer>
  );
}
