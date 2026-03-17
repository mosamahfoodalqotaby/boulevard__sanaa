import { Menu, X, MapPin, Phone, Mail, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'الرئيسية', href: '/' },
    { label: 'الحجوزات', href: '/bookings' },
    { label: 'عننا', href: '/about' },
    { label: 'التواصل', href: '/contact' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/share/1CPvnCx7m2/', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/boulevardsanaa?igsh=Yzl5MzU3d3BjdmVo', label: 'Instagram' },
    { icon: MessageCircle, href: 'https://wa.me/967784442228', label: 'WhatsApp' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-[#C5A059] text-[#1e1b1c] hover:bg-[#b89447] transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-[#1e1b1c] border-r border-[#C5A059]/30 shadow-lg transition-transform duration-300 z-40 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-[#C5A059]/30 flex flex-col items-center">
          <img src="/logo.png" alt="بوليفارد صنعاء" className="h-24 w-auto mb-1" />
        </div>

        {/* Navigation Menu */}
        <nav className="p-6 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-lg text-[#C5A059] hover:bg-[#252526] hover:text-[#C5A059] transition-colors font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Contact Info */}
        <div className="p-6 border-t border-[#C5A059]/30 space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="text-[#C5A059] flex-shrink-0 mt-1" size={20} />
            <div className="text-sm">
              <p className="font-semibold text-[#C5A059]">العنوان</p>
              <p className="text-[#C5A059]/80">صنعاء، اليمن</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="text-[#C5A059] flex-shrink-0 mt-1" size={20} />
            <div className="text-sm">
              <p className="font-semibold text-[#C5A059]">الهاتف</p>
              <p className="text-[#C5A059]/80 dir-ltr">+967 1 234 5678</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="text-[#C5A059] flex-shrink-0 mt-1" size={20} />
            <div className="text-sm">
              <p className="font-semibold text-[#C5A059]">البريد</p>
              <p className="text-[#C5A059]/80 dir-ltr">info@boulevard.com</p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="p-6 border-t border-[#C5A059]/30">
          <p className="text-sm font-semibold text-[#C5A059] mb-3">تابعنا</p>
          <div className="flex gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="p-2 rounded-lg bg-[#252526] text-[#C5A059] hover:bg-[#252525] transition-colors"
                  aria-label={link.label}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}
