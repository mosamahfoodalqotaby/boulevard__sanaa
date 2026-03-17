import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { AlertCircle } from 'lucide-react';

interface QRData {
  id: string;
  name: string;
  phone?: string;
  date?: string;
}

export default function QRNameInput() {
  const [, setLocation] = useLocation();
  const [qrData, setQrData] = useState<QRData | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // قراءة بيانات الباركود من الرابط
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const name = params.get('name');
    const phone = params.get('phone');
    const date = params.get('date');

    if (id) {
      setQrData({
        id: decodeURIComponent(id),
        name: name ? decodeURIComponent(name) : '',
        phone: phone ? decodeURIComponent(phone) : '',
        date: date ? decodeURIComponent(date) : '',
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!customerName.trim()) {
      setError('يرجى إدخال اسمك');
      return;
    }

    if (customerName.trim().length < 2) {
      setError('يجب أن يكون الاسم على الأقل حرفين');
      return;
    }

    setIsSubmitting(true);

    // الانتقال إلى صفحة الترحيب مع الاسم المدخل
    const params = new URLSearchParams({
      id: qrData?.id || '',
      name: customerName.trim(),
      phone: qrData?.phone || '',
      date: qrData?.date || '',
    });

    setTimeout(() => {
      setLocation(`/qr-code-scanner?${params.toString()}`);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e1b1c] via-[#3d2e24] to-[#1e1b1c] flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <img src="/logo-gold.png" alt="Boulevard Sana'a" className="h-32 w-auto drop-shadow-lg" />
          </div>
          <h1 className="text-4xl font-bold text-[#C5A059] mb-2" style={{ fontFamily: 'Amiri, serif' }}>
            بوليفارد صنعاء
          </h1>
          <p className="text-[#C5A059] text-lg" style={{ fontFamily: 'Amiri, serif' }}>
            Boulevard Sana'a
          </p>
        </div>

        {/* Welcome Form */}
        <div className="bg-[#3d2e24]/50 border border-[#C5A059]/30 rounded-lg p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-[#C5A059] mb-2 text-center" style={{ fontFamily: 'Amiri, serif' }}>
            أهلاً وسهلاً
          </h2>
          <p className="text-[#a89968] text-center mb-8" style={{ fontFamily: 'Amiri, serif' }}>
            يرجى إدخال اسمك لنتمكن من تقديم أفضل خدمة لك
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#C5A059] font-bold mb-3 text-right" style={{ fontFamily: 'Amiri, serif' }}>
                الاسم
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="أدخل اسمك الكامل"
                className="w-full bg-[#1e1b1c] border border-[#C5A059] rounded px-4 py-3 text-[#C5A059] text-right placeholder-[#a89968] focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent"
                style={{ fontFamily: 'Amiri, serif' }}
                autoFocus
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#C5A059] hover:bg-[#b89447] disabled:bg-[#a89968] text-[#1e1b1c] font-bold py-3 px-8 rounded-lg transition-all disabled:cursor-not-allowed"
              style={{ fontFamily: 'Amiri, serif' }}
            >
              {isSubmitting ? 'جاري المتابعة...' : 'متابعة'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#C5A059]/30 text-center">
            <p className="text-[#a89968] text-sm" style={{ fontFamily: 'Amiri, serif' }}>
              سيتم استخدام اسمك لتخصيص تجربتك معنا
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
