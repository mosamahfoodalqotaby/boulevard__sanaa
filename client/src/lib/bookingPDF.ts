import html2pdf from 'html2pdf.js';
import QRCode from 'qrcode';

export interface Booking {
  id: string;
  name: string;
  phone: string;
  serviceType: 'chalet' | 'hall' | 'both';
  checkInDate: string;
  eventDate?: string;
  guestCount: number;
  totalPrice?: string;
  paidAmount?: string;
  remainingAmount?: string;
  specialRequests?: string;
  additionalDetails?: string;
  generateQRCode?: boolean;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

// تحويل ملف إلى base64
async function fileToBase64(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve('');
      reader.readAsDataURL(blob);
    });
  } catch {
    return '';
  }
}

export async function printBookingPDF(booking: Booking) {
  try {
    // توليد QR Code
    const qrCodeUrl = `${window.location.origin}/qr-code-scanner?id=${encodeURIComponent(booking.id)}&name=${encodeURIComponent(booking.name)}`;
    
    let qrCodeImage = '';
    if (booking.generateQRCode) {
      qrCodeImage = await QRCode.toDataURL(
        qrCodeUrl,
        {
          errorCorrectionLevel: 'H',
          type: 'image/png',
          width: 250,
          margin: 1,
          color: { dark: '#000000', light: '#FFFFFF' },
        }
      );
    }

    // تحويل الشعار والخطوط إلى base64 لضمان ظهورهما في PDF
    const logoBase64 = await fileToBase64('/logo-gold.png');
    // تحميل خط Cairo من CDN
    const cairoRegularBase64 = await fileToBase64('https://d2xsxph8kpxj0f.cloudfront.net/310519663380986397/ALmxfXzXdGwygXSTLhzNJo/Cairo-Regular_e0244124.ttf');
    const cairoBoldBase64 = await fileToBase64('https://d2xsxph8kpxj0f.cloudfront.net/310519663380986397/ALmxfXzXdGwygXSTLhzNJo/Cairo-Bold_04b1eaa6.ttf');

    // تضمين خط Cairo مباشرة كـ base64 لضمان الربط الصحيح للحروف العربية
    const fontFaceCSS = `
      @font-face {
        font-family: 'Cairo';
        font-weight: 400;
        font-style: normal;
        src: url('${cairoRegularBase64}') format('truetype');
      }
      @font-face {
        font-family: 'Cairo';
        font-weight: 700;
        font-style: normal;
        src: url('${cairoBoldBase64}') format('truetype');
      }
    `;

    const fontFamily = "'Cairo', Arial, Tahoma, sans-serif";

    // بناء صفحة الفاتورة بالتصميم الجديد
    const invoicePageHTML = `
      <div style="width:210mm;min-height:296mm;padding:15mm 20mm;background:#1e1b1c;position:relative;direction:rtl;font-family:${fontFamily};color:#d4a574;box-sizing:border-box;">
        <!-- الشعار في الأعلى - مكبر -->
        <div style="text-align:center;margin-bottom:20px;padding-top:5mm;">
          ${logoBase64 ? `<img src="${logoBase64}" alt="Logo" style="width:180px;height:180px;object-fit:contain;display:inline-block;" />` : ''}
        </div>
        
        <!-- خط فاصل زخرفي -->
        <div style="border-bottom:1px dashed rgba(197,160,89,0.5);margin:10px 0 25px 0;"></div>

        <!-- جدول البيانات الرئيسي -->
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;font-size:13px;direction:rtl;">
          <!-- صف 1: الاسم والمحترم -->
          <tr>
            <td style="text-align:right;width:20%;color:#C5A059;font-weight:bold;padding:0 0 8px 0;border:none;">الاسم/</td>
            <td style="text-align:center;border-bottom:1px dashed rgba(197,160,89,0.4);padding:0 10px 8px 10px;color:#d4a574;font-weight:bold;flex:1;">${booking.name || ""}</td>
            <td style="text-align:left;width:20%;color:#d4a574;padding:0 0 8px 0;border:none;">المحترم</td>
          </tr>
     <tr>
  <td style="text-align:right;width:15%;color:#C5A059;font-weight:bold;padding:0 0 8px 0;border:none;">
    تاريخ الحجز/
  </td>

  <td style="text-align:center;width:35%;border-bottom:1px dashed rgba(197,160,89,0.4);padding:0 10px 8px 10px;color:#d4a574;font-weight:bold;">
    ${booking.checkInDate || ""}
  </td>

  <td style="text-align:right;width:15%;color:#C5A059;font-weight:bold;padding:0 0 8px 0;border:none;">
    تاريخ المناسبة/
  </td>

  <td style="text-align:center;width:35%;border-bottom:1px dashed rgba(197,160,89,0.4);padding:0 10px 8px 10px;color:#d4a574;font-weight:bold;">
    ${booking.eventDate || ""}
  </td>
</tr>
          <!-- صف 4: المبلغ المدفوع -->
          <tr>
            <td style="text-align:right;width:20%;color:#C5A059;font-weight:bold;padding:0 0 8px 0;border:none;">المبلغ المدفوع/</td>
            <td style="text-align:center;border-bottom:1px dashed rgba(197,160,89,0.4);padding:0 10px 8px 10px;color:#d4a574;font-weight:bold;">${booking.paidAmount || "0"} ريال</td>
            <td style="text-align:left;width:20%;padding:0 0 8px 0;border:none;"></td>
          </tr>

          <!-- صف 5: المبلغ المتبقي -->
          <tr>
            <td style="text-align:right;width:20%;color:#C5A059;font-weight:bold;padding:0 0 8px 0;border:none;">المبلغ المتبقي/</td>
            <td style="text-align:center;border-bottom:1px dashed rgba(197,160,89,0.4);padding:0 10px 8px 10px;color:#d4a574;font-weight:bold;">${booking.remainingAmount || "0"} ريال</td>
            <td style="text-align:left;width:20%;padding:0 0 8px 0;border:none;"></td>
          </tr>

          <!-- صف 6: تفاصيل اضافية -->
          <tr>
            <td style="text-align:right;width:20%;color:#C5A059;font-weight:bold;padding:0 0 8px 0;border:none;">تفاصيل اضافية/</td>
            <td style="text-align:center;border-bottom:1px dashed rgba(197,160,89,0.4);padding:0 10px 8px 10px;color:#d4a574;word-break:break-word;max-width:300px;">${booking.additionalDetails || booking.specialRequests || ""}</td>
            <td style="text-align:left;width:20%;padding:0 0 8px 0;border:none;"></td>
          </tr>
        </table>

        <!-- خط فاصل زخرفي -->
        <div style="border-bottom:1px dashed rgba(197,160,89,0.5);margin:15px 0 20px 0;"></div>

        <!-- شروط وأحكام الحجز -->
        <div style="margin-bottom:20px;">
          <div style="font-size:14px;font-weight:bold;color:#C5A059;margin-bottom:12px;text-align:center;font-family:${fontFamily};">شروط وأحكام الحجز</div>
          <ul style="font-size:14px;color:#9d8b6f;line-height:2;text-align:right;direction:rtl;padding-right:20px;margin:0;">
            <li style="margin-bottom:10px;"><strong style="color:#C5A059;">تأكيد الحجز:</strong> يعد العربون تأكيداً نهائياً للحجز لضمان حصرية المرفق لكم في التاريخ المحدد، ولا يسترد إلا في حال وجود بديل. لضمان استمرارية تشغيل المرفق وفق أعلى المعايير.</li>
            <li style="margin-bottom:10px;"><strong style="color:#C5A059;">اكتمال الإجراءات:</strong> لضمان تجربة متكاملة بلا انقطاع، يرجى سداد كامل مبلغ الحجز وتأمين السلامة قبل موعد الدخول.</li>
            <li style="margin-bottom:10px;"><strong style="color:#C5A059;">سلامة المرفق:</strong> يعد الضيف مسؤولاً عن سلامة وتجهيزات المرفق (الأثاث، المسبح، المساحات الخضراء). ويتم تغطية أي تلفيات ناتجة عن سوء الاستخدام، مع الالتزام بسداد الفارق إن وجد.</li>
            <li style="margin-bottom:10px;"><strong style="color:#C5A059;">الهوية والخصوصية:</strong> حرصاً على أمن وخصوصية جميع ضيوفنا، يرجى إبراز الهوية الشخصية عند الدخول، وتسليم قائمة بأسماء الضيوف مسبقاً. مع العلم أن أي عدد إضافي يتجاوز السعة المقررة يخضع لرسوم إضافية بقيمة (4000 ريال) للفرد.</li>
            <li style="margin-bottom:10px;"><strong style="color:#C5A059;">بروتوكول الصوت:</strong> لضمان سكينة المنطقة وخصوصية الجيران، يسمح باستخدام نظام صوتي محدد (سماعتين فقط)، وتقفل السماعات الخارجية عند الساعة 9:00 مساءً لمناسبات النساء و12:00 ليلاً لمناسبات الرجال، مع الالتزام بوضع السماعات في الأماكن المخصصة.</li>
            <li style="margin-bottom:10px;"><strong style="color:#C5A059;">ميثاق السكينة (الممنوعات):</strong> يمنع منعاً باتاً استخدام الأسلحة النارية، أو (الفشفيش). كما يمنع تثبيت أي زينة قد تترك أثراً على الجدران أو التجهيزات، حفاظاً على جمالية المرفق لضيوفنا القادمين.</li>
            <li style="margin-bottom:10px;"><strong style="color:#C5A059;">إخلاء المسؤولية:</strong> تخلي إدارة "بوليفارد صنعاء" مسؤوليتها عن فقدان المقتنيات الشخصية أو أي إصابات ناتجة عن حوادث المسبح أو سوء التصرف داخل القاعة.</li>
          </ul>
        </div>

        <!-- التذييل -->
        <div style="position:absolute;bottom:10mm;left:20mm;right:20mm;text-align:center;font-size:9px;color:#C5A059;border-top:1px solid rgba(197,160,89,0.3);padding-top:8px;">Boulevard Sana'a | بوليفارد صنعاء</div>
      </div>
    `;

    // صفحة الباركود (فقط إذا تم اختيار توليد الباركود)
    const barcodePageHTML = (booking.generateQRCode && qrCodeImage) ? `
      <div style="width:210mm;min-height:296mm;padding:20mm;background:#1e1b1c;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;direction:rtl;font-family:${fontFamily};color:#d4a574;box-sizing:border-box;page-break-before:always;">
        <!-- الشعار في صفحة الباركود -->
          <div style="text-align:center;margin-bottom:20px;padding-top:5mm;">
          ${logoBase64 ? `<img src="${logoBase64}" alt="Logo" style="width:180px;height:180px;object-fit:contain;display:inline-block;" />` : ''}
        </div>
        <!-- خط زخرفي -->
        <div style="display:flex;align-items:center;width:70%;margin:10px 0 20px 0;">
          <div style="flex:1;height:1px;background:linear-gradient(to left,transparent,#C5A059);"></div>
          <div style="margin:0 12px;font-size:10px;color:#C5A059;">&#9830;</div>
          <div style="flex:1;height:1px;background:linear-gradient(to right,transparent,#C5A059);"></div>
        </div>
        <!-- عنوان QR Code -->
        <div style="font-size:16px;font-weight:bold;color:#C5A059;text-align:center;margin-bottom:20px;font-family:${fontFamily};">رمز الاستجابة السريعة للحجز</div>
        <!-- QR Code -->
        <div style="border:3px solid #C5A059;padding:15px;background:#1e1b1c;display:inline-flex;align-items:center;justify-content:center;">
          <div style="background:white;padding:10px;display:inline-flex;align-items:center;justify-content:center;">
            <img src="${qrCodeImage}" alt="QR Code" style="width:240px;height:240px;display:block;" />
          </div>
        </div>
        <!-- معلومات الحجز -->
        <div style="text-align:center;margin-top:22px;font-size:11px;color:#C5A059;">
          ${booking.id ? `<div style="margin-bottom:6px;"><span style="font-weight:bold;">رقم الحجز:</span> ${booking.id}</div>` : ''}
          ${booking.name ? `<div style="margin-bottom:6px;"><span style="font-weight:bold;">اسم الضيف:</span> ${booking.name}</div>` : ''}
          ${booking.checkInDate ? `<div style="margin-bottom:6px;"><span style="font-weight:bold;">تاريخ الحجز:</span> ${booking.checkInDate}</div>` : ''}
        </div>
        <div style="text-align:center;margin-top:18px;font-size:9px;color:#C5A059;max-width:80%;">امسح رمز الاستجابة السريعة للوصول إلى تفاصيل حجزك والاستمتاع بالامتيازات الحصرية</div>
        <!-- التذييل -->
        <div style="position:absolute;bottom:15mm;left:20mm;right:20mm;text-align:center;font-size:8px;color:#C5A059;border-top:1px solid rgba(197,160,89,0.3);padding-top:6px;">Boulevard Sana'a | بوليفارد صنعاء</div>
      </div>
    ` : '';

    // بناء HTML الكامل مع تضمين الخط
    const fullHTML = `
      <div style="font-family:${fontFamily};">
        <style>
          ${fontFaceCSS}
          body { font-family: ${fontFamily}; }
          strong { color: #C5A059; }
          ul { list-style-position: inside; }
          li { text-align: right; }
        </style>
        ${invoicePageHTML}
        ${booking.generateQRCode ? barcodePageHTML : ''}
      </div>
    `;

    // إنشاء عنصر DOM مرئي مؤقتاً لتوليد PDF
    const wrapper = document.createElement('div');
    wrapper.innerHTML = fullHTML;
    wrapper.style.position = 'fixed';
    wrapper.style.left = '0';
    wrapper.style.top = '0';
    wrapper.style.zIndex = '-9999';
    wrapper.style.opacity = '0';
    wrapper.style.pointerEvents = 'none';
    document.body.appendChild(wrapper);

    // انتظار تحميل الصور والخط
    const images = wrapper.querySelectorAll('img');
    await Promise.all(Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
    }));

    // انتظار تحميل خط Google
    try {
      await document.fonts.ready;
    } catch {}

    // انتظار للتأكد من الرسم وتحميل الخط
    await new Promise(resolve => setTimeout(resolve, 1200));

    const contentEl = wrapper.firstElementChild as HTMLElement;

    const opt = {
      margin: 0,
      filename: `booking-${booking.id}.pdf`,
      image: { type: 'png' as const, quality: 0.92 },
      html2canvas: { 
        scale: 1.5, 
        backgroundColor: '#1e1b1c', 
        useCORS: true,
        logging: false,
        width: contentEl ? contentEl.scrollWidth : undefined,
        height: contentEl ? contentEl.scrollHeight : undefined,
      },
      jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
      pagebreak: { mode: ['avoid-all'] as string[] }
    };

    await (html2pdf() as any).set(opt).from(contentEl).save();
    
    // تنظيف
    document.body.removeChild(wrapper);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('حدث خطأ في إنشاء الفاتورة. يرجى المحاولة مرة أخرى.');
  }
}