import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function QRScanner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ترتيب الصور مع دعوة شالية أولاً
  const images = [
    '/دعوة شالية.jpg.jpeg',
    '/النخبه.jpg.jpeg',
    '/Untitled-1.jpg.jpeg',
    '/IMG-20260205-WA0032.jpg.jpeg',
    '/IMG-20260205-WA0033.jpg.jpeg',
    '/IMG-20260205-WA0034.jpg.jpeg',
    '/IMG-20260205-WA0035.jpg.jpeg',
    '/IMG-20260205-WA0036.jpg.jpeg',
    '/IMG-20260205-WA0037.jpg.jpeg',
    '/IMG-20260205-WA0038.jpg.jpeg',
    '/IMG-20260205-WA0039.jpg.jpeg',
    '/IMG-20260205-WA0040.jpg.jpeg',
    '/IMG-20260205-WA0041.jpg.jpeg',
    '/IMG-20260205-WA0042.jpg.jpeg',
    '/IMG-20260205-WA0043.jpg.jpeg',
    '/IMG-20260205-WA0044.jpg.jpeg',
    '/IMG-20260205-WA0045.jpg.jpeg',
    '/IMG-20260205-WA0047.jpg.jpeg',
    '/IMG-20260205-WA0048.jpg.jpeg',
    '/IMG-20260205-WA0049.jpg.jpeg',
    '/IMG-20260205-WA0050.jpg.jpeg',
    '/IMG-20260205-WA0051.jpg.jpeg',
    '/IMG-20260205-WA0052.jpg.jpeg',
    '/IMG-20260205-WA0053.jpg.jpeg',
    '/IMG-20260205-WA0054.jpg.jpeg',
    '/IMG-20260205-WA0055.jpg.jpeg',
    '/IMG-20260205-WA0056.jpg.jpeg',
    '/IMG-20260205-WA0057.jpg.jpeg',
    '/IMG-20260205-WA0058.jpg.jpeg',
    '/IMG-20260205-WA0059.jpg.jpeg',
    '/IMG-20260205-WA0060.jpg.jpeg',
    '/IMG-20260205-WA0061.jpg.jpeg',
    '/IMG-20260205-WA0062.jpg.jpeg',
    '/IMG-20260205-WA0063.jpg.jpeg',
    '/IMG-20260205-WA0064.jpg.jpeg',
    '/IMG-20260205-WA0066.jpg.jpeg',
    '/IMG-20260205-WA0067.jpg.jpeg',
    '/IMG-20260205-WA0068.jpg.jpeg',
    '/IMG-20260205-WA0069.jpg.jpeg',
  ];

  // تغيير الصورة كل 5 ثوان
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-[#1e1b1c] text-[#C5A059]">
      <Sidebar />
      <WhatsAppButton phoneNumber="967123456789" message="مرحبا بك في بوليفارد صنعاء! كيف يمكنني مساعدتك؟" />

      <main className="md:ml-64 pb-24">
        {/* Header with Logo */}
        <section className="pt-12 pb-8 px-4 md:px-8 text-center">
          <img src="/logo.png" alt="Boulevard Sanaa" className="w-36 h-36 mx-auto mb-4 drop-shadow-lg" />
          <h1 className="text-4xl md:text-5xl font-bold text-[#C5A059] mb-2">
            Boulevard Sanaa
          </h1>
          <p className="text-2xl text-[#C5A059]">بوليفارد صنعاء</p>
        </section>

        {/* Description Section - النصوص المستخرجة */}
        <section className="py-12 px-4 md:px-8">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-[#3d2e24] rounded-xl p-8 shadow-lg border border-[#C5A059]/30 space-y-6">
              
              {/* دعوة شالية */}
              <div>
                <h3 className="text-2xl font-bold text-[#C5A059] mb-4">دعوة رسمية</h3>
                <p className="text-[#C5A059] text-base leading-relaxed mb-4">
                  إلى أصحاب المقام الرفيع / الكرام
                </p>
                <p className="text-[#C5A059] text-lg font-semibold mb-4">
                  "تية تقدير واعتزاز"
                </p>
                <p className="text-[#C5A059] text-base leading-relaxed mb-4">
                  كل ورحب بفضلكم بانضمامكم إلى قافة عملاء "بوليفارد صنعاء" المختارين. إن اختيارنا لكم هو وسام شرف، ويسعدنا أن تكون معنا في قمتكم القاهرة، لقد تم إعدادها الإهداء الخاص بك في رحلة التميز.
                </p>
                <p className="text-[#C5A059] text-base leading-relaxed mb-4">
                  وعدنا منكم بتقديم أرقى مستويات الخصوصية والفاخرة التي تليق بمقامكم الكريم، وتغطيت تقيية تطلعاتكم في أرقى الفاصيل التي شيعت ووهمكم أمامكم ضيوفكم.
                </p>
                <p className="text-[#C5A059] text-base leading-relaxed mb-4">
                  توجد طاقة خصوصية {'{QR Code}'} يمكنكم من طلب الوصول مباشرة للعروض المعروية المتنوعة التي فصصناها لمقامكم كشركاء للنجاح في بوليفارد صنعاء.
                </p>
                <p className="text-[#C5A059] text-lg font-semibold mb-4">
                  "شطلب استقبالكم وودتكم وإيجازكم إيانا"
                </p>
                <p className="text-[#C5A059] text-base font-bold mb-2">
                  إدارة (بوليفارد صنعاء)
                </p>
                <p className="text-[#C5A059] text-base">
                  زيد مطهر الخاشب
                </p>
              </div>

              <hr className="border-[#C5A059]/30 my-8" />

              {/* النخبة */}
              <div>
                <h3 className="text-2xl font-bold text-[#C5A059] mb-4">منتقى الورد (الرسالة الترحيبية)</h3>
                <p className="text-[#C5A059] text-base leading-relaxed mb-4">
                  كلماتنا المكتوبة البكم هي عهد بالتزامنا بخدمتك بخصوصية تامة، وزفاهية لا تشاوم، وعناية فائقة راقية التفاصيل التي تشيع وتوهمك ودودتك منك مناسبتك حزناً لا تنسيه.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#C5A059] mb-4">هوية النخبة (بطاقة الصفوية)</h3>
                <p className="text-[#C5A059] text-base leading-relaxed mb-4">
                  ليست مجرد بطاقة، بل هي مفتاحك الشخصي للعالم من الامتيازات الصريحة. صممت لتجعل هويتك هويتك كأعضاء دائمين في رزجات بوليفارد صنعاء، والتمتع بصولاً فوراً والتكريم دائماً لقضاياك الاستثنائية لمسة رقمية.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#C5A059] mb-4">بطاقة الثاكرة (العبير الفاخر)</h3>
                <p className="text-[#C5A059] text-base leading-relaxed mb-4">
                  الغطاء المرف هو زاتك العبير التي يستقبلك في أروقة بوليفارد وغرفم الفاخر اختيرت هذه الزيارات المطرية لترطيب بأطيافك لإطاقتك، لتقيم منا صنعت لك من مكان شهود أحلامك بوليفارد صنعاء والتكريم دائماً لقضاياك الاستثنائية لمسة رقمية.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#C5A059] mb-4">رمز الولاء (الميزالية المفضورة)</h3>
                <p className="text-[#C5A059] text-base leading-relaxed mb-4">
                  تحت شعار بوليفارد صنعاء المشفور بروقة، لتكون رفيقك معنا صنعت تقدير منا صنعت لك من مكان شهود أحلامك بوليفارد صنعاء والتكريم دائماً لقضاياك الاستثنائية لمسة رقمية.
                </p>
              </div>

              <hr className="border-[#C5A059]/30 my-8" />

              {/* الشروط والأحكام */}
              <div>
                <h3 className="text-2xl font-bold text-[#C5A059] mb-4">حالات الطوارئ</h3>
                <p className="text-[#C5A059] text-base leading-relaxed mb-4">
                  تم تعريف ملاحظات الطاقة بشكل فوري في إجازات التالية:
                </p>
                <ul className="space-y-4">
                  <li className="text-[#C5A059] text-base leading-relaxed">
                    • <strong>الزفاف شاليه:</strong> في حالة وجود أي أعذار للمشتريات أثناء الفيز سواء للمالك أو الثالث في الفندق وموجود التزام بسيارة فيهما فوراً ما يشير إلى "الشاليات" الفندق عليه.
                  </li>
                  <li className="text-[#C5A059] text-base leading-relaxed">
                    • <strong>الحفلات والمناسبات:</strong> أي حجز شاليه بصفقة بوليفارد صنعاء وحفلات أو بطاقة زيارة في فقاعة المشفع.
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* Images Gallery Section */}
        <section className="py-12 px-4 md:px-8">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-[#3d2e24] rounded-xl p-8 shadow-lg border border-[#C5A059]/30">
              <h2 className="text-3xl font-bold text-[#C5A059] mb-6 text-center">معرض الصور</h2>
              <div className="relative">
                <img
                  src={images[currentImageIndex]}
                  alt="Gallery"
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
                <div className="flex justify-center gap-4 mt-6">
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="bg-[#8B6F47] hover:bg-[#6b5a3a] text-white px-6 py-2 rounded-lg transition-all font-semibold"
                  >
                    السابقة
                  </button>
                  <span className="text-[#C5A059] self-center font-semibold">
                    {currentImageIndex + 1} / {images.length}
                  </span>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                    className="bg-[#8B6F47] hover:bg-[#6b5a3a] text-white px-6 py-2 rounded-lg transition-all font-semibold"
                  >
                    التالية
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-12 px-4 md:px-8">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#3d2e24] rounded-xl p-6 shadow-lg border border-[#C5A059]/30 text-center">
                <p className="text-[#C5A059] font-bold mb-2">الموقع</p>
                <p className="text-[#C5A059]">صنعاء - اليمن</p>
              </div>
              <div className="bg-[#3d2e24] rounded-xl p-6 shadow-lg border border-[#C5A059]/30 text-center">
                <p className="text-[#C5A059] font-bold mb-2">الهاتف</p>
                <p className="text-[#C5A059]">+967 1 234 5678</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
