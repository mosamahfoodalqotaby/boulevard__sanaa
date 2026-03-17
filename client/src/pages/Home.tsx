import { Sparkles, MapPin, Users, Star, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  const features = [
    {
      icon: Sparkles,
      title: 'تجربة فاخرة',
      description: 'استمتع بأفضل الخدمات والمرافق الفاخرة',
    },
    {
      icon: MapPin,
      title: 'موقع متميز',
      description: 'موقع استراتيجي في قلب صنعاء',
      link: 'https://maps.app.goo.gl/Vg3cbhDDHSeBNdEq7?g_st=aw',
    },
    {
      icon: Users,
      title: 'خدمة عملاء',
      description: 'فريق متخصص لخدمتك 24/7',
    },
    {
      icon: Star,
      title: 'تقييمات عالية',
      description: 'ثقة وتقييمات ممتازة من العملاء',
    },
  ];

  // قائمة الصور المستخرجة من الملف المضغوط
  const galleryImages = [
    'IMG-20260205-WA0032.jpg.jpeg',
    'IMG-20260205-WA0033.jpg.jpeg',
    'IMG-20260205-WA0034.jpg.jpeg',
    'IMG-20260205-WA0035.jpg.jpeg',
    'IMG-20260205-WA0036.jpg.jpeg',
    'IMG-20260205-WA0037.jpg.jpeg',
    'IMG-20260205-WA0038.jpg.jpeg',
    'IMG-20260205-WA0039.jpg.jpeg',
    'IMG-20260205-WA0040.jpg.jpeg',
    'IMG-20260205-WA0041.jpg.jpeg',
    'IMG-20260205-WA0042.jpg.jpeg',
    'IMG-20260205-WA0043.jpg.jpeg',
  ];

  return (
    <div className="min-h-screen bg-[#1e1b1c] text-[#C5A059]">
      <Sidebar />
      <WhatsAppButton phoneNumber="967123456789" message="مرحبا بك في بوليفارد صنعاء! كيف يمكنني مساعدتك؟" />

      {/* Main Content */}
      <main className="md:ml-64 pb-24">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-[#252526] to-[#1e1b1c]">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 right-10 w-72 h-72 bg-[#3d2e24] rounded-full mix-blend-multiply filter blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#1e1b1c] rounded-full mix-blend-multiply filter blur-3xl"></div>
          </div>

          <div className="relative container mx-auto max-w-4xl">
            <div className="text-center space-y-6">
              <div className="flex justify-center mb-6">
                <img src="/logo.png" alt="بوليفارد صنعاء" className="h-44 w-auto drop-shadow-lg" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-[#C5A059]">
                مرحبا بك في <span className="text-[#b89447]">بوليفارد صنعاء</span>
              </h1>
              <p className="text-xl md:text-2xl text-[#b89447] max-w-2xl mx-auto">
                تجربة فاخرة وأنيقة لا تُنسى في أفضل موقع بصنعاء
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Link href="/bookings">
                  <button className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-[#6b5a4a] hover:to-yellow-700 text-[#1e1b1c] font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 flex items-center gap-2 justify-center">
                    احجز الآن <ChevronRight size={20} />
                  </button>
                </Link>
                <Link href="/about">
                  <button className="px-8 py-4 border-2 border-[#6b5a4a] text-[#C5A059] font-bold rounded-lg hover:bg-[#3d2e24]/20 transition-colors">
                    تعرف علينا
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 md:px-8 bg-[#252526]">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-center text-[#C5A059] mb-16">
              لماذا تختار بوليفارد؟
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                const card = (
                  <div
                    key={idx}
                    className={`p-6 rounded-xl bg-[#252525] border border-yellow-600/30 hover:shadow-lg hover:shadow-yellow-600/20 transition-all duration-300${(feature as any).link ? ' cursor-pointer hover:border-yellow-500/60' : ''}`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#6b5a4a] text-white flex items-center justify-center mb-4">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-[#C5A059] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-[#C5A059]">
                      {feature.description}
                    </p>
                  </div>
                );
                return (feature as any).link ? (
                  <a key={idx} href={(feature as any).link} target="_blank" rel="noopener noreferrer">
                    {card}
                  </a>
                ) : card;
              })}
            </div>
          </div>
        </section>

        {/* Gallery Section - الصور الفعلية */}
        <section className="py-20 px-4 md:px-8 bg-[#1e1b1c]">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-center text-[#C5A059] mb-4">
              معرض الصور الفاخر
            </h2>
            <p className="text-center text-[#b89447] mb-16 text-lg">
              استمتع بمشاهدة أفضل لحظاتك في بوليفارد صنعاء
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, idx) => (
                <div
                  key={idx}
                  className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-yellow-600/20"
                >
                  <img
                    src={`/${image}`}
                    alt={`صورة ${idx + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                    <div className="w-full p-4 bg-gradient-to-t from-black to-transparent text-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-sm font-semibold">صورة فاخرة من بوليفارد صنعاء</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="py-20 px-4 md:px-8 bg-[#252526]">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-center text-[#C5A059] mb-16">
              الباقات المتاحة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'الشاليه الفاخر',
                  price: '500,000',
                  features: ['غرف فاخرة', 'مسبح خاص', 'حديقة واسعة', 'خدمة غرف'],
                },
                {
                  name: 'القاعة الملكية',
                  price: '750,000',
                  features: ['سعة 500 شخص', 'ديكور فاخر', 'مطبخ متكامل', 'صوتيات احترافية'],
                },
                {
                  name: 'الباقة الكاملة',
                  price: '1,000,000',
                  features: ['شاليه + قاعة', 'خدمات متكاملة', 'تنسيق كامل', 'دعم فني'],
                },
              ].map((pkg, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-xl bg-[#252525] border-2 border-yellow-600/40 hover:border-[#6b5a4a] transition-all duration-300 hover:shadow-lg hover:shadow-yellow-600/20"
                >
                  <h3 className="text-2xl font-bold text-[#C5A059] mb-4">
                    {pkg.name}
                  </h3>
                  <div className="text-3xl font-bold text-[#b89447] mb-6">
                    {pkg.price} <span className="text-lg text-[#C5A059]">ريال</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-3 text-[#b89447]">
                        <span className="w-2 h-2 bg-[#3d2e24]0 rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/bookings">
                    <button className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-[#6b5a4a] hover:to-yellow-700 text-[#1e1b1c] font-bold rounded-lg transition-all duration-300">
                      احجز الآن
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-[#252525] to-[#252526]">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold text-[#C5A059] mb-6">
              هل أنت مستعد للتجربة الفاخرة؟
            </h2>
            <p className="text-xl text-[#b89447] mb-8">
              احجز الآن واستمتع بأفضل الخدمات والمرافق الفاخرة
            </p>
            <Link href="/bookings">
              <button className="px-12 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-[#6b5a4a] hover:to-yellow-700 text-[#1e1b1c] font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95">
                احجز الآن
              </button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
