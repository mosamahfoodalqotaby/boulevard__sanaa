import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchFilters {
  customerName: string;
  startDate: string;
  endDate: string;
  status: 'all' | 'pending' | 'confirmed' | 'cancelled';
  serviceType: 'all' | 'chalet' | 'hall' | 'both';
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
  onClear: () => void;
}

export default function AdvancedSearch({ onSearch, onClear }: AdvancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    customerName: '',
    startDate: '',
    endDate: '',
    status: 'all',
    serviceType: 'all',
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClear = () => {
    setFilters({
      customerName: '',
      startDate: '',
      endDate: '',
      status: 'all',
      serviceType: 'all',
    });
    onClear();
  };

  const hasActiveFilters = 
    filters.customerName !== '' ||
    filters.startDate !== '' ||
    filters.endDate !== '' ||
    filters.status !== 'all' ||
    filters.serviceType !== 'all';

  return (
    <div className="bg-[#1e1b1c] rounded-lg border border-slate-700 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-[#b89447] font-semibold hover:text-[#C5A059] transition-colors"
        >
          <Search className="w-5 h-5" />
          بحث متقدم عن الحجوزات
        </button>
        {hasActiveFilters && (
          <button
            onClick={handleClear}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-sm"
          >
            <X className="w-4 h-4" />
            مسح البحث
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* اسم العميل */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              اسم العميل
            </label>
            <input
              type="text"
              name="customerName"
              value={filters.customerName}
              onChange={handleInputChange}
              placeholder="ابحث عن اسم..."
              className="w-full px-4 py-2 bg-[#1e1b1c] border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-[#b89447] transition-colors"
            />
          </div>

          {/* تاريخ البداية */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              من التاريخ
            </label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[#1e1b1c] border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#b89447] transition-colors"
            />
          </div>

          {/* تاريخ النهاية */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              إلى التاريخ
            </label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[#1e1b1c] border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#b89447] transition-colors"
            />
          </div>

          {/* حالة الحجز */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              حالة الحجز
            </label>
            <select
              name="status"
              value={filters.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[#1e1b1c] border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#b89447] transition-colors"
            >
              <option value="all">الكل</option>
              <option value="pending">قيد الانتظار</option>
              <option value="confirmed">مؤكد</option>
              <option value="cancelled">ملغى</option>
            </select>
          </div>

          {/* نوع الخدمة */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              نوع الخدمة
            </label>
            <select
              name="serviceType"
              value={filters.serviceType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[#1e1b1c] border border-slate-600 rounded-lg text-white focus:outline-none focus:border-[#b89447] transition-colors"
            >
              <option value="all">الكل</option>
              <option value="chalet">شاليه فاخر</option>
              <option value="hall">قاعة احتفالات</option>
              <option value="both">شاليه + قاعة</option>
            </select>
          </div>

          {/* زر البحث */}
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="w-full bg-[#6b5a4a] hover:bg-[#7a6a5a] text-white px-6 py-2 rounded-lg transition-all font-semibold"
            >
              بحث
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
