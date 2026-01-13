import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CheckCircle2, Copy, Download, Home, Clock, Receipt } from "lucide-react";
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
        {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 flex items-center justify-center animate-fade-in">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
            </div>
          </div>

          {/* Entry Code Card */}
          <div className="bg-card rounded-2xl border border-border p-5 sm:p-6 mb-5 shadow-sm">
            <p className="text-muted-foreground text-xs text-center mb-2">Ваш код входа:</p>
            
            <div className="relative bg-gradient-to-br from-background to-muted/30 rounded-xl border-2 border-dashed border-primary/30 p-5 sm:p-6 mb-3">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-card px-2">
                <span className="text-[10px] text-primary font-semibold tracking-wider">ENTRY CODE</span>
              </div>
              
              <div className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.25em] text-primary text-center">
                {state.entryCode}
              </div>
            </div>

            <p className="text-[11px] sm:text-xs text-muted-foreground text-center mb-4">
              Покажите этот 5-значный код на кассе при входе
            </p>

            <div className="flex gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyCode}
                className="gap-1.5 rounded-lg text-xs h-9"
              >
                <Copy className="w-3.5 h-3.5" />
                Скопировать
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 rounded-lg text-xs h-9"
              >
                <Download className="w-3.5 h-3.5" />
                Сохранить чек
              </Button>
            </div>
          </div>

          {/* Order Details Card */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm mb-5">
            <div className="bg-gradient-to-r from-muted/60 to-muted/30 px-4 sm:px-5 py-3 border-b border-border">
              <h3 className="font-serif text-base sm:text-lg text-foreground flex items-center gap-2">
                <Receipt className="w-4 h-4 text-primary" />
                Детали заказа
              </h3>
            </div>

            <div className="p-4 sm:p-5 space-y-3">
              {/* Items */}
              {state.items.map((item, index) => (
                <div key={item.id} className="flex items-start justify-between gap-3 pb-3 border-b border-border/60 last:border-0 last:pb-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-muted-foreground">#{index + 1}</span>
                      <span className="font-medium text-foreground text-xs sm:text-sm">{item.title}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[10px] sm:text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {item.duration}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Кол-во: {item.quantity}</p>
                    <p className="font-semibold text-foreground text-sm">{(item.price * item.quantity).toLocaleString()} ₸</p>
                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="font-medium text-foreground text-sm">Оплачено:</span>
                <span className="text-lg sm:text-xl font-serif font-semibold text-primary">
                  {state.total.toLocaleString()} ₸
                </span>
              </div>

              {/* Order ID */}
              <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground">
                <span>ID заказа:</span>
                <span className="font-mono">{orderId}</span>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center pb-4">
            <Button 
              onClick={() => navigate("/")}
              className="gap-2 h-10 sm:h-11 px-6 sm:px-8 bg-gradient-to-r from-spa-burgundy-light to-primary hover:opacity-90 rounded-xl text-sm"
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
