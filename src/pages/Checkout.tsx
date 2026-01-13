import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, User, Phone, Mail, CreditCard, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CartItem } from "@/components/CartDrawer";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems: CartItem[] = location.state?.items || [];
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate random entry code
    const entryCode = Math.floor(10000 + Math.random() * 90000).toString();
    const orderId = crypto.randomUUID();
    
    navigate(`/success/${orderId}`, {
      state: {
        entryCode,
        items: cartItems,
        total,
        customerInfo: formData,
      }
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Корзина пуста</p>
          <Button onClick={() => navigate("/")}>Вернуться к тарифам</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-spa-burgundy-light to-primary py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Назад к тарифам</span>
          </button>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary-foreground italic">
            Оформление заказа
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-10">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-10 max-w-5xl mx-auto">
          {/* Form Section */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Information Card */}
              <div className="bg-card rounded-2xl border border-border p-5 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl text-foreground">
                    Контактная информация
                  </h2>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium text-foreground flex items-center gap-1">
                      ФИО <span className="text-primary">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Введите ваше полное имя"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        className="pl-10 h-12 bg-background border-border focus:border-primary focus:ring-primary/20 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-foreground flex items-center gap-1">
                      Номер телефона <span className="text-primary">*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+7 (XXX) XXX-XXXX"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="pl-10 h-12 bg-background border-border focus:border-primary focus:ring-primary/20 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-1">
                      Email <span className="text-primary">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="pl-10 h-12 bg-background border-border focus:border-primary focus:ring-primary/20 rounded-xl"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Card */}
              <div className="bg-card rounded-2xl border border-border p-5 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl text-foreground">
                    Способ оплаты
                  </h2>
                </div>

                {/* Kaspi Button */}
                <button
                  type="button"
                  className="w-full bg-gradient-to-r from-[#F14635] to-[#E8432A] hover:from-[#E8432A] hover:to-[#D93C24] text-white rounded-xl py-4 px-6 flex items-center justify-center gap-4 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-white rounded-lg p-1.5">
                      <span className="text-[#F14635] font-bold text-sm">K</span>
                    </div>
                    <span className="font-semibold text-lg">Kaspi.kz</span>
                  </div>
                  <div className="w-px h-6 bg-white/30" />
                  <div className="bg-white/20 rounded-lg p-1.5">
                    <CreditCard className="w-5 h-5" />
                  </div>
                </button>

                <p className="text-xs text-muted-foreground text-center mt-4 flex items-center justify-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  Безопасная оплата через Kaspi Pay
                </p>
              </div>

              {/* Submit Button - Mobile */}
              <div className="lg:hidden">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-14 text-base font-semibold bg-gradient-to-r from-spa-burgundy-light to-primary hover:opacity-90 rounded-xl shadow-lg"
                >
                  {isSubmitting ? "Обработка..." : `Оплатить ${total.toLocaleString()} ₸`}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-sm lg:sticky lg:top-6">
              <h2 className="font-serif text-xl text-foreground mb-5 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Ваш заказ
              </h2>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-medium text-foreground text-sm">{item.title}</h3>
                          <span className="px-2 py-0.5 bg-accent/20 text-accent-foreground rounded-full text-xs font-medium">
                            Weekday
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.duration} • Кол-во: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-foreground">
                          {(item.price * item.quantity).toLocaleString()} ₸
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.price.toLocaleString()} ₸ / шт
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t border-border mt-5 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-medium">Итого</span>
                  <span className="text-2xl font-serif font-semibold text-primary">
                    {total.toLocaleString()} ₸
                  </span>
                </div>
              </div>

              {/* Submit Button - Desktop */}
              <div className="hidden lg:block mt-6">
                <Button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-spa-burgundy-light to-primary hover:opacity-90 rounded-xl shadow-lg"
                >
                  {isSubmitting ? "Обработка..." : "Оплатить"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
