import { useState, useEffect } from 'react';
import { Loader2, AlertCircle, Printer } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { trpc } from '@/lib/trpc';
import { printBookingPDF } from '@/lib/bookingPDF';

interface Booking {
  id: string;
  name: string;
  checkInDate: string;
  phone?: string;
  status?: string;
  eventDate?: string;
  serviceType?: 'chalet' | 'hall' | 'both';
  guestCount?: number;
  totalPrice?: string;
  paidAmount?: string;
  remainingAmount?: string;
  specialRequests?: string;
  additionalDetails?: string;
  generateQRCode?: boolean;
  createdAt: string;
}

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const { data: bookingsData, isLoading } = trpc.bookings.getAll.useQuery();
  
  // تحديث الحجوزات من قاعدة البيانات
  useEffect(() => {
    if (bookingsData) {
      setBookings(bookingsData as any);
    }
  }, [bookingsData]);

  const handlePrintPDF = (booking: Booking) => {
    printBookingPDF(booking as any);
  };

  return (
    <div className="min-h-screen bg-[#1e1b1c] text-[#C5A059]">
      <Sidebar />
      <WhatsAppButton phoneNumber="967123456789" message="مرحبا بك في بوليفارد صنعاء! كيف يمكنني مساعدتك؟" />

      <main className="md:ml-64 pb-24">
        {/* Hero Section */}
        <section className="pt-20 pb-12 px-4 md:px-8 bg-gradient-to-r from-[#252526] to-[#1e1b1c] border-b-2 border-[#C5A059]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <img src="/logo.png" alt="بوليفارد صنعاء" className="h-36 w-auto drop-shadow-lg" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#C5A059] mb-4 text-center">الحجوزات</h1>
            <p className="text-[#C5A059] text-lg text-center">عرض جميع حجوزاتك</p>
          </div>
        </section>

        {/* Content */}
        <section className="px-4 md:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Bookings List - Customer View */}
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 text-[#C5A059] animate-spin" />
              </div>
            ) : bookings.length === 0 ? (
              <div className="bg-[#252526] rounded-lg p-12 text-center border border-[#C5A059]/20">
                <AlertCircle className="w-12 h-12 text-[#C5A059] mx-auto mb-4" />
                <p className="text-[#C5A059] text-lg mb-4">لا توجد حجوزات حالياً</p>
                <p className="text-[#C5A059]">ابدأ بإضافة حجز جديد لعرضه هنا</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-[#252526] rounded-lg p-6 border border-[#C5A059]/20 hover:border-[#C5A059]/40 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-[#C5A059] mb-2">{booking.name}</h3>
                        <p className="text-[#C5A059]">
                          تاريخ الحجز: {new Date(booking.checkInDate).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                    </div>
                    <div className="border-t border-[#C5A059]/20 my-4"></div>
                    <button
                      onClick={() => handlePrintPDF(booking)}
                      className="flex items-center gap-2 bg-[#C5A059]/20 hover:bg-[#C5A059]/30 border border-[#C5A059]/50 text-[#C5A059] px-4 py-2 rounded-lg transition-all text-sm font-semibold"
                    >
                      <Printer className="w-4 h-4" />
                      طباعة PDF
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
