import { Download, Send, Printer } from 'lucide-react';
import { useRef } from 'react';

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  customerName: string;
  customerPhone: string;
  bookingType: string;
  amount: number;
  tax: number;
  total: number;
  description: string;
}

interface InvoiceGeneratorProps {
  data: InvoiceData;
}

export default function InvoiceGenerator({ data }: InvoiceGeneratorProps) {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (invoiceRef.current) {
      const printWindow = window.open('', '', 'width=800,height=600');
      if (printWindow) {
        printWindow.document.write(invoiceRef.current.innerHTML);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const handleSendWhatsApp = () => {
    const message = `
فاتورة رقم: ${data.invoiceNumber}
العميل: ${data.customerName}
النوع: ${data.bookingType}
المبلغ: ${data.amount} ريال
الضريبة: ${data.tax} ريال
الإجمالي: ${data.total} ريال
    `;
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${data.customerPhone}?text=${encodedMessage}`,
      '_blank'
    );
  };

  const handleDownload = () => {
    if (invoiceRef.current) {
      const element = invoiceRef.current;
      const opt = {
        margin: 10,
        filename: `invoice-${data.invoiceNumber}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
      };
      // In production, use html2pdf library
      console.log('Download invoice:', opt);
    }
  };

  return (
    <div className="space-y-6">
      {/* Invoice Preview */}
      <div
        ref={invoiceRef}
        className="bg-white p-8 rounded-lg shadow-lg border-2 border-[#6b5a4a]"
      >
        {/* Header */}
        <div className="border-b-2 border-[#6b5a4a] pb-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-[#a89350]">بوليفارد</h1>
              <p className="text-gray-600 text-lg">صنعاء</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">فاتورة رقم</p>
              <p className="text-2xl font-bold text-gray-900">{data.invoiceNumber}</p>
            </div>
          </div>
        </div>

        {/* Invoice Info */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">بيانات العميل</h3>
            <p className="text-gray-700">{data.customerName}</p>
            <p className="text-gray-700 dir-ltr">{data.customerPhone}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">
              <span className="font-semibold">التاريخ:</span> {data.date}
            </p>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full mb-8">
          <thead>
            <tr className="border-b-2 border-[#6b5a4a]">
              <th className="text-right py-3 text-gray-900 font-bold">البيان</th>
              <th className="text-right py-3 text-gray-900 font-bold">الكمية</th>
              <th className="text-right py-3 text-gray-900 font-bold">السعر</th>
              <th className="text-right py-3 text-gray-900 font-bold">الإجمالي</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-300">
              <td className="py-4 text-gray-700">{data.description}</td>
              <td className="text-right py-4 text-gray-700">1</td>
              <td className="text-right py-4 text-gray-700">{data.amount}</td>
              <td className="text-right py-4 text-gray-700">{data.amount}</td>
            </tr>
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-64 space-y-2">
            <div className="flex justify-between py-2 border-b border-gray-300">
              <span className="text-gray-700">المبلغ:</span>
              <span className="font-semibold text-gray-900">{data.amount} ريال</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-300">
              <span className="text-gray-700">الضريبة:</span>
              <span className="font-semibold text-gray-900">{data.tax} ريال</span>
            </div>
            <div className="flex justify-between py-3 bg-[#3d2e24] px-4 rounded-lg">
              <span className="font-bold text-gray-900">الإجمالي:</span>
              <span className="font-bold text-[#a89350] text-lg">{data.total} ريال</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-[#6b5a4a] pt-6 text-center text-sm text-gray-600">
          <p>شكراً لتعاملك معنا</p>
          <p>بوليفارد صنعاء - جميع الحقوق محفوظة © 2026</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors"
        >
          <Printer size={20} />
          طباعة
        </button>
        <button
          onClick={handleSendWhatsApp}
          className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors"
        >
          <Send size={20} />
          إرسال عبر واتساب
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-3 bg-[#3d2e24]0 hover:bg-[#6b5a4a] text-white font-bold rounded-lg transition-colors"
        >
          <Download size={20} />
          تحميل PDF
        </button>
      </div>
    </div>
  );
}
