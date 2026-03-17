import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { X } from 'lucide-react';

interface ScanResult {
  customerName: string;
  bookingId: string;
  phone: string;
  checkInDate: string;
}

interface FormData {
  guestCount: string;
  specialRequests: string;
  notes: string;
  mealPreferences: string;
}

// روابط الصور مرتبة حسب أرقام أسماء الملفات
const QRCodeImages = [
  {
    src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663380986397/ALmxfXzXdGwygXSTLhzNJo/qr-section4-invitation_0e5d79ac.jpeg',
    alt: 'ميثاق الود - الرسالة الترحيبية'
  },
  {
    src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663380986397/ALmxfXzXdGwygXSTLhzNJo/qr-section1-policies_641abc05.jpeg',
    alt: 'رحلة العبور نحو نخبة النخبة'
  },
  {
    src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663380986397/ALmxfXzXdGwygXSTLhzNJo/qr-section3-membership_796f2529.jpeg',
    alt: 'حالات تجميد العضوية'
  },
  {
    src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663380986397/ALmxfXzXdGwygXSTLhzNJo/qr-section2-welcome_67be340d.jpeg',
    alt: 'دعوة رسمية إلى أصحاب المقام الرفيع'
  },
];

export default function QRCodeScanner() {
  const [location, setLocation] = useLocation();
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    guestCount: '',
    specialRequests: '',
    notes: '',
    mealPreferences: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // قراءة المعاملات من الرابط
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const name = params.get("name");
    const phone = params.get("phone");
    const date = params.get("date");

    console.log('QRCodeScanner params:', { id, name, phone, date });

    if (!name) {
      // إذا لم يتم توفير الاسم، أعد التوجيه إلى صفحة إدخال الاسم
      console.log('No name provided, redirecting to QRNameInput');
      const currentParams = new URLSearchParams(window.location.search);
      setLocation(`/qr-name-input?${currentParams.toString()}`);
      return;
    }

    if (name) {
      console.log('Setting scan result with name:', name);
      setScanResult({
        customerName: decodeURIComponent(name),
        bookingId: id ? decodeURIComponent(id) : 'N/A',
        phone: phone ? decodeURIComponent(phone) : "",
        checkInDate: date ? decodeURIComponent(date) : "",
      });
    }
  }, [setLocation]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Form submitted:', {
        booking: scanResult,
        additionalInfo: formData,
      });

      alert('تم تسجيل معلوماتك بنجاح! شكراً لاختيارك بوليفارد صنعاء');
      
      setFormData({
        guestCount: '',
        specialRequests: '',
        notes: '',
        mealPreferences: '',
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('حدث خطأ في تسجيل المعلومات. حاول مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetScan = () => {
    setScanResult(null);
    setShowForm(false);
    setFormData({
      guestCount: "",
      specialRequests: "",
      notes: "",
      mealPreferences: "",
    });
    setLocation("/qr-name-input");
  };

  const handleContinueToForm = () => {
    setShowForm(true);
  };

  // صفحة النموذج
  if (showForm && scanResult) {
    return (
      <div className="min-h-screen bg-[#1e1b1c] p-4" dir="rtl">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 pt-8">
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

          {/* Form Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#C5A059] mb-2" style={{ fontFamily: 'Amiri, serif' }}>
              معلومات إضافية
            </h2>
            <p className="text-[#a89968] text-lg" style={{ fontFamily: 'Amiri, serif' }}>
              يرجى ملء البيانات التالية لتحسين تجربتك
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="bg-[#252526] border border-[#C5A059]/30 rounded-lg p-8 mb-8">
            {/* Guest Count */}
            <div className="mb-6">
              <label className="block text-[#C5A059] font-bold mb-2 text-right" style={{ fontFamily: 'Amiri, serif' }}>
                عدد الضيوف المتوقع
              </label>
              <input
                type="number"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleFormChange}
                placeholder="أدخل عدد الضيوف"
                className="w-full bg-[#1e1b1c] border border-[#C5A059] rounded px-4 py-2 text-[#C5A059] text-right placeholder-[#a89968]"
                style={{ fontFamily: 'Amiri, serif' }}
              />
            </div>

            {/* Special Requests */}
            <div className="mb-6">
              <label className="block text-[#C5A059] font-bold mb-2 text-right" style={{ fontFamily: 'Amiri, serif' }}>
                طلبات خاصة
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleFormChange}
                placeholder="أخبرنا عن أي طلبات خاصة لديك"
                rows={3}
                className="w-full bg-[#1e1b1c] border border-[#C5A059] rounded px-4 py-2 text-[#C5A059] text-right placeholder-[#a89968] resize-none"
                style={{ fontFamily: 'Amiri, serif' }}
              />
            </div>

            {/* Meal Preferences */}
            <div className="mb-6">
              <label className="block text-[#C5A059] font-bold mb-2 text-right" style={{ fontFamily: 'Amiri, serif' }}>
                تفضيلات الطعام
              </label>
              <textarea
                name="mealPreferences"
                value={formData.mealPreferences}
                onChange={handleFormChange}
                placeholder="أخبرنا عن تفضيلاتك الغذائية"
                rows={3}
                className="w-full bg-[#1e1b1c] border border-[#C5A059] rounded px-4 py-2 text-[#C5A059] text-right placeholder-[#a89968] resize-none"
                style={{ fontFamily: 'Amiri, serif' }}
              />
            </div>

            {/* Additional Notes */}
            <div className="mb-6">
              <label className="block text-[#C5A059] font-bold mb-2 text-right" style={{ fontFamily: 'Amiri, serif' }}>
                ملاحظات إضافية
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleFormChange}
                placeholder="أي ملاحظات أخرى تود إضافتها"
                rows={3}
                className="w-full bg-[#1e1b1c] border border-[#C5A059] rounded px-4 py-2 text-[#C5A059] text-right placeholder-[#a89968] resize-none"
                style={{ fontFamily: 'Amiri, serif' }}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#C5A059] hover:bg-[#b89447] disabled:bg-[#a89968] text-[#1e1b1c] font-bold py-3 px-8 rounded-lg transition-all"
                style={{ fontFamily: 'Amiri, serif' }}
              >
                {isSubmitting ? 'جاري الحفظ...' : 'حفظ المعلومات'}
              </button>
              <button
                type="button"
                onClick={resetScan}
                className="bg-transparent border border-[#C5A059] hover:bg-[#252526] text-[#C5A059] font-bold py-3 px-8 rounded-lg transition-all"
                style={{ fontFamily: 'Amiri, serif' }}
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // صفحة التصفح بـ Scroll Snap
  if (scanResult) {
    return (
      <div className="w-full h-screen bg-[#1e1b1c] overflow-hidden" dir="rtl">
        {/* حاوية التصفح مع Scroll Snap */}
        <div
          className="w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
          style={{
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {/* صفحة الترحيب الأولى */}
          <div className="w-full h-screen bg-[#1e1b1c] flex flex-col items-center justify-center p-4 snap-start snap-always">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <img src="/logo-gold.png" alt="Boulevard Sana'a" className="h-40 w-auto drop-shadow-lg" />
              </div>
              <h1 className="text-6xl font-bold text-[#C5A059] mb-2" style={{ fontFamily: 'Amiri, serif' }}>
                بوليفارد صنعاء
              </h1>
              <p className="text-[#C5A059] text-2xl" style={{ fontFamily: 'Amiri, serif' }}>
                Boulevard Sana'a
              </p>
            </div>

            {/* Customer Name */}
            <div className="text-center mb-16">
              <h2 className="text-6xl font-bold text-[#C5A059] mb-4" style={{ fontFamily: 'Amiri, serif' }}>
                أهلاً وسهلاً
              </h2>
              <p className="text-5xl font-bold text-[#b89447] mb-6" style={{ fontFamily: 'Amiri, serif' }}>
                {scanResult.customerName}
              </p>
              <div className="h-1 w-48 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto"></div>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-auto mb-8 flex flex-col items-center gap-4 animate-bounce">
              <p className="text-[#C5A059] text-lg" style={{ fontFamily: 'Amiri, serif' }}>
                اسحب للأعلى للمتابعة
              </p>
              <svg className="w-8 h-8 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>

          {/* صفحات الصور - كل صورة في snap-start */}
          {QRCodeImages.map((image, index) => (
            <div
              key={index}
              className="w-full h-screen bg-[#1e1b1c] flex items-center justify-center snap-start snap-always relative overflow-hidden"
            >
              {/* الصورة تملأ الشاشة بالكامل */}
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-contain"
                loading={index > 1 ? "lazy" : "eager"}
              />

              {/* شريط التقدم في الأعلى */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#252525]">
                <div
                  className="h-full bg-[#C5A059] transition-all duration-300"
                  style={{
                    width: `${((index + 1) / (QRCodeImages.length + 1)) * 100}%`
                  }}
                ></div>
              </div>

              {/* مؤشر الصفحة الحالية */}
              <div className="absolute top-4 right-4 bg-[#1e1b1c]/80 px-4 py-2 rounded-lg">
                <p className="text-[#C5A059] text-sm font-bold">
                  {index + 2} / {QRCodeImages.length + 1}
                </p>
              </div>

              {/* زر الإغلاق */}
              <button
                onClick={resetScan}
                className="absolute top-4 left-4 bg-[#1e1b1c]/80 hover:bg-[#252526] text-[#C5A059] p-2 rounded-lg transition-all z-10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          ))}

          {/* صفحة الأزرار النهائية */}
          <div className="w-full h-screen bg-[#1e1b1c] flex flex-col items-center justify-center p-4 snap-start snap-always">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#C5A059] mb-4" style={{ fontFamily: 'Amiri, serif' }}>
                شكراً لك
              </h2>
              <p className="text-[#a89968] text-lg" style={{ fontFamily: 'Amiri, serif' }}>
                لقد أكملت عرض جميع المعلومات
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 flex-col sm:flex-row">
              <button
                onClick={handleContinueToForm}
                className="bg-[#C5A059] hover:bg-[#b89447] text-[#1e1b1c] font-bold py-3 px-8 rounded-lg transition-all"
                style={{ fontFamily: 'Amiri, serif' }}
              >
                إضافة معلومات
              </button>
              <button
                onClick={resetScan}
                className="bg-transparent border border-[#C5A059] hover:bg-[#252526] text-[#C5A059] font-bold py-3 px-8 rounded-lg transition-all"
                style={{ fontFamily: 'Amiri, serif' }}
              >
                مسح جديد
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
