import { useRef } from 'react';
import * as QRCodeLib from 'qrcode.react';
import { Download, Printer, Copy } from 'lucide-react';

const QRCode = (QRCodeLib as any).default || QRCodeLib;

interface QRCodeGeneratorProps {
  visitorId: string;
  visitorName: string;
  visitorPhone: string;
  qrCodeValue?: string;
}

export default function QRCodeGenerator({
  visitorId,
  visitorName,
  visitorPhone,
  qrCodeValue,
}: QRCodeGeneratorProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  
  // إنشاء قيمة QR Code من بيانات الزائر
  const qrData = qrCodeValue || `https://boulevard-sanaa.com/visitor/${visitorId}?name=${encodeURIComponent(visitorName)}&phone=${visitorPhone}`;

  const handleDownload = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector('canvas');
      if (canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `qr-code-${visitorId}.png`;
        link.click();
      }
    }
  };

  const handlePrint = () => {
    if (qrRef.current) {
      const printWindow = window.open('', '', 'width=400,height=500');
      if (printWindow) {
        const canvas = qrRef.current.querySelector('canvas');
        if (canvas) {
          printWindow.document.write(`
            <html>
              <head>
                <title>QR Code - ${visitorName}</title>
                <style>
                  body {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                  }
                  .container {
                    text-align: center;
                  }
                  h1 {
                    color: #d97706;
                    margin-bottom: 20px;
                  }
                  .qr-container {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                  }
                  img {
                    max-width: 300px;
                    height: auto;
                  }
                  .visitor-info {
                    margin-top: 20px;
                    text-align: right;
                  }
                  .visitor-info p {
                    margin: 5px 0;
                    font-size: 14px;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <h1>بوليفارد صنعاء</h1>
                  <div class="qr-container">
                    <img src="${canvas.toDataURL('image/png')}" alt="QR Code" />
                  </div>
                  <div class="visitor-info">
                    <p><strong>الاسم:</strong> ${visitorName}</p>
                    <p><strong>الهاتف:</strong> ${visitorPhone}</p>
                    <p><strong>رقم الزائر:</strong> ${visitorId}</p>
                  </div>
                </div>
              </body>
            </html>
          `);
          printWindow.document.close();
          setTimeout(() => printWindow.print(), 250);
        }
      }
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(qrData);
    alert('تم نسخ رابط QR Code');
  };

  return (
    <div className="space-y-6">
      {/* QR Code Display */}
      <div className="bg-white dark:bg-[#1e1b1c] rounded-xl p-8 shadow-lg">
        <div className="flex flex-col items-center space-y-6">
          {/* QR Code */}
          <div
            ref={qrRef}
            className="p-6 bg-white rounded-lg border-4 border-[#6b5a4a]"
          >
            <QRCode as any
              value={qrData}
              size={256}
              level="H"
              includeMargin={true}
              fgColor="#000000"
              bgColor="#ffffff"
            />
          </div>

          {/* Visitor Info */}
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {visitorName}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 dir-ltr">{visitorPhone}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              رقم الزائر: {visitorId}
            </p>
          </div>

          {/* QR Code Info */}
          <div className="bg-[#3d2e24] dark:bg-[#3d2e24]/20 rounded-lg p-4 w-full max-w-md">
            <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
              امسح هذا الرمز للوصول إلى معلوماتك وخدماتنا الفاخرة
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          <Download size={18} />
          <span>تحميل</span>
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          <Printer size={18} />
          <span>طباعة</span>
        </button>
        <button
          onClick={handleCopyToClipboard}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          <Copy size={18} />
          <span>نسخ الرابط</span>
        </button>
      </div>
    </div>
  );
}
