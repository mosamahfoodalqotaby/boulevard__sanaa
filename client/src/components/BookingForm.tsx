import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

interface BookingFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function BookingForm({ onClose, onSubmit }: BookingFormProps) {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: 'chalet' as 'chalet' | 'hall' | 'both',
    checkInDate: (() => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    })(),
    eventDate: '',
    guestCount: 1,
    totalPrice: '',
    paidAmount: '',
    remainingAmount: '',
    specialRequests: '',
    additionalDetails: '',
    generateQRCode: false,
    generateImagePage: false,
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // التحقق من الحقول المطلوبة
    if (!formData.name || !formData.phone || !formData.checkInDate || !formData.eventDate) {
      setError('Please fill all required fields');
      return;
    }

// Check that event date is not before arrival date
    const checkInDate = new Date(formData.checkInDate);
    const eventDate = new Date(formData.eventDate);

    if (eventDate < checkInDate) {
      setError('Event date must be after or equal to arrival date');
      return;
    }

    // Check that date is not in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkInDate < today) {
      setError('Arrival date must be in the future');
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء إضافة الحجز');
    } finally {
      setLoading(false);
    }
    setFormData({
      name: '',
      phone: '',
      serviceType: 'chalet',
      checkInDate: '',
      eventDate: '',
      guestCount: 1,
      totalPrice: '',
      paidAmount: '',
      remainingAmount: '',
      specialRequests: '',
      additionalDetails: '',
      generateQRCode: false,
      generateImagePage: false,
    });

  };

  return (
    <div className="fixed inset-0 bg-black backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1e1b1c] from-slate-800 to-slate-900 rounded-lg border border-yellow-600/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#1e1b1c] p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#C5A059]">إضافة حجز جديد</h2>
          <button
            onClick={onClose}
            className="text-[#C5A059] hover:bg-[#252525] p-2 rounded-lg transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* الاسم والهاتف */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#C5A059] font-semibold mb-2">الاسم *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="أدخل اسم العميل"
                className="w-full bg-[#1e1b1c] border border-slate-600 rounded-lg px-4 py-2 text-[#C5A059] placeholder-slate-400 focus:outline-none focus:border-[#C5A059]"
              />
            </div>
            <div>
              <label className="block text-[#C5A059] font-semibold mb-2">الهاتف *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="أدخل رقم الهاتف"
                className="w-full bg-[#1e1b1c] border border-slate-600 rounded-lg px-4 py-2 text-[#C5A059] placeholder-slate-400 focus:outline-none focus:border-[#6b5a4a]"
              />
            </div>
          </div>

          {/* نوع الخدمة وعدد الضيوف */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#C5A059] font-semibold mb-2">نوع الخدمة *</label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
                className="w-full bg-[#1e1b1c] border border-slate-600 rounded-lg px-4 py-2 text-[#C5A059] focus:outline-none focus:border-[#6b5a4a]"
              >
                <option value="chalet">شاليه فاخر</option>
                <option value="hall">قاعة احتفالات</option>
                <option value="both">شاليه + قاعة</option>
              </select>
            </div>
            <div>
              <label className="block text-[#C5A059] font-semibold mb-2">عدد الضيوف *</label>
              <input
                type="number"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleInputChange}
                min="1"
                className="w-full bg-[#1e1b1c] border border-slate-600 rounded-lg px-4 py-2 text-[#C5A059] focus:outline-none focus:border-[#6b5a4a]"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#C5A059] font-semibold mb-2">تاريخ الوصول</label>
              <input
                type="date"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full bg-[#1e1b1c] border border-slate-600 rounded-lg px-4 py-2 text-[#C5A059] focus:outline-none focus:border-[#6b5a4a]"
              />
            </div>
            <div>
              <label className="block text-[#C5A059] font-semibold mb-2">تاريخ المناسبة</label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleInputChange}
                min={formData.checkInDate || new Date().toISOString().split('T')[0]}
                className="w-full bg-[#1e1b1c] border border-slate-600 rounded-lg px-4 py-2 text-[#C5A059] focus:outline-none focus:border-[#6b5a4a]"
              />
            </div>
          </div>

          {/* المبالغ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#C5A059] font-semibold mb-2">المبلغ الكلي *</label>
              <input
                type="text"
                name="totalPrice"
                value={formData.totalPrice}
                onChange={handleInputChange}
                placeholder="مثال: 5000 ريال"
                className="w-full bg-[#1e1b1c] border border-slate-600 rounded-lg px-4 py-2 text-[#C5A059] placeholder-slate-400 focus:outline-none focus:border-[#6b5a4a]"
              />
            </div>
            <div>
              <label className="block text-[#C5A059] font-semibold mb-2">المبلغ المدفوع *</label>
              <input
                type="text"
                name="paidAmount"
                value={formData.paidAmount}
                onChange={handleInputChange}
                placeholder="مثال: 2500 ريال"
                className="w-full bg-[#1e1b1c] border border-slate-600 rounded-lg px-4 py-2 text-[#C5A059] placeholder-slate-400 focus:outline-none focus:border-[#6b5a4a]"
              />
            </div>
            <div>
              <label className="block text-[#C5A059] font-semibold mb-2">المبلغ المتبقي *</label>
              <input
                type="text"
                name="remainingAmount"
                value={formData.remainingAmount}
                onChange={handleInputChange}
                placeholder="مثال: 2500 ريال"
                className="w-full bg-[#1e1b1c] border border-slate-600 rounded-lg px-4 py-2 text-[#C5A059] placeholder-slate-400 focus:outline-none focus:border-[#6b5a4a]"
              />
            </div>
          </div>

     

          <div>
            <label className="block text-[#C5A059] font-semibold mb-2">تفاصيل إضافية</label>
            <textarea
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleInputChange}
              placeholder="أدخل أي تفاصيل إضافية"
              rows={3}
              className="w-full bg-[#1e1b1c] border border-slate-600 rounded-lg px-4 py-2 text-[#C5A059] placeholder-slate-400 focus:outline-none focus:border-[#6b5a4a]"
            />
          </div>

          {/* QR Code */}
          <div className="flex items-center gap-3 bg-[#1e1b1c]/50 p-4 rounded-lg border border-slate-600">
            <input
              type="checkbox"
              name="generateQRCode"
              id="generateQRCode"
              checked={formData.generateQRCode}
              onChange={handleInputChange}
              className="w-5 h-5 accent-yellow-500 cursor-pointer"
            />
            <label htmlFor="generateQRCode" className="text-[#C5A059] font-semibold cursor-pointer">
              توليد QR Code للحجز
            </label>
          </div>

          {/* صفحة الصورة الترحيبية */}
          <div className="flex items-center gap-3 bg-[#1e1b1c]/50 p-4 rounded-lg border border-slate-600">
            <input
              type="checkbox"
              name="generateImagePage"
              id="generateImagePage"
              checked={formData.generateImagePage}
              onChange={handleInputChange}
              className="w-5 h-5 accent-yellow-500 cursor-pointer"
            />
            <label htmlFor="generateImagePage" className="text-[#C5A059] font-semibold cursor-pointer">
              إضافة صفحة الصورة الترحيبية
            </label>
          </div>

          {/* رسالة الخطأ */}

          {error && (
            <div className="bg-red-900/30 border border-red-600 rounded-lg p-4 mb-4">
              <p className="text-red-300 font-semibold">⚠️ خطأ</p>
              <p className="text-red-200 text-sm mt-1">{error}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-6 border-t border-slate-600">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#6b5a4a] hover:bg-[#252525] disabled:bg-slate-600 text-[#C5A059] font-semibold py-3 rounded-lg transition-all"
            >
              {loading ? 'جاري الحفظ...' : 'حفظ الحجز'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#1e1b1c] hover:bg-slate-600 text-[#C5A059] font-semibold py-3 rounded-lg transition-all"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
