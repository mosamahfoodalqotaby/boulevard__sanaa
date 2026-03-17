import { useRef } from 'react';
import * as QRCodeLib from 'qrcode.react';
import { Download, Printer, Copy } from 'lucide-react';

const QRCode = (QRCodeLib as any).default || QRCodeLib;

interface CustomerQRCodeGeneratorProps {
  customerId: string;
  customerName: string;
  customerPhone: string;
  bookingId?: string;
  qrCodeValue?: string;
}

export default function CustomerQRCodeGenerator({
  customerId,
  customerName,
  customerPhone,
  bookingId,
  qrCodeValue,
}: CustomerQRCodeGeneratorProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  
  // إنشاء قيمة QR Code من بيانات العميل
  // هذا الباركود سيؤدي إلى صفحة طلب الاسم أولاً
  const qrData = qrCodeValue || `${window.location.origin}/qr-name-input?id=${encodeURIComponent(customerId)}&name=${encodeURIComponent(customerName)}&phone=${encodeURIComponent(customerPhone)}${bookingId ? `&booking=${encodeURIComponent(bookingId)}` : ''}`;

  const handleDownload = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector('canvas');
      if (canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `customer-qr-${customerId}.png`;
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
                <title>QR Code - ${customerName}</title>
                <style>
                  body {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    font-family: 'Amiri', serif;
                    margin: 0;
                    padding: 20px;
                    background: linear-gradient(to bottom, #1e1b1c, #3d2e24);
                  }
                  .container {
                    text-align: center;
                  }
                  h1 {
                    color: #C5A059;
                    margin-bottom: 20px;
                    font-size: 32px;
                  }
                  .qr-container {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                  }
                  img {
                    max-width: 300px;
                    height: auto;
                  }
                  .customer-info {
                    margin-top: 20px;
                    text-align: right;
                    color: #C5A059;
                  }
                  .customer-info p {
                    margin: 8px 0;
                    font-size: 16px;
                  }
                  .instruction {
                    margin-top: 20px;
                    color: #a89968;
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
                  <div class="customer-info">
                    <p><strong>الاسم:</strong> ${customerName}</p>
                    <p><strong>الهاتف:</strong> ${customerPhone}</p>
                    <p><strong>رقم العميل:</strong> ${customerId}</p>
                  </div>
                  <div class="instruction">
                    <p>امسح هذا الرمز للوصول إلى خدماتنا الفاخرة</p>
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
      <div className="bg-[#3d2e24] rounded-xl p-8 shadow-lg border border-[#C5A059]/30">
        <div className="flex flex-col items-center space-y-6">
          {/* QR Code */}
          <div
            ref={qrRef}
            className="p-6 bg-white rounded-lg border-4 border-[#C5A059]"
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

          {/* Customer Info */}
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-[#C5A059]">
              {customerName}
            </h3>
            <p className="text-[#b89447] dir-ltr">{customerPhone}</p>
            <p className="text-sm text-[#a89968]">
              رقم العميل: {customerId}
            </p>
          </div>

          {/* QR Code Info */}
          <div className="bg-[#1e1b1c] rounded-lg p-4 w-full max-w-md border border-[#C5A059]/20">
            <p className="text-sm text-[#a89968] text-center">
              امسح هذا الرمز للوصول إلى خدماتنا الفاخرة والاستمتاع بتجربة مميزة
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-[#6b5a4a] hover:bg-[#7a6a5a] text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          <Download size={18} />
          <span>تحميل</span>
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-[#8b7a6a] hover:bg-[#9a8a7a] text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          <Printer size={18} />
          <span>طباعة</span>
        </button>
        <button
          onClick={handleCopyToClipboard}
          className="flex items-center gap-2 px-4 py-2 bg-[#C5A059] hover:bg-[#b89447] text-[#1e1b1c] font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          <Copy size={18} />
          <span>نسخ الرابط</span>
        </button>
      </div>
    </div>
  );
}
