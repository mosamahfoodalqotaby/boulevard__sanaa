import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Heart } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function QRWelcome() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // قائمة الصور من الملف المضغوط
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

  // تغيير الصورة كل 5 ثوان
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  return (
    <div className="min-h-screen bg-[#1e1b1c] text-[#C5A059]">
      <Sidebar />
      <WhatsAppButton phoneNumber="967123456789" message="مرحبا بك في بوليفارد صنعاء! كيف يمكنني مساعدتك؟" />

      <main className="md:ml-64 pb-24">
        {/* Welcome Section */}
        <section className="pt-12 pb-8 px-4 md:px-8 bg-gradient-to-b from-[#252526] to-[#1e1b1c]">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center mb-8">
              <img src="/logo.png" alt="بوليفارد صنعاء" className="h-40 w-auto drop-shadow-lg" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-center text-[#C5A059] mb-4">
              أهلاً وسهلاً بك
            </h1>
            <p className="text-center text-[#b89447] text-xl mb-2">
              في بوليفارد صنعاء
            </p>
            <p className="text-center text-[#C5A059] text-lg">
              تجربة فاخرة لا تُنسى
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="px-4 md:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image Carousel */}
              <div className="order-2 lg:order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-600/40">
                  <img
                    src={`/${galleryImages[currentImageIndex]}`}
                    alt="صورة من بوليفارد صنعاء"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center">
                    {galleryImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentImageIndex
                            ? 'bg-[#3d2e24]0 w-8'
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Welcome Message */}
              <div className="order-1 lg:order-2">
                <div className="bg-[#252526] rounded-2xl p-8 border-2 border-yellow-600/40">
                  <h2 className="text-3xl font-bold text-[#C5A059] mb-6">
                    مرحباً بك في عالمنا الفاخر
                  </h2>
                  
                  <div className="space-y-6 mb-8">
                    <p className="text-[#b89447] leading-relaxed">
                      نحن يسعدنا استقبالك في بوليفارد صنعاء، حيث تجتمع الفخامة والأناقة في موقع استراتيجي متميز.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex gap-4 items-start">
                        <Heart className="w-6 h-6 text-[#b89447] flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-bold text-[#C5A059] mb-1">تجربة فاخرة</h3>
                          <p className="text-[#C5A059] text-sm">استمتع بأفضل الخدمات والمرافق الفاخرة</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 items-start">
                        <MapPin className="w-6 h-6 text-[#b89447] flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-bold text-[#C5A059] mb-1">موقع متميز</h3>
                          <p className="text-[#C5A059] text-sm">في قلب صنعاء بموقع استراتيجي</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 items-start">
                        <Phone className="w-6 h-6 text-[#b89447] flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-bold text-[#C5A059] mb-1">خدمة عملاء</h3>
                          <p className="text-[#C5A059] text-sm">فريق متخصص لخدمتك 24/7</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#252525] rounded-lg p-6 border border-yellow-600/20">
                    <h3 className="font-bold text-[#C5A059] mb-4">معلومات التواصل</h3>
                    <div className="space-y-3 text-[#b89447]">
                      <div className="flex items-center gap-2">
                        <Phone className="w-5 h-5 text-[#b89447]" />
                        <span>+967 1 234 5678</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-[#b89447]" />
                        <span>info@boulevard.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-[#b89447]" />
                        <span>صنعاء، اليمن</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="px-4 md:px-8 py-16 bg-[#252526]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-[#C5A059] mb-12">
              معرض الصور الفاخر
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.slice(0, 6).map((image, idx) => (
                <div
                  key={idx}
                  className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-yellow-600/20"
                >
                  <img
                    src={`/${image}`}
                    alt={`صورة ${idx + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 md:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#C5A059] mb-6">
              هل تريد حجز تجربة فاخرة؟
            </h2>
            <p className="text-[#b89447] text-lg mb-8">
              تواصل معنا الآن واحصل على أفضل العروض الحصرية
            </p>
            <a
              href="https://wa.me/967123456789?text=مرحبا%20بي%20في%20بوليفارد%20صنعاء%20أود%20الحجز"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-[#6b5a4a] hover:to-yellow-700 text-[#1e1b1c] font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              تواصل معنا عبر واتساب
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
