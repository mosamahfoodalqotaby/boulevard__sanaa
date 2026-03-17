import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Contact() {
  const socialLinks = [
    { icon: Facebook, label: 'Facebook', url: 'https://www.facebook.com/share/1CPvnCx7m2/', color: 'hover:text-blue-500' },
    { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/boulevardsanaa?igsh=Yzl5MzU3d3BjdmVo', color: 'hover:text-pink-500' },
    { icon: MessageCircle, label: 'WhatsApp', url: 'https://wa.me/967784442228', color: 'hover:text-green-500' },
    { icon: MapPin, label: 'الموقع', url: 'https://maps.app.goo.gl/Vg3cbhDDHSeBNdEq7?g_st=aw', color: 'hover:text-yellow-500' },
  ];

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">تواصل معنا</h1>
            <p className="text-xl text-yellow-50">
              نحن هنا للإجابة على جميع استفساراتك
            </p>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-12 px-4 md:px-8">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Phone */}
              <div className="bg-[#1e1b1c] rounded-xl p-6 shadow-2xl border border-yellow-600/30 text-center">
                <div className="w-12 h-12 bg-[#6b5a4a] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#C5A059] mb-2">الهاتف</h3>
                <p className="text-gray-300 dir-ltr">+967 1 234 5678</p>
                <p className="text-gray-400 text-sm mt-1">متاح 24/7</p>
              </div>

              {/* Email */}
              <div className="bg-[#1e1b1c] rounded-xl p-6 shadow-2xl border border-yellow-600/30 text-center">
                <div className="w-12 h-12 bg-[#6b5a4a] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#C5A059] mb-2">البريد الإلكتروني</h3>
                <p className="text-gray-300 dir-ltr">info@boulevard-sanaa.com</p>
                <p className="text-gray-400 text-sm mt-1">نرد خلال 24 ساعة</p>
              </div>

              {/* Location */}
              <div className="bg-[#1e1b1c] rounded-xl p-6 shadow-2xl border border-yellow-600/30 text-center">
                <div className="w-12 h-12 bg-[#6b5a4a] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#C5A059] mb-2">الموقع</h3>
                <p className="text-gray-300">صنعاء - اليمن</p>
                <p className="text-gray-400 text-sm mt-1">الحي الراقي</p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="py-12 px-4 md:px-8 bg-[#1e1b1c]/50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-[#C5A059] mb-8 text-center">
              تابعنا على وسائل التواصل
            </h2>
            <div className="flex justify-center gap-6 flex-wrap">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-16 h-16 bg-[#1e1b1c] rounded-lg flex items-center justify-center border border-yellow-600/30 hover:border-[#6b5a4a] transition-all ${social.color} text-gray-300`}
                    title={social.label}
                  >
                    <Icon size={28} />
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-12 px-4 md:px-8">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold text-[#C5A059] mb-8 text-center">
              أرسل لنا رسالة
            </h2>
            <div className="bg-[#1e1b1c] rounded-xl p-8 shadow-2xl border border-yellow-600/30">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#C5A059] mb-2">
                      الاسم
                    </label>
                    <input
                      type="text"
                      placeholder="أدخل اسمك"
                      className="w-full px-4 py-3 border border-yellow-600/50 rounded-lg bg-[#1e1b1c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#C5A059] mb-2">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      placeholder="أدخل بريدك"
                      className="w-full px-4 py-3 border border-yellow-600/50 rounded-lg bg-[#1e1b1c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#C5A059] mb-2">
                    الموضوع
                  </label>
                  <input
                    type="text"
                    placeholder="موضوع الرسالة"
                    className="w-full px-4 py-3 border border-yellow-600/50 rounded-lg bg-[#1e1b1c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#C5A059] mb-2">
                    الرسالة
                  </label>
                  <textarea
                    placeholder="أدخل رسالتك هنا..."
                    rows={6}
                    className="w-full px-4 py-3 border border-yellow-600/50 rounded-lg bg-[#1e1b1c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1e1b1c] hover:from-yellow-700 hover:to-yellow-600 text-slate-900 font-bold rounded-lg transition-all duration-300 active:scale-95 shadow-lg"
                >
                  أرسل الرسالة
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-12 px-4 md:px-8 bg-[#1e1b1c]/50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-[#C5A059] mb-8 text-center">
              روابط سريعة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="#" className="p-4 bg-[#1e1b1c] rounded-lg border border-yellow-600/30 hover:border-[#6b5a4a] transition-all text-[#C5A059] font-semibold hover:text-yellow-300">
                → احجز الآن
              </a>
              <a href="/about" className="p-4 bg-[#1e1b1c] rounded-lg border border-yellow-600/30 hover:border-[#6b5a4a] transition-all text-[#C5A059] font-semibold hover:text-yellow-300">
                → عن بوليفارد
              </a>
              <a href="#" className="p-4 bg-[#1e1b1c] rounded-lg border border-yellow-600/30 hover:border-[#6b5a4a] transition-all text-[#C5A059] font-semibold hover:text-yellow-300">
                → الأسعار
              </a>
              <a href="#" className="p-4 bg-[#1e1b1c] rounded-lg border border-yellow-600/30 hover:border-[#6b5a4a] transition-all text-[#C5A059] font-semibold hover:text-yellow-300">
                → الشروط والأحكام
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
