import { useState, useRef } from 'react';
import { Download, Printer, ArrowLeft, ArrowRight } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { QRCodeSVG } from 'qrcode.react';

export default function VisitorQRCode() {
  const [visitorData, setVisitorData] = useState({
    name: '',
    phone: '',
  });
  const [generatedQR, setGeneratedQR] = useState(false);
  const [visitorId] = useState(`VIS-${Date.now()}`);

  const handleGenerateQR = (e: React.FormEvent) => {
    e.preventDefault();
    if (visitorData.name && visitorData.phone) {
      setGeneratedQR(true);
    }
  };

  const handleReset = () => {
    setVisitorData({ name: '', phone: '' });
    setGeneratedQR(false);
  };

  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownloadQR = () => {
    const element = qrRef.current?.querySelector('canvas') as HTMLCanvasElement;
    if (element) {
      const link = document.createElement('a');
      link.href = element.toDataURL('image/png');
      link.download = `qr-${visitorData.name}.png`;
      link.click();
    }
  };

  const handlePrintQR = () => {
    const printWindow = window.open('', '', 'height=400,width=600');
    if (printWindow && qrRef.current) {
      const element = qrRef.current.querySelector('canvas') as HTMLCanvasElement;
      if (element) {
        const img = element.toDataURL('image/png');
        printWindow.document.write(`
          <html>
            <head><title>طباعة QR Code</title></head>
            <body style="text-align: center; padding: 20px;">
              <h1>${visitorData.name}</h1>
              <img src="${img}" style="width: 300px; height: 300px;" />
              <p>${visitorData.phone}</p>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e1b1c] via-[#3d2e24] to-[#1e1b1c]">
      <Sidebar />
      <WhatsAppButton phoneNumber="23456789" message="مرحبا بك في بوليفارد صنعاء! كيف يمكنني مساعدتك؟" />

      <main className="md:ml-64 pb-24">
        {/* Header */}
        <section className="pt-20 pb-12 px-4 md:px-8 bg-gradient-to-r from-yellow-500 to-yellow-600">
          <div className="container mx-auto max-w-4xl text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              رمز QR الشخصي
            </h1>
            <p className="text-xl text-yellow-50">
              احصل على رمز QR فريد يحتوي على بياناتك الشخصية
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 px-4 md:px-8">
          <div className="container mx-auto max-w-4xl">
            {!generatedQR ? (
              // Registration Form
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  أدخل بياناتك الشخصية
                </h2>
                <form onSubmit={handleGenerateQR} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      الاسم الكامل
                    </label>
                    <input
                      type="text"
                      value={visitorData.name}
                      onChange={(e) =>
                        setVisitorData({ ...visitorData, name: e.target.value })
                      }
                      placeholder="أدخل اسمك الكامل"
                      className="w-full px-4 py-3 border border-yellow-200 dark:border-yellow-900 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      value={visitorData.phone}
                      onChange={(e) =>
                        setVisitorData({ ...visitorData, phone: e.target.value })
                      }
                      placeholder="أدخل رقم هاتفك"
                      className="w-full px-4 py-3 border border-yellow-200 dark:border-yellow-900 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <p className="text-sm text-blue-900 dark:text-blue-100">
                      <strong>ملاحظة:</strong> سيتم إنشاء رمز QR فريد يحتوي على بياناتك الشخصية. يمكنك تحميل أو طباعة الرمز لاستخدامه لاحقاً.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-[#6b5a4a] hover:to-yellow-700 text-white font-bold rounded-lg transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>إنشاء رمز QR</span>
                    <ArrowRight size={20} />
                  </button>
                </form>
              </div>
            ) : (
              // QR Code Display
              <div className="bg-slate-800 rounded-xl p-8 shadow-2xl border border-yellow-600/30">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-[#C5A059] mb-6">
                    QR Code الخاص بك
                  </h2>

                  <div ref={qrRef} className="flex justify-center mb-8 p-6 bg-white rounded-lg">
                    <QRCodeSVG
                      value={JSON.stringify({
                        name: visitorData.name,
                        phone: visitorData.phone,
                        timestamp: new Date().toISOString(),
                      })}
                      size={256}
                      level="H"
                      includeMargin={true}
                    />
                  </div>

                  <div className="mb-6 p-4 bg-[#6b5a4a]/20 rounded-lg">
                    <p className="text-[#C5A059] font-semibold">{visitorData.name}</p>
                    <p className="text-gray-300">{visitorData.phone}</p>
                  </div>

                  <div className="flex gap-4 mb-6">
                    <button
                      onClick={handleDownloadQR}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
                    >
                      <Download size={20} />
                      <span>تحميل</span>
                    </button>
                    <button
                      onClick={handlePrintQR}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all"
                    >
                      <Printer size={20} />
                      <span>طباعة</span>
                    </button>
                  </div>

                  <button
                    onClick={handleReset}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-all"
                  >
                    <ArrowLeft size={20} />
                    <span>إنشاء QR Code جديد</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>


      </main>

      <Footer />
    </div>
  );
}
