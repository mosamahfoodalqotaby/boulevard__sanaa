import {
  Printer,
  MessageCircle,
  Trash2,
  Edit,
} from 'lucide-react';

interface Booking {
  id: string;
  name: string;
  checkInDate: string;
  eventDate?: string;
  serviceType: 'chalet' | 'hall' | 'both';
  guestCount: number;
  phone: string;
  totalPrice?: string;
  paidAmount?: string;
  remainingAmount?: string;
  specialRequests?: string;
  additionalDetails?: string;
  generateQRCode?: boolean;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

interface BookingCardProps {
  booking: Booking;
  onPrint: (booking: Booking) => void;
  onWhatsApp?: (booking: Booking) => void;
  onDelete?: (id: string) => void;
  onEdit?: (booking: Booking) => void;
  isAdmin?: boolean;
  isCustomerView?: boolean;
}

export default function BookingCard({
  booking,
  onPrint,
  onWhatsApp,
  onDelete,
  onEdit,
  isAdmin = false,
  isCustomerView = false,
}: BookingCardProps) {
  const getServiceTypeLabel = (type: string) => {
    switch (type) {
      case 'chalet':
        return 'شاليه فاخر';
      case 'hall':
        return 'قاعة احتفالات';
      case 'both':
        return 'شاليه + قاعة';
      default:
        return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-600/20 border-green-600/50 text-green-400';
      case 'pending':
        return 'bg-[#6b5a4a]/20 border-yellow-600/50 text-[#C5A059]';
      case 'cancelled':
        return 'bg-red-600/20 border-red-600/50 text-red-400';
      default:
        return 'bg-slate-600/20 border-slate-600/50 text-slate-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'مؤكد';
      case 'pending':
        return 'مؤكد';
      case 'cancelled':
        return 'ملغى';
      default:
        return status;
    }
  };

  // عرض مبسط للعميل
  if (isCustomerView) {
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-yellow-600/20 p-6 hover:border-yellow-600/40 transition-all">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-[#b89447]">{booking.name}</h3>
            <p className="text-slate-400 text-sm">تاريخ الحجز: {new Date(booking.createdAt).toLocaleDateString('ar-SA')}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(booking.status)}`}>
            {getStatusLabel(booking.status)}
          </span>
        </div>

        <div className="border-t border-yellow-600/20 my-4"></div>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => onPrint(booking)}
            className="flex items-center gap-2 bg-[#6b5a4a]/20 hover:bg-[#6b5a4a]/30 border border-yellow-600/50 text-[#C5A059] px-4 py-2 rounded-lg transition-all text-sm font-semibold"
          >
            <Printer className="w-4 h-4" />
            طباعة
          </button>
          {onWhatsApp && (
            <button
              onClick={() => onWhatsApp(booking)}
              className="flex items-center gap-2 bg-green-600/20 hover:bg-green-600/30 border border-green-600/50 text-green-400 px-4 py-2 rounded-lg transition-all text-sm font-semibold"
            >
              <MessageCircle className="w-4 h-4" />
              واتساب
            </button>
          )}
        </div>
      </div>
    );
  }

  // عرض كامل للمدير
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-yellow-600/20 p-6 hover:border-yellow-600/40 transition-all">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-[#b89447]">{booking.name}</h3>
          <p className="text-slate-400 text-sm">رقم الحجز: {booking.id}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(booking.status)}`}>
          {getStatusLabel(booking.status)}
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-yellow-600/20 my-4"></div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-wider">الهاتف</p>
          <p className="text-white font-semibold">{booking.phone}</p>
        </div>
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-wider">نوع الخدمة</p>
          <p className="text-white font-semibold">{getServiceTypeLabel(booking.serviceType)}</p>
        </div>
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-wider">تاريخ الحجز</p>
          <p className="text-white font-semibold">{new Date(booking.createdAt).toLocaleDateString('ar-SA')}</p>
        </div>
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-wider">تاريخ المناسبة</p>
          <p className="text-white font-semibold">{booking.eventDate ? new Date(booking.eventDate).toLocaleDateString('ar-SA') : '-'}</p>
        </div>
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-wider">عدد الضيوف</p>
          <p className="text-white font-semibold">{booking.guestCount}</p>
        </div>
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-wider">تاريخ الوصول</p>
          <p className="text-white font-semibold">{new Date(booking.checkInDate).toLocaleDateString('ar-SA')}</p>
        </div>
      </div>

      {/* Pricing */}
      {booking.totalPrice && (
        <>
          <div className="border-t border-yellow-600/20 my-4"></div>
          <div className="grid grid-cols-3 gap-4 mb-6 bg-[#1e1b1c]/30 p-4 rounded-lg">
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider">المبلغ الكلي</p>
              <p className="text-[#C5A059] font-bold text-lg">{booking.totalPrice}</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider">المبلغ المدفوع</p>
              <p className="text-green-400 font-bold text-lg">{booking.paidAmount || '-'}</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider">المبلغ المتبقي</p>
              <p className="text-red-400 font-bold text-lg">{booking.remainingAmount || '-'}</p>
            </div>
          </div>
        </>
      )}



      {/* Additional Details */}
      {booking.additionalDetails && (
        <>
          <div className="border-t border-yellow-600/20 my-4"></div>
          <div className="mb-6">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">تفاصيل إضافية</p>
            <p className="text-white">{booking.additionalDetails}</p>
          </div>
        </>
      )}

      {/* QR Code Flag */}
      {booking.generateQRCode && (
        <>
          <div className="border-t border-yellow-600/20 my-4"></div>
          <div className="mb-6 bg-blue-600/20 border border-blue-600/50 p-3 rounded-lg">
            <p className="text-blue-400 text-sm font-semibold">✓ تم طلب توليد QR Code</p>
          </div>
        </>
      )}

      {/* Divider */}
      <div className="border-t border-yellow-600/20 my-4"></div>

      {/* Actions */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => onPrint(booking)}
          className="flex items-center gap-2 bg-[#6b5a4a]/20 hover:bg-[#6b5a4a]/30 border border-yellow-600/50 text-[#C5A059] px-4 py-2 rounded-lg transition-all text-sm font-semibold"
        >
          <Printer className="w-4 h-4" />
          طباعة
        </button>
        {onWhatsApp && (
          <button
            onClick={() => onWhatsApp(booking)}
            className="flex items-center gap-2 bg-green-600/20 hover:bg-green-600/30 border border-green-600/50 text-green-400 px-4 py-2 rounded-lg transition-all text-sm font-semibold"
          >
            <MessageCircle className="w-4 h-4" />
            واتساب
          </button>
        )}
        {isAdmin && onEdit && (
          <button
            onClick={() => onEdit(booking)}
            className="flex items-center gap-2 bg-[#6b5a4a]/20 hover:bg-[#6b5a4a]/30 border border-yellow-600/50 text-[#C5A059] px-4 py-2 rounded-lg transition-all text-sm font-semibold"
          >
            <Edit className="w-4 h-4" />
            تعديل
          </button>
        )}
        {isAdmin && onDelete && (
          <button
            onClick={() => onDelete(booking.id)}
            className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 text-red-400 px-4 py-2 rounded-lg transition-all text-sm font-semibold"
          >
            <Trash2 className="w-4 h-4" />
            حذف
          </button>
        )}
      </div>
    </div>
  );
}
