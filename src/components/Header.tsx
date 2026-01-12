import { ShoppingCart, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onCartClick: () => void;
}

const Header = ({ cartCount, cartTotal, onCartClick }: HeaderProps) => {
  return (
    <header className="relative">
      {/* Hero Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/95 to-primary/80 z-0" />
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-4 sm:py-8 safe-area-inset-top">
        {/* Top Bar - Mobile optimized */}
        <div className="flex items-center justify-between mb-4 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 text-primary-foreground/80 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>06:00 — 23:30</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Центр Алматы</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={onCartClick}
            size="sm"
            className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 transition-all text-xs sm:text-sm px-3 sm:px-4"
          >
            <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            <span className="hidden xs:inline">Корзина </span>({cartCount})
          </Button>
        </div>

        {/* Main Hero - Mobile optimized */}
        <div className="text-center py-6 sm:py-12">
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-2 sm:mb-4 tracking-tight">
            Arasan Wellness & SPA
          </h1>
          <p className="text-primary-foreground/80 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto px-2">
            Премиальный банный комплекс в самом сердце Алматы
          </p>
        </div>

        {/* Cart Summary (Floating) - Mobile optimized */}
        {cartCount > 0 && (
          <div className="absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 bg-card shadow-xl rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3 sm:gap-4 border border-border w-[calc(100%-2rem)] sm:w-auto max-w-sm sm:max-w-none">
            <div className="text-xs sm:text-sm flex-1 sm:flex-none">
              <span className="text-muted-foreground">Заказ:</span>
              <span className="ml-1.5 sm:ml-2 font-semibold text-foreground">{cartTotal.toLocaleString()} ₸</span>
            </div>
            <Button onClick={onCartClick} size="sm" className="bg-primary hover:bg-primary/90 text-xs sm:text-sm">
              Оформить
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;