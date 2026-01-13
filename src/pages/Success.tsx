import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CheckCircle2, Copy, Download, Home, Clock, Receipt, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/components/CartDrawer";
import { toast } from "@/hooks/use-toast";

interface SuccessState {
  entryCode: string;
  items: CartItem[];
  total: number;
  customerInfo: {
    fullName: string;
    phone: string;
    email: string;
  };
}

const Success = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const location = useLocation();
  const state = location.state as SuccessState | null;

  const handleCopyCode = () => {
    if (state?.entryCode) {
      navigator.clipboard.writeText(state.entryCode);
      toast({
        title: "Код скопирован!",
        description: "Код входа скопирован в буфер обмена",
      });
    }
  };

  if (!state) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Заказ не найден</p>
          <Button onClick={() => navigate("/")}>Вернуться на главную</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-spa-burgundy-light to-primary py-6 sm:py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary-foreground italic">
            Оплата прошла успешно!
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon & Message */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="relative inline-block mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto animate-fade-in">
                <CheckCircle2 className="w-10 h-10 sm:w-14 sm:h-14 text-green-500" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-accent animate-pulse" />
            </div>
            <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-2">
              Спасибо за покупку!
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Ваш заказ подтверждён. Код входа отправлен на вашу почту и телефон.
            </p>
          </div>

          {/* Entry Code Card */}
          <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 mb-6 shadow-sm">
            <div className="text-center">
              <p className="text-muted-foreground text-sm mb-3">Ваш код входа:</p>
              
              <div className="relative bg-background rounded-xl border-2 border-dashed border-primary/40 p-6 sm:p-8 mb-4">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-card px-3">
                  <span className="text-xs text-primary font-medium">ENTRY CODE</span>
                </div>
                
                <div className="font-mono text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.3em] text-primary">
                  {state.entryCode}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                Покажите этот 5-значный код на кассе при входе
              </p>

              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={handleCopyCode}
                  className="gap-2 rounded-xl"
                >
                  <Copy className="w-4 h-4" />
                  Скопировать
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 rounded-xl"
                >
                  <Download className="w-4 h-4" />
                  Сохранить
                </Button>
              </div>
            </div>
          </div>

          {/* Order Details Card */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm mb-6">
            <div className="bg-muted/50 px-5 sm:px-6 py-4 border-b border-border">
              <h3 className="font-serif text-lg sm:text-xl text-foreground flex items-center gap-2">
                <Receipt className="w-5 h-5 text-primary" />
                Детали заказа
              </h3>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              {/* Items */}
              {state.items.map((item, index) => (
                <div key={item.id} className="flex items-start justify-between gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">#{index + 1}</span>
                      <span className="font-medium text-foreground text-sm sm:text-base">{item.title}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      {item.duration}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Кол-во: {item.quantity}</p>
                    <p className="font-semibold text-foreground">{(item.price * item.quantity).toLocaleString()} ₸</p>
                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="font-medium text-foreground">Оплачено:</span>
                <span className="text-xl sm:text-2xl font-serif font-semibold text-primary">
                  {state.total.toLocaleString()} ₸
                </span>
              </div>

              {/* Order ID */}
              <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground pt-2">
                <span>ID заказа:</span>
                <span className="font-mono text-xs">{orderId}</span>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <Button 
              onClick={() => navigate("/")}
              className="gap-2 h-12 px-8 bg-gradient-to-r from-spa-burgundy-light to-primary hover:opacity-90 rounded-xl"
            >
              <Home className="w-4 h-4" />
              На главную
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Success;
