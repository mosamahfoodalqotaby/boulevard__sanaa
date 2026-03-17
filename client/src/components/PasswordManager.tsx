import { useState } from 'react';
import { Lock, Eye, EyeOff, Save, X } from 'lucide-react';

interface PasswordManagerProps {
  onClose: () => void;
  onSave: (passwords: Record<string, string>) => void;
}

export default function PasswordManager({ onClose, onSave }: PasswordManagerProps) {
  const [passwords, setPasswords] = useState({
    admin: '',
    manager: '',
    staff: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    admin: false,
    manager: false,
    staff: false,
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordChange = (user: string, value: string) => {
    setPasswords(prev => ({
      ...prev,
      [user]: value,
    }));
    setError('');
  };

  const togglePasswordVisibility = (user: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [user]: !prev[user],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // التحقق من أن جميع كلمات المرور مملوءة
    if (!passwords.admin.trim() || !passwords.manager.trim() || !passwords.staff.trim()) {
      setError('يرجى ملء جميع كلمات المرور');
      return;
    }

    // التحقق من طول كلمات المرور
    if (passwords.admin.length < 4 || passwords.manager.length < 4 || passwords.staff.length < 4) {
      setError('يجب أن تكون كلمة المرور على الأقل 4 أحرف');
      return;
    }

    setIsSubmitting(true);
    
    // حفظ كلمات المرور في localStorage
    setTimeout(() => {
      const updatedPasswords = {
        admin: passwords.admin,
        manager: passwords.manager,
        staff: passwords.staff,
      };
      
      localStorage.setItem('adminPasswords', JSON.stringify(updatedPasswords));
      alert('تم تحديث كلمات المرور بنجاح!');
      onSave(updatedPasswords);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" dir="rtl">
      <div className="bg-[#3d2e24] border border-[#C5A059]/30 rounded-lg max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#C5A059]/30">
          <h2 className="text-2xl font-bold text-[#C5A059] flex items-center gap-2">
            <Lock className="w-6 h-6" />
            إدارة كلمات المرور
          </h2>
          <button
            onClick={onClose}
            className="text-[#a89968] hover:text-[#C5A059] transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Admin Password */}
          <div>
            <label className="block text-[#C5A059] font-bold mb-2 text-right">
              كلمة مرور المدير العام (admin)
            </label>
            <div className="relative">
              <input
                type={showPasswords.admin ? 'text' : 'password'}
                value={passwords.admin}
                onChange={(e) => handlePasswordChange('admin', e.target.value)}
                placeholder="أدخل كلمة المرور الجديدة"
                className="w-full bg-[#1e1b1c] border border-[#C5A059] rounded px-4 py-2 text-[#C5A059] text-right placeholder-[#a89968] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('admin')}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a89968] hover:text-[#C5A059]"
              >
                {showPasswords.admin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Manager Password */}
          <div>
            <label className="block text-[#C5A059] font-bold mb-2 text-right">
              كلمة مرور مدير العمليات (manager)
            </label>
            <div className="relative">
              <input
                type={showPasswords.manager ? 'text' : 'password'}
                value={passwords.manager}
                onChange={(e) => handlePasswordChange('manager', e.target.value)}
                placeholder="أدخل كلمة المرور الجديدة"
                className="w-full bg-[#1e1b1c] border border-[#C5A059] rounded px-4 py-2 text-[#C5A059] text-right placeholder-[#a89968] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('manager')}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a89968] hover:text-[#C5A059]"
              >
                {showPasswords.manager ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Staff Password */}
          <div>
            <label className="block text-[#C5A059] font-bold mb-2 text-right">
              كلمة مرور الموظف (staff)
            </label>
            <div className="relative">
              <input
                type={showPasswords.staff ? 'text' : 'password'}
                value={passwords.staff}
                onChange={(e) => handlePasswordChange('staff', e.target.value)}
                placeholder="أدخل كلمة المرور الجديدة"
                className="w-full bg-[#1e1b1c] border border-[#C5A059] rounded px-4 py-2 text-[#C5A059] text-right placeholder-[#a89968] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('staff')}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a89968] hover:text-[#C5A059]"
              >
                {showPasswords.staff ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#C5A059] hover:bg-[#b89447] disabled:bg-[#a89968] text-[#1e1b1c] font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {isSubmitting ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-transparent border border-[#C5A059] hover:bg-[#3d2e24] text-[#C5A059] font-bold py-3 px-4 rounded-lg transition-all"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
