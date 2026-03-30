import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import {
  LogOut,
  Plus,
  Trash2,
  Printer,
  MessageCircle,
  AlertCircle,
  Activity,
  CheckCircle,
  AlertTriangle,
  Trash,
  Lock,
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BookingCard from '@/components/BookingCard';
import BookingForm from '@/components/BookingForm';
import AdvancedSearch from '@/components/AdvancedSearch';
import PasswordManager from '@/components/PasswordManager';
import { printBookingPDF } from '@/lib/bookingPDF';
import { Calendar } from '@/components/ui/calendar';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { useMemo } from 'react';

interface AdminUser {
  id: string;
  name: string;
  role: 'admin' | 'manager' | 'staff';
}

interface Booking {
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

interface ActivityLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
  entityType?: string;
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState<'bookings' | 'activity' | 'calendar'>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [showCalendarDetails, setShowCalendarDetails] = useState(false);
  const [selectedBookings, setSelectedBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [showPasswordManager, setShowPasswordManager] = useState(false);

  const { data: bookingsData, isLoading, refetch } = trpc.bookings.getAll.useQuery();
  const { data: activityLogsData } = trpc.bookings.getActivityLogs.useQuery();

  // تحديث الحجوزات من قاعدة البيانات
  useEffect(() => {
    if (bookingsData) {
      setBookings(bookingsData as any);
      setFilteredBookings(bookingsData as any);
    }
  }, [bookingsData]);

  // تحديث سجل العمليات من قاعدة البيانات
  useEffect(() => {
    if (activityLogsData) {
      setActivityLogs(activityLogsData as any);
    }
  }, [activityLogsData]);

  useEffect(() => {
    const adminUserStr = localStorage.getItem('adminUser');
    if (!adminUserStr) {
      setLocation('/admin-login');
      return;
    }
    const user = JSON.parse(adminUserStr) as AdminUser;
    setCurrentUser(user);
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    setLocation('/admin-login');
  };

  const createBookingMutation = trpc.bookings.create.useMutation({
    onSuccess: () => {
      refetch();
      setShowBookingForm(false);
      alert('تم إضافة الحجز بنجاح');
    },
    onError: () => {
      alert('حدث خطأ أثناء إضافة الحجز');
    },
  });

  const deleteBookingMutation = trpc.bookings.delete.useMutation({
    onSuccess: () => {
      refetch();
      alert('تم حذف الحجز بنجاح');
    },
    onError: () => {
      alert('حدث خطأ أثناء حذف الحجز');
    },
  });

  const handleAddBooking = (formData: any) => {
    createBookingMutation.mutate({
      ...formData,
      guestCount: parseInt(formData.guestCount),
    });
  };

  const handleDeleteBooking = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الحجز؟')) {
      const numericId = parseInt(id);
      if (!isNaN(numericId)) {
        deleteBookingMutation.mutate({ id: numericId });
      }
    }
  };

  const handlePrintBooking = (booking: Booking) => {
    printBookingPDF(booking);
  };

  const handleEditBooking = (booking: Booking) => {
    setEditingBooking(booking);
    setShowBookingForm(true);
  };

  const updateBookingMutation = trpc.bookings.update.useMutation({
    onSuccess: () => {
      refetch();
      setShowBookingForm(false);
      setEditingBooking(null);
      alert('تم تحديث الحجز بنجاح');
    },
    onError: () => {
      alert('حدث خطأ أثناء تحديث الحجز');
    },
  });

  const handleUpdateBooking = (formData: any) => {
    if (editingBooking) {
      const numericId = typeof editingBooking.id === 'string' ? parseInt(editingBooking.id) : editingBooking.id;
      updateBookingMutation.mutate({
        id: numericId,
        status: formData.status || 'pending',
        notes: formData.specialRequests || '',
      });
    }
  };

  const handleSearch = (filters: any) => {
    const { refetch } = trpc.bookings.search.useQuery(filters, {
      enabled: false,
    });
    
    refetch().then(({ data }) => {
      if (data) {
        setFilteredBookings(data as any);
      }
    }).catch(() => {
      alert('حدث خطأ أثناء البحث');
    });
  };

  const handleClearSearch = () => {
    setFilteredBookings(bookings);
  };

  // Calendar logic
  const bookingsByDate = useMemo(() => {
    const map = new Map<string, Booking[]>();
    bookings.forEach((booking) => {
      if (booking.eventDate) {
        if (!map.has(booking.eventDate)) map.set(booking.eventDate, []);
        map.get(booking.eventDate)!.push(booking);
      }
    });
    return map;
  }, [bookings]);


    const eventDates = useMemo(() => {
      const dates = new Set<Date>();
      bookings.forEach((booking) => {
        if (booking.eventDate) {
          const date = new Date(booking.eventDate);
          date.setHours(0, 0, 0, 0);
          dates.add(date);
        }
      });
      return Array.from(dates);
    }, [bookings]);




  const handlePasswordSave = (passwords: Record<string, string>) => {
    // تحديث كلمات المرور في localStorage
    localStorage.setItem('adminPasswords', JSON.stringify(passwords));
    setShowPasswordManager(false);
  };

  const handleWhatsApp = (booking: Booking) => {
    const message = `مرحباً، أود الاستفسار عن حجزي:\n\nالاسم: ${booking.name}\nالهاتف: ${booking.phone}\nنوع الخدمة: ${booking.serviceType === 'chalet' ? 'شاليه فاخر' : booking.serviceType === 'hall' ? 'قاعة احتفالات' : 'شاليه + قاعة'}\nتاريخ الوصول: ${new Date(booking.checkInDate).toLocaleDateString('ar-SA')}`;
    const whatsappUrl = `https://wa.me/967${booking.phone.replace(/^0/, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'create':
        return { label: 'إنشاء', icon: CheckCircle, color: 'text-green-400' };
      case 'update':
        return { label: 'تحديث', icon: AlertTriangle, color: 'text-yellow-400' };
      case 'delete':
        return { label: 'حذف', icon: Trash, color: 'text-red-400' };
      default:
        return { label: action, icon: Activity, color: 'text-blue-400' };
    }
  };

  const handleCalendarSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const dateKey = date.toISOString().split('T')[0];
      const bookingsForDate = bookingsByDate.get(dateKey) || [];
      if (bookingsForDate.length > 0) {
        setSelectedBookings(bookingsForDate);
        setShowCalendarDetails(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1b1c]">

      <Sidebar />
      <WhatsAppButton phoneNumber="967784442228" message="مرحبا بك في بوليفارد صنعاء! كيف يمكنني مساعدتك؟" />

      <main className="md:ml-64 pb-24">
        {/* Hero Section */}
        <section className="pt-20 pb-12 px-4 md:px-8 bg-[#1e1b1c]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <img src="/logo.png" alt="بوليفارد صنعاء" className="h-36 w-auto drop-shadow-lg" />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-[#C5A059] mb-4">لوحة التحكم الإدارية</h1>
                <p className="text-[#C5A059] text-lg">مرحباً {currentUser?.name}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-[#C5A059] px-6 py-3 rounded-lg transition-all font-semibold"
              >
                <LogOut className="w-5 h-5" />
                تسجيل الخروج
              </button>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="px-4 md:px-8 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Tabs */}
            <div className="flex gap-4 mb-8 flex-wrap">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'bookings'
                    ? 'bg-[#6b5a4a] text-white'
                    : 'bg-[#252526] text-slate-400 hover:bg-[#1e1b1c]'
                }`}
              >
                الحجوزات
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'activity'
                    ? 'bg-[#6b5a4a] text-white'
                    : 'bg-[#252526] text-slate-400 hover:bg-[#1e1b1c]'
                }`}
              >
                سجل العمليات
              </button>
            <button
              onClick={() => setLocation('/special-invitation')}
              className="px-6 py-3 rounded-lg font-semibold transition-all bg-amber-600 hover:bg-amber-700 text-white"
            >
              دعوة استضافة خاصة
            </button>
            {currentUser?.role === 'admin' && (
              <button
                onClick={() => setShowPasswordManager(true)}
                className="px-6 py-3 rounded-lg font-semibold transition-all bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
              >
                <Lock className="w-5 h-5" />
                إدارة كلمات المرور
              </button>
            )}
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'calendar'
                  ? 'bg-[#6b5a4a] text-white'
                  : 'bg-[#252526] text-slate-400 hover:bg-[#1e1b1c]'
              }`}
            >
              تقويم الحجوزات
            </button>
            </div>

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div>
                {/* Advanced Search */}
                <AdvancedSearch onSearch={handleSearch} onClear={handleClearSearch} />

                <div className="mb-8">
                  <button
                    onClick={() => setShowBookingForm(true)}
                    className="flex items-center gap-2 bg-[#6b5a4a] hover:bg-[#252525] text- px-6 py-3 rounded-lg transition-all font-semibold"
                  >
                    <Plus className="w-5 h-5" />
                    إضافة حجز جديد
                  </button>
                </div>

                {/* Booking Form Modal */}
                {showBookingForm && (
                  <BookingForm
                    onClose={() => {
                      setShowBookingForm(false);
                      setEditingBooking(null);
                    }}
                    onSubmit={editingBooking ? handleUpdateBooking : handleAddBooking}
                  />
                )}

                {/* Bookings Grid */}
                {isLoading ? (
                  <div className="text-center text-white">جاري التحميل...</div>
                ) : filteredBookings.length === 0 ? (
                  <div className="bg-[#252526] rounded-lg p-12 text-center border border-[#C5A059]/20">
                    <AlertCircle className="w-12 h-12 text-[#b89447] mx-auto mb-4" />
                    <p className="text-white text-lg mb-4">لم يتم العثور على أي حجوزات مطابقة</p>
                    <p className="text-slate-400">حاول تغيير معايير البحث</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBookings.map((booking) => (
                      <BookingCard
                        key={booking.id}
                        booking={booking}
                        onPrint={handlePrintBooking}
                        onWhatsApp={handleWhatsApp}
                        onDelete={handleDeleteBooking}
                        onEdit={handleEditBooking}
                        isAdmin={true}
                        isCustomerView={false}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div className="bg-[#252526] rounded-lg border border-[#C5A059]/20 overflow-hidden">
                <div className="p-6 border-b border-[#C5A059]/20">
                  <h2 className="text-2xl font-bold text-[#b89447] flex items-center gap-2">
                    <Activity className="w-6 h-6" />
                    سجل العمليات
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#C5A059]/20 bg-[#1e1b1c]">
                        <th className="px-6 py-4 text-right text-[#b89447] font-semibold">العملية</th>
                        <th className="px-6 py-4 text-right text-[#b89447] font-semibold">نوع البيانات</th>
                        <th className="px-6 py-4 text-right text-[#b89447] font-semibold">المستخدم</th>
                        <th className="px-6 py-4 text-right text-[#b89447] font-semibold">الوقت والتاريخ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activityLogs.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="p-8 text-center text-slate-400">
                            <p>لا توجد عمليات حالياً</p>
                          </td>
                        </tr>
                      ) : (
                        activityLogs.map((log) => {
                          const actionInfo = getActionLabel(log.action);
                          const ActionIcon = actionInfo.icon;
                          
                          let entityLabel = '';
                          if (log.entityType === 'booking') {
                            entityLabel = 'حجز';
                          } else if (log.entityType === 'user') {
                            entityLabel = 'مستخدم';
                          } else {
                            entityLabel = log.entityType || 'عملية';
                          }
                          
                          return (
                            <tr key={log.id} className="border-b border-[#C5A059]/20 hover:bg-[#1e1b1c]/30 transition-all">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <ActionIcon className={`w-5 h-5 ${actionInfo.color}`} />
                                  <span className={`font-semibold ${actionInfo.color}`}>{actionInfo.label}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-slate-300">
                                <span className="bg-[#1e1b1c] px-3 py-1 rounded text-sm">{entityLabel}</span>
                              </td>
                              <td className="px-6 py-4 text-slate-300">{log.user}</td>
                              <td className="px-6 py-4 text-slate-400 text-sm">
                                {new Date(log.timestamp).toLocaleString('ar-SA', {
                                  year: 'numeric',
                                  month: '2-digit',
                                  day: '2-digit',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  second: '2-digit',
                                })}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Calendar Tab */}
            {activeTab === 'calendar' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-[#C5A059] flex items-center gap-2">
                    تقويم الحجوزات
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-0">
                  {/* Calendar Full Width */}
                  <div className="bg-[#252526] rounded-lg p-8 border border-[#C5A059]/20">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleCalendarSelect}
                      modifiers={{
                        booked: eventDates
                      }}

                      classNames={{
                        day: 'hover:bg-[#6b5a4a]/50 h-12 w-12 rounded-lg transition-all font-semibold text-sm p-2 relative [&:has([aria-selected].day-range-end)]:bg-[#C5A059]/20 [&:has([aria-selected].day-outside)]:bg-[#6b5a4a]/30 [&:has([aria-selected])]:ring-1 [&:has([aria-selected])]:ring-[#C5A059]/30 [&:has([aria-selected].day-outside)]:ring-white/20',
                        day_selected: '!bg-[#C5A059] text-white hover:bg-[#C5A059] border-2 border-white/20 shadow-md font-bold',
                        day_booked: 'relative ring-2 ring-red-500/70 bg-red-500/60 text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.05] transition-all cursor-pointer rounded-full flex items-center justify-center',



                        day_range_middle: 'bg-[#6b5a4a]/30',
                        day_range_end: '!bg-[#C5A059]',
                        day_disabled: 'opacity-50 cursor-not-allowed',
                        day_outside: 'opacity-70',
                      }}
                      onDayClick={(date) => {
                        const dateKey = date.toISOString().split('T')[0];
                        const bookingsForDate = bookingsByDate.get(dateKey) || [];
                        if (bookingsForDate.length > 0) {
                          setSelectedBookings(bookingsForDate);
                          setSelectedDate(date);
                          setShowCalendarDetails(true);
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Details Dialog */}
                <Dialog open={showCalendarDetails} onOpenChange={setShowCalendarDetails}>
                  <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">
                        تفاصيل الحجوزات المختارة
                      </DialogTitle>
                      <DialogDescription>
                        اضغط على بطاقة الحجز للطباعة أو التواصل أو التعديل
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                      {selectedBookings.map((booking) => (
                        <BookingCard
                          key={booking.id}
                          booking={booking}
                          onPrint={handlePrintBooking}
                          onWhatsApp={handleWhatsApp}
                          onDelete={handleDeleteBooking}
                          onEdit={handleEditBooking}
                          isAdmin={true}
                          isCustomerView={false}
                        />
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Password Manager Modal */}
      {showPasswordManager && (
        <PasswordManager
          onClose={() => setShowPasswordManager(false)}
          onSave={handlePasswordSave}
        />
      )}

      <Footer />
    </div>
  );
}

