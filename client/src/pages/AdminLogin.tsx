import { useState } from 'react';
import { Lock, Mail, AlertCircle, Key } from 'lucide-react';
import { useLocation } from 'wouter';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

interface AdminUser {
  id: string;
  username: string;
  password: string;
  name: string;
  role: 'admin' | 'manager' | 'staff';
  email: string;
}

let ADMIN_USERS: AdminUser[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    name: 'المدير العام',
    role: 'admin',
    email: 'admin@boulevard.com',
  },
  {
    id: '2',
    username: 'manager',
    password: 'manager123',
    name: 'مدير العمليات',
    role: 'manager',
    email: 'manager@boulevard.com',
  },
  {
    id: '3',
    username: 'staff',
    password: 'staff123',
    name: 'الموظف',
    role: 'staff',
    email: 'staff@boulevard.com',
  },
];

// تحميل المستخدمين من localStorage إذا كانت موجودة
const savedUsers = localStorage.getItem('adminUsers');
if (savedUsers) {
  try {
    ADMIN_USERS = JSON.parse(savedUsers);
  } catch (e) {
    // استخدام القيم الافتراضية
  }
}

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changePasswordError, setChangePasswordError] = useState('');
  const [changePasswordSuccess, setChangePasswordSuccess] = useState('');
  const [currentAdminUser, setCurrentAdminUser] = useState<AdminUser | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // محاكاة تأخير الخادم
    await new Promise((resolve) => setTimeout(resolve, 500));

    // قراءة كلمات المرور المحدثة من localStorage
    const savedPasswords = localStorage.getItem('adminPasswords');
    let updatedUsers = [...ADMIN_USERS];

    if (savedPasswords) {
      try {
        const parsedPasswords = JSON.parse(savedPasswords);
        updatedUsers = updatedUsers.map(u => ({
          ...u,
          password: parsedPasswords[u.username] || u.password
        }));
      } catch (e) {
        console.error('Error parsing saved passwords:', e);
      }
    }

    const user = updatedUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // تحديث ADMIN_USERS بكلمات المرور المحدثة
      ADMIN_USERS = updatedUsers;
      // حفظ بيانات المستخدم في localStorage
      localStorage.setItem(
        'adminUser',
        JSON.stringify({
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role,
          email: user.email,
        })
      );
      // إذا كان المستخدم admin، أظهر خيار تغيير كلمة المرور
      if (user.role === 'admin') {
        setCurrentAdminUser(user);
        setShowChangePassword(true);
      } else {
        setLocation('/admin');
      }
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangePasswordError('');
    setChangePasswordSuccess('');

    // التحقق من صحة البيانات
    if (!currentPassword || !newPassword || !confirmPassword) {
      setChangePasswordError('جميع الحقول مطلوبة');
      return;
    }

    if (newPassword !== confirmPassword) {
      setChangePasswordError('كلمات المرور الجديدة غير متطابقة');
      return;
    }

    if (newPassword.length < 6) {
      setChangePasswordError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    if (currentPassword === newPassword) {
      setChangePasswordError('كلمة المرور الجديدة يجب أن تكون مختلفة عن القديمة');
      return;
    }

    // التحقق من كلمة المرور الحالية
    const userIndex = ADMIN_USERS.findIndex(
      (u) => u.id === currentAdminUser?.id && u.password === currentPassword
    );

    if (userIndex === -1) {
      setChangePasswordError('كلمة المرور الحالية غير صحيحة');
      return;
    }

    // تحديث كلمة المرور
    ADMIN_USERS[userIndex].password = newPassword;
    localStorage.setItem('adminUsers', JSON.stringify(ADMIN_USERS));

    setChangePasswordSuccess('تم تغيير كلمة المرور بنجاح! جاري الانتقال...');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');

    // الانتقال إلى لوحة التحكم بعد ثانية
    setTimeout(() => {
      setLocation('/admin');
    }, 1500);
  };

  // صفحة تغيير كلمة المرور للمدير العام
  if (showChangePassword && currentAdminUser?.role === 'admin') {
    return (
      <div className="min-h-screen bg-[#1e1b1c]">
        <Sidebar />
        <WhatsAppButton phoneNumber="967784442228" message="مرحبا بك في بوليفارد صنعاء! كيف يمكنني مساعدتك؟" />

        <main className="md:ml-64 pb-24 flex items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-[#C5A059] mb-2">
                بوليفارد صنعاء
              </h1>
              <p className="text-gray-400">تغيير كلمة المرور - المدير العام</p>
            </div>

            {/* Change Password Form */}
            <div className="bg-[#1e1b1c] rounded-xl p-8 shadow-2xl border border-yellow-600/30">
              <h2 className="text-2xl font-bold text-[#C5A059] mb-6 text-center flex items-center justify-center gap-2">
                <Key size={24} />
                تغيير كلمة المرور
              </h2>

              {changePasswordError && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-3">
                  <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-red-300 text-sm">{changePasswordError}</p>
                </div>
              )}

              {changePasswordSuccess && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-start gap-3">
                  <AlertCircle className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-green-300 text-sm">{changePasswordSuccess}</p>
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-semibold text-[#C5A059] mb-2">
                    كلمة المرور الحالية
                  </label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 text-gray-500" size={20} />
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="أدخل كلمة المرور الحالية"
                      className="w-full pr-10 pl-4 py-3 border border-yellow-600/50 rounded-lg bg-[#1e1b1c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-semibold text-[#C5A059] mb-2">
                    كلمة المرور الجديدة
                  </label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 text-gray-500" size={20} />
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="أدخل كلمة المرور الجديدة"
                      className="w-full pr-10 pl-4 py-3 border border-yellow-600/50 rounded-lg bg-[#1e1b1c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-[#C5A059] mb-2">
                    تأكيد كلمة المرور الجديدة
                  </label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 text-gray-500" size={20} />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="أعد إدخال كلمة المرور الجديدة"
                      className="w-full pr-10 pl-4 py-3 border border-yellow-600/50 rounded-lg bg-[#1e1b1c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-[#1e1b1c] hover:from-yellow-700 hover:to-yellow-600 text-white font-bold rounded-lg transition-all duration-300 active:scale-95"
                >
                  تحديث كلمة المرور
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-yellow-600/30">
                <button
                  onClick={() => setLocation('/admin')}
                  className="w-full py-2 text-[#C5A059] hover:text-yellow-300 transition-colors text-sm"
                >
                  تخطي والانتقال إلى لوحة التحكم
                </button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e1b1c]">
      <Sidebar />
      <WhatsAppButton phoneNumber="967784442228" message="مرحبا بك في بوليفارد صنعاء! كيف يمكنني مساعدتك؟" />

      <main className="md:ml-64 pb-24 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#C5A059] mb-2">
              بوليفارد صنعاء
            </h1>
            <p className="text-gray-400">لوحة التحكم الإدارية</p>
          </div>

          {/* Login Form */}
          <div className="bg-[#1e1b1c] rounded-xl p-8 shadow-2xl border border-yellow-600/30">
            <h2 className="text-2xl font-bold text-[#C5A059] mb-6 text-center">
              تسجيل الدخول
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-3">
                <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-sm font-semibold text-[#C5A059] mb-2">
                  اسم المستخدم
                </label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 text-gray-500" size={20} />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="أدخل اسم المستخدم"
                    className="w-full pr-10 pl-4 py-3 border border-yellow-600/50 rounded-lg bg-[#1e1b1c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-[#C5A059] mb-2">
                  كلمة المرور
                </label>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 text-gray-500" size={20} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="أدخل كلمة المرور"
                    className="w-full pr-10 pl-4 py-3 border border-yellow-600/50 rounded-lg bg-[#1e1b1c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#1e1b1c] hover:from-yellow-700 hover:to-yellow-600 disabled:from-gray-600 disabled:to-gray-500 text-white font-bold rounded-lg transition-all duration-300 active:scale-95"
              >
                {loading ? 'جاري التحقق...' : 'دخول'}
              </button>
            </form>


          </div>

          {/* Back Link */}
          <div className="text-center mt-6">
            <a
              href="/"
              className="text-[#C5A059] hover:text-yellow-300 transition-colors"
            >
              العودة إلى الصفحة الرئيسية
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
