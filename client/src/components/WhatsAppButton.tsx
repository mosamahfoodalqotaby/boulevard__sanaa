import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  message?: string;
  phoneNumber?: string;
  className?: string;
}

export default function WhatsAppButton({
  message = 'مرحبا بك في بوليفارد صنعاء! كيف يمكنني مساعدتك؟',
  phoneNumber = '967784442228',
  className = '',
}: WhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-8 right-8 z-50 w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 ${className}`}
      title="تواصل معنا عبر WhatsApp"
    >
      <MessageCircle size={32} className="text-white" />
    </a>
  );
}
