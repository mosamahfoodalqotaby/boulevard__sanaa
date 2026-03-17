import { Award, Users, MapPin, Heart } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function About() {
  return (
    <div className="min-h-screen bg-[#1e1b1c]">
      <Sidebar />
      <WhatsAppButton phoneNumber="967123456789" message="مرحبا بك في بوليفارد صنعاء! كيف يمكنني مساعدتك؟" />

      <main className="md:ml-64 pb-24">
        {/* Header */}
        <section className="pt-20 pb-12 px-4 md:px-8 bg-[#1e1b1c]">
          <div className="container mx-auto max-w-4xl text-center text-white">
            <div className="flex justify-center mb-6">
              <img src="/logo.png" alt="بوليفارد صنعاء" className="h-36 w-auto drop-shadow-lg" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">عن بوليفارد صنعاء</h1>
            <p className="text-xl text-yellow-50">
              تجربة فاخرة لا تُنسى في قلب صنعاء
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-12 px-4 md:px-8">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-[#1e1b1c] rounded-xl p-8 shadow-2xl border border-yellow-600/30 mb-8">
              <h2 className="text-3xl font-bold text-[#C5A059] mb-6">قصتنا</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                بوليفارد صنعاء هو وجهة فاخرة تجمع بين الفخامة والراحة والخدمة المتميزة. تأسسنا برؤية واضحة لتقديم تجربة استثنائية للعملاء الكرام الذين يبحثون عن أفضل ما في الحياة.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                مع سنوات من الخبرة والتفاني في تقديم الخدمات الراقية، أصبحنا الخيار الأول للعائلات والشركات التي تسعى لقضاء أوقات لا تُنسى في بيئة فاخرة وآمنة.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-[#1e1b1c] rounded-lg border border-yellow-600/30">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#6b5a4a] rounded-lg flex items-center justify-center">
                    <Award className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#C5A059]">الجودة</h3>
                </div>
                <p className="text-gray-300">
                  نلتزم بأعلى معايير الجودة في كل جانب من جوانب خدماتنا
                </p>
              </div>

              <div className="p-6 bg-[#1e1b1c] rounded-lg border border-yellow-600/30">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#6b5a4a] rounded-lg flex items-center justify-center">
                    <Heart className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#C5A059]">الاهتمام</h3>
                </div>
                <p className="text-gray-300">
                  نهتم بكل التفاصيل الصغيرة لضمان رضاك الكامل
                </p>
              </div>

              <div className="p-6 bg-[#1e1b1c] rounded-lg border border-yellow-600/30">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#6b5a4a] rounded-lg flex items-center justify-center">
                    <Users className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#C5A059]">الفريق</h3>
                </div>
                <p className="text-gray-300">
                  فريقنا المحترف مدرب على تقديم أفضل خدمة عملاء
                </p>
              </div>

              <div className="p-6 bg-[#1e1b1c] rounded-lg border border-yellow-600/30">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#6b5a4a] rounded-lg flex items-center justify-center">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#C5A059]">الموقع</h3>
                </div>
                <p className="text-gray-300">
                  موقع استراتيجي في قلب صنعاء بسهولة الوصول
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-12 px-4 md:px-8 bg-[#1e1b1c]/50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-[#C5A059] mb-8 text-center">
              إحصائياتنا
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-[#1e1b1c] rounded-lg border border-yellow-600/30">
                <div className="text-4xl font-bold text-[#b89447] mb-2">500+</div>
                <p className="text-gray-300">عميل سعيد</p>
              </div>
              <div className="text-center p-6 bg-[#1e1b1c] rounded-lg border border-yellow-600/30">
                <div className="text-4xl font-bold text-[#b89447] mb-2">10+</div>
                <p className="text-gray-300">سنوات خبرة</p>
              </div>
              <div className="text-center p-6 bg-[#1e1b1c] rounded-lg border border-yellow-600/30">
                <div className="text-4xl font-bold text-[#b89447] mb-2">100%</div>
                <p className="text-gray-300">رضا العملاء</p>
              </div>
              <div className="text-center p-6 bg-[#1e1b1c] rounded-lg border border-yellow-600/30">
                <div className="text-4xl font-bold text-[#b89447] mb-2">24/7</div>
                <p className="text-gray-300">دعم عملاء</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12 px-4 md:px-8">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-[#C5A059] mb-8 text-center">
              فريقنا المتميز
            </h2>
            <div className="bg-[#1e1b1c] rounded-xl p-8 shadow-2xl border border-yellow-600/30">
              <p className="text-gray-300 text-lg text-center mb-6">
                فريقنا يتكون من محترفين ذوي خبرة عالية في مجال الضيافة والخدمات الفاخرة
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#6b5a4a] to-[#333333] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="text-white" size={40} />
                  </div>
                  <h3 className="text-lg font-bold text-[#C5A059]">المدير العام</h3>
                  <p className="text-gray-400 text-sm">خبرة 15 سنة</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#6b5a4a] to-[#333333] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Award className="text-white" size={40} />
                  </div>
                  <h3 className="text-lg font-bold text-[#C5A059]">مدير الخدمات</h3>
                  <p className="text-gray-400 text-sm">خبرة 12 سنة</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#6b5a4a] to-[#333333] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Heart className="text-white" size={40} />
                  </div>
                  <h3 className="text-lg font-bold text-[#C5A059]">مدير العمليات</h3>
                  <p className="text-gray-400 text-sm">خبرة 10 سنوات</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
