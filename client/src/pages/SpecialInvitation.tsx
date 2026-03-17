import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit2, Download, X, MessageCircle, Phone, Send } from 'lucide-react';

interface InvitationData {
  customerName: string;
  customerTitle: string;
  eventDate: string;
  eventDateHijri: string;
  mainText: string;
  closingText: string;
  companyName: string;
}

const defaultInvitation: InvitationData = {
  customerName: 'الكرام',
  customerTitle: 'إلى أصحاب المقام الرفيع',
  eventDate: '2026-04-10',
  eventDateHijri: '1447/9/15',
  mainText: 'بكل تقدير واعتزاز، يتشرف "بوليفارد صنعاء" بدعوتكم لمشاركتنا في عيد الفطر المبارك في رحاب صرحنا الاستثنائي. حضوركم يضفي على المكان بريقاً خاصاً، ويسعدنا أن تكونوا في يوم مميز نُخصصه لمقامكم الرفيع.',
  closingText: 'نتطلع بشوق لاستقبالكم\nإدارة بوليفارد صنعاء',
  companyName: 'بوليفارد صنعاء',
};

export default function SpecialInvitation() {
  const [invitation, setInvitation] = useState<InvitationData>(defaultInvitation);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState<InvitationData>(defaultInvitation);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('967');

  const handleEditChange = (field: keyof InvitationData, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = () => {
    setInvitation(editData);
    setIsEditOpen(false);
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('invitation-content');
    if (!element) return;

    const html2pdf = (window as any).html2pdf;
    if (!html2pdf) {
      alert('مكتبة PDF غير محملة');
      return;
    }

    // Create a clone of the element with all computed styles
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.margin = '0';
    clone.style.padding = '48px';
    clone.style.minHeight = 'auto';
    
    // Apply all styles from the original element
    const computedStyle = window.getComputedStyle(element);
    clone.style.background = computedStyle.background || '#1e1b1c';
    clone.style.color = computedStyle.color || '#C5A059';
    clone.style.fontFamily = 'Arial, sans-serif';
    clone.style.direction = 'rtl';
    clone.style.textAlign = 'right';
    clone.style.lineHeight = '1.6';

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `دعوة-استضافة-${new Date().getTime()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#1e1b1c'
      },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
    };

    html2pdf().set(opt).from(clone).save();
  };

  const getWhatsAppMessage = () => {
    return `

${invitation.customerTitle}
${invitation.customerName}

${invitation.mainText}

📅 موعدنا معكم يوم:
${new Date(invitation.eventDate).toLocaleDateString('ar-SA', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})}

الموافق بتاريخ: ${invitation.eventDateHijri}

${invitation.closingText}

© ${new Date().getFullYear()} ${invitation.companyName}
    `.trim();
  };

  const handleSendWhatsApp = () => {
    const message = getWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSendWhatsAppToNumber = () => {
    if (!phoneNumber.trim()) {
      alert('الرجاء إدخال رقم الهاتف');
      return;
    }
    // تنظيف الرقم من أي رموز غير رقمية
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    const fullNumber = `${countryCode}${cleanNumber}`;
    const message = getWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${fullNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePrint = () => {
    const element = document.getElementById('invitation-content');
    if (!element) return;

    const printWindow = window.open('', '', 'width=1200,height=800');
    if (!printWindow) return;

    // Get all styles from the element
    const computedStyle = window.getComputedStyle(element);
    const backgroundColor = computedStyle.backgroundColor || '#1e1b1c';
    const color = computedStyle.color || 'rgb(212, 165, 116)';

    const html = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>دعوة استضافة خاصة</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            html, body {
              width: 100%;
              height: 100%;
              direction: rtl;
              text-align: right;
            }
            
            body {
              font-family: 'Arial', 'Segoe UI', sans-serif;
              background: ${backgroundColor};
              color: ${color};
              padding: 0;
              margin: 0;
            }
            
            .invitation-container {
              width: 100%;
              min-height: 100vh;
              background: linear-gradient(to bottom, #1e1b1c, #1e1b1c);
              color: rgb(212, 165, 116);
              padding: 48px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              direction: rtl;
              text-align: right;
            }
            
            .header-section {
              text-align: center;
              margin-bottom: 32px;
            }
            
            .emoji {
              font-size: 48px;
              margin-bottom: 16px;
            }
            
            .main-title {
              font-size: 32px;
              font-weight: bold;
              color: rgb(253, 224, 71);
              margin-bottom: 16px;
            }
            
            .subtitle {
              font-size: 18px;
              color: rgb(191, 144, 0);
              margin-bottom: 16px;
            }
            
            .customer-name {
              font-size: 28px;
              font-weight: bold;
              color: rgb(253, 224, 71);
              margin-top: 16px;
            }
            
            .divider {
              height: 1px;
              background: linear-gradient(to right, transparent, rgb(253, 224, 71), transparent);
              margin: 24px 0;
            }
            
            .main-content {
              flex: 1;
              margin: 32px 0;
              text-align: center;
            }
            
            .main-text {
              font-size: 16px;
              line-height: 1.8;
              color: rgb(191, 144, 0);
              white-space: pre-wrap;
              word-wrap: break-word;
            }
            
            .date-section {
              text-align: center;
              margin: 32px 0;
              border-top: 1px solid rgba(253, 224, 71, 0.3);
              border-bottom: 1px solid rgba(253, 224, 71, 0.3);
              padding: 16px 0;
            }
            
            .date-label {
              color: rgb(191, 144, 0);
              margin-bottom: 8px;
            }
            
            .date-value {
              font-size: 24px;
              font-weight: bold;
              color: rgb(253, 224, 71);
              margin-bottom: 16px;
            }
            
            .hijri-date {
              color: rgb(191, 144, 0);
            }
            
            .closing-section {
              text-align: center;
            }
            
            .closing-text {
              font-size: 16px;
              line-height: 1.8;
              color: rgb(191, 144, 0);
              white-space: pre-wrap;
              word-wrap: break-word;
            }
            
            .footer {
              text-align: center;
              margin-top: 32px;
              font-size: 14px;
              color: rgb(253, 224, 71);
            }
            
            @media print {
              body {
                margin: 0;
                padding: 0;
                background: ${backgroundColor};
              }
              .invitation-container {
                padding: 48px;
                min-height: 100vh;
              }
            }
          </style>
        </head>
        <body>
          <div class="invitation-container">
            <div class="header-section">
              <div src="/logo.png" alt="Logo" class="logo"></div>
              <h2 class="main-title">دعوة استضافة خاصة</h2>
              <p class="subtitle">${invitation.customerTitle}</p>
              <p class="customer-name">${invitation.customerName}</p>
            </div>
            
            <div class="divider"></div>
            
            <div class="main-content">
              <p class="main-text">${invitation.mainText}</p>
            </div>
            
            <div class="date-section">
              <p class="date-label">موعدنا معكم يوم:</p>
              <p class="date-value">${new Date(invitation.eventDate).toLocaleDateString('ar-SA', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</p>
              <p class="hijri-date">الموافق بتاريخ: ${invitation.eventDateHijri}</p>
            </div>
            
            <div class="divider"></div>
            
            <div class="closing-section">
              <p class="closing-text">${invitation.closingText}</p>
            </div>
            
            <div class="footer">
              <p>© ${new Date().getFullYear()} ${invitation.companyName}</p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(html);
    printWindow.document.close();
    
    // Wait for content to load before printing
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#1e1b1c] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">دعوة الاستضافة الخاصة</h1>
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="lg" className="gap-2">
                <Edit2 className="w-4 h-4" />
                تعديل النصوص
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>تعديل نصوص الدعوة</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">اسم العميل</label>
                  <Input
                    value={editData.customerName}
                    onChange={(e) => handleEditChange('customerName', e.target.value)}
                    placeholder="اسم العميل"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">عنوان الدعوة</label>
                  <Input
                    value={editData.customerTitle}
                    onChange={(e) => handleEditChange('customerTitle', e.target.value)}
                    placeholder="عنوان الدعوة"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">التاريخ الميلادي</label>
                    <Input
                      type="date"
                      value={editData.eventDate}
                      onChange={(e) => handleEditChange('eventDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">التاريخ الهجري</label>
                    <Input
                      value={editData.eventDateHijri}
                      onChange={(e) => handleEditChange('eventDateHijri', e.target.value)}
                      placeholder="1447/9/15"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">نص الدعوة الرئيسي</label>
                  <Textarea
                    value={editData.mainText}
                    onChange={(e) => handleEditChange('mainText', e.target.value)}
                    placeholder="نص الدعوة"
                    rows={6}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">نص الختام والشكر</label>
                  <Textarea
                    value={editData.closingText}
                    onChange={(e) => handleEditChange('closingText', e.target.value)}
                    placeholder="نص الختام"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">اسم الشركة</label>
                  <Input
                    value={editData.companyName}
                    onChange={(e) => handleEditChange('companyName', e.target.value)}
                    placeholder="اسم الشركة"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleSaveEdit} className="bg-amber-600 hover:bg-amber-700">
                    حفظ التعديلات
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Invitation Preview */}
        <Card className="bg-[#1e1b1c] border-amber-600/30 overflow-hidden">
          <div
            id="invitation-content"
            dir="rtl"
            className="bg-[#1e1b1c] p-12 text-amber-100 min-h-screen flex flex-col justify-between"
          >
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="text-4xl font-bold text-amber-400 mb-2">✨</div>
              <h2 className="text-3xl font-bold text-amber-300 mb-2">دعوة استضافة خاصة</h2>
              <p className="text-lg text-amber-200">{invitation.customerTitle}</p>
              <p className="text-2xl font-bold text-amber-300 mt-2">{invitation.customerName}</p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent my-6"></div>

            {/* Main Content Section */}
            <div className="flex-1 my-8">
              <p className="text-center text-lg leading-relaxed whitespace-pre-wrap">
                {invitation.mainText}
              </p>
            </div>

            {/* Date Section */}
            <div className="text-center my-8 border-t border-b border-amber-400/30 py-4">
              <p className="text-amber-200 mb-2">موعدنا معكم يوم:</p>
              <p className="text-2xl font-bold text-amber-300 mb-4">
                {new Date(invitation.eventDate).toLocaleDateString('ar-SA', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-amber-200">الموافق بتاريخ: {invitation.eventDateHijri}</p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent my-6"></div>

            {/* Closing Section */}
            <div className="text-center">
              <p className="text-lg leading-relaxed whitespace-pre-wrap text-amber-200">
                {invitation.closingText}
              </p>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 text-sm text-amber-300">
              <p>© {new Date().getFullYear()} {invitation.companyName}</p>
            </div>
          </div>
        </Card>

        {/* WhatsApp Send Section */}
        <Card className="mt-6 bg-[#1e1b1c]/80 border-green-600/30 p-5">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-bold text-green-400">إرسال الدعوة عبر WhatsApp</h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end" dir="ltr">
            <div className="flex-shrink-0">
              <label className="block text-sm text-slate-400 mb-1.5 text-right" dir="rtl">رمز الدولة</label>
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="h-10 rounded-md border border-slate-600 bg-[#1e1b1c] text-white px-2 text-sm w-full sm:w-24 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="967">🇾🇪 +967</option>
                <option value="966">🇸🇦 +966</option>
                <option value="971">🇦🇪 +971</option>
                <option value="968">🇴🇲 +968</option>
                <option value="965">🇰🇼 +965</option>
                <option value="974">🇶🇦 +974</option>
                <option value="973">🇧🇭 +973</option>
                <option value="962">🇯🇴 +962</option>
                <option value="20">🇪🇬 +20</option>
                <option value="964">🇮🇶 +964</option>
                <option value="963">🇸🇾 +963</option>
                <option value="961">🇱🇧 +961</option>
                <option value="212">🇲🇦 +212</option>
                <option value="216">🇹🇳 +216</option>
                <option value="218">🇱🇾 +218</option>
                <option value="249">🇸🇩 +249</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm text-slate-400 mb-1.5 text-right" dir="rtl">رقم الهاتف</label>
              <Input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="مثال: 777123456"
                className="h-10 bg-[#1e1b1c] border-slate-600 text-white placeholder:text-slate-500 focus:ring-green-500 focus:border-green-500"
                dir="ltr"
              />
            </div>
            <Button
              onClick={handleSendWhatsAppToNumber}
              size="lg"
              className="gap-2 bg-green-600 hover:bg-green-700 h-10 flex-shrink-0"
            >
              <Send className="w-4 h-4" />
              إرسال للرقم
            </Button>
          </div>
          <div className="mt-3 flex items-center gap-3" dir="rtl">
            <div className="h-px flex-1 bg-slate-600"></div>
            <span className="text-xs text-slate-500">أو</span>
            <div className="h-px flex-1 bg-slate-600"></div>
          </div>
          <div className="mt-3 text-center">
            <Button
              onClick={handleSendWhatsApp}
              variant="outline"
              size="sm"
              className="gap-2 border-green-600/50 text-green-400 hover:bg-green-600/10"
            >
              <MessageCircle className="w-4 h-4" />
              إرسال بدون تحديد رقم
            </Button>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-4 justify-center flex-wrap">
          <Button
            onClick={handlePrint}
            variant="outline"
            size="lg"
            className="gap-2 border-amber-600 text-amber-600 hover:bg-amber-600/10"
          >
            طباعة
          </Button>
          <Button
            onClick={handleDownloadPDF}
            size="lg"
            className="gap-2 bg-amber-600 hover:bg-amber-700"
          >
            <Download className="w-4 h-4" />
            تحميل PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
