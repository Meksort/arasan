import { MapPin, Phone, Clock, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl mb-4">Arasan Wellness & SPA</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Премиальный банный комплекс с многолетней историей в самом сердце Алматы.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium mb-4">Контакты</h4>
            <div className="space-y-3 text-sm">
              <a href="#" className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Центр Алматы</span>
              </a>
              <a href="tel:+77001234567" className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+7 (700) 123-45-67</span>
              </a>
              <a href="mailto:info@arasan.kz" className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Mail className="w-4 h-4 shrink-0" />
                <span>info@arasan.kz</span>
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-medium mb-4">Часы работы</h4>
            <div className="flex items-start gap-3 text-sm text-primary-foreground/70">
              <Clock className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p>Ежедневно</p>
                <p className="text-primary-foreground font-medium">06:00 — 23:30</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center text-sm text-primary-foreground/50">
          <p>© {new Date().getFullYear()} Arasan Wellness & SPA. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
