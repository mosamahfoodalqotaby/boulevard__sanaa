import { useEffect, useState } from 'react';
import { useSearch } from 'wouter';
import { Download, Share2, MessageCircle } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

interface VisitorData {
  name: string;
  phone: string;
  visitorId: string;
}

export default function VisitorProfile() {
  const search = useSearch();
  const [visitorData, setVisitorData] = useState<VisitorData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // استخراج البيانات من URL
    const params = new URLSearchParams(search);
    const name = params.get('name');
    const phone = params.get('phone');
    const visitorId = window.location.pathname.split('/').pop() || '';

    if (name && phone) {
      setVisitorData({
        name: decodeURIComponent(name),
        phone,
        visitorId,
      });
    }
    setLoading(false);
  }, [search]);

  const handleShare = async () => {
    if (visitorData && navigator.share) {
      try {
        await navigator.share({
          title: 'بوليفارد صنعاء',
          text: `اسمي ${visitorData.name}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  const handleWhatsApp = () => {
    if (visitorData) {
      const message = `مرحبا، أنا ${visitorData.name}. أود الاستفسار عن خدماتكم.`;
      const encodedMessage = encodeURIComponent(message);
      window.open(
        `https://wa.me/${visitorData.phone}?text=${encodedMessage}`,
        '_blank'
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream via-white to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#6b5a4a] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!visitorData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream via-white to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            البيانات غير صحيحة أو غير متوفرة
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-white to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Sidebar />

      <main className="md:ml-64 pb-24">
        {/* Header */}
        <section className="pt-20 pb-12 px-4 md:px-8 bg-gradient-to-r from-yellow-500 to-yellow-600">
          <div className="container mx-auto max-w-4xl text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              مرحبا بك في بوليفارد صنعاء
            </h1>
            <p className="text-xl text-yellow-50">أ/ {visitorData.name}</p>
          </div>
        </section>

        {/* Profile Card */}
        <section className="py-12 px-4 md:px-8">
          <div className="container mx-auto max-w-2xl">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg space-y-6">
              {/* Welcome Message */}
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  أهلا وسهلا
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  نرحب بك في عائلة بوليفارد صنعاء
                </p>
              </div>

              {/* Visitor Info */}
              <div className="bg-[#3d2e24] dark:bg-[#3d2e24]/20 rounded-lg p-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">الاسم</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {visitorData.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">الهاتف</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white dir-ltr">
                    {visitorData.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">رقم الزائر</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white dir-ltr">
                    {visitorData.visitorId}
                  </p>
                </div>
              </div>

              {/* Services Info */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  خدماتنا المتاحة
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border-l-4 border-[#6b5a4a] bg-gray-50 dark:bg-slate-700 rounded">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      الشاليه الفاخر
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      غرف فاخرة مع مسبح خاص
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-[#6b5a4a] bg-gray-50 dark:bg-slate-700 rounded">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      القاعة الملكية
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      سعة 500 شخص مع ديكور فاخر
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                  <MessageCircle size={20} />
                  <span>تواصل معنا</span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                  <Share2 size={20} />
                  <span>شارك</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Special Offers Section */}
        <section className="py-12 px-4 md:px-8 bg-white dark:bg-slate-800/50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              عروض خاصة لك
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/20 dark:to-slate-800 rounded-lg border border-yellow-100 dark:border-yellow-900/30">
                <div className="text-4xl font-bold text-[#a89350] dark:text-[#C5A059] mb-2">
                  15%
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">
                  خصم على الحجوزات
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  للحجوزات المبكرة
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/20 dark:to-slate-800 rounded-lg border border-yellow-100 dark:border-yellow-900/30">
                <div className="text-4xl font-bold text-[#a89350] dark:text-[#C5A059] mb-2">
                  VIP
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">
                  عضوية مميزة
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  مع خدمات إضافية
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/20 dark:to-slate-800 rounded-lg border border-yellow-100 dark:border-yellow-900/30">
                <div className="text-4xl font-bold text-[#a89350] dark:text-[#C5A059] mb-2">
                  24/7
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">
                  دعم عملاء
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  متاح طوال الوقت
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
