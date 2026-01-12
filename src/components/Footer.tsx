import { MapPin, Phone, Clock, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8 sm:py-12 safe-area-inset-bottom">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <h3 className="font-serif text-xl sm:text-2xl mb-3 sm:mb-4">Arasan Wellness & SPA</h3>
            <p className="text-primary-foreground/70 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
              Премиальный банный комплекс с многолетней историей в самом сердце Алматы.
            </p>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h4 className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">Контакты</h4>
            <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
              <a href="#" className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>Центр Алматы</span>
              </a>
              <a href="tel:+77001234567" className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>+7 (700) 123-45-67</span>
              </a>
              <a href="mailto:info@arasan.kz" className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>info@arasan.kz</span>
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="text-center sm:text-left sm:col-span-2 md:col-span-1">
            <h4 className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">Часы работы</h4>
            <div className="flex items-start justify-center sm:justify-start gap-2 sm:gap-3 text-xs sm:text-sm text-primary-foreground/70">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 mt-0.5" />
              <div>
                <p>Ежедневно</p>
                <p className="text-primary-foreground font-medium">06:00 — 23:30</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-primary-foreground/50">
          <p>© {new Date().getFullYear()} Arasan Wellness & SPA. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;