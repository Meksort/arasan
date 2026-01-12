import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export interface CartItem {
  id: string;
  title: string;
  duration: string;
  price: number;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartDrawer = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }: CartDrawerProps) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md bg-card border-border safe-area-inset-right">
        <SheetHeader className="border-b border-border pb-3 sm:pb-4">
          <SheetTitle className="flex items-center gap-2 font-serif text-lg sm:text-xl">
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            Ваш заказ
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-[calc(100vh-160px)] sm:h-[calc(100vh-180px)] mt-4 sm:mt-6">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-muted flex items-center justify-center mb-3 sm:mb-4">
                <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm sm:text-base">Корзина пуста</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Добавьте тарифы для посещения</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 pr-1 sm:pr-2 -mr-1 sm:-mr-2">
                {items.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-muted/50 rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-start gap-3 sm:gap-4 animate-fade-in"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-sm sm:text-base truncate">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">{item.duration}</p>
                      <p className="text-primary font-semibold mt-0.5 sm:mt-1 text-sm sm:text-base">{item.price.toLocaleString()} ₸</p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-1.5 sm:gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-destructive active:scale-95"
                        onClick={() => onRemove(item.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </Button>
                      
                      <div className="flex items-center gap-0.5 sm:gap-1 bg-card rounded-md sm:rounded-lg p-0.5 sm:p-1 border border-border">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded active:scale-95"
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-5 sm:w-6 text-center text-xs sm:text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded active:scale-95"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-border pt-4 sm:pt-6 mt-3 sm:mt-4 safe-area-inset-bottom">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-muted-foreground text-sm sm:text-base">Итого:</span>
                  <span className="text-xl sm:text-2xl font-serif font-semibold text-foreground">
                    {total.toLocaleString()} ₸
                  </span>
                </div>
                
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 sm:h-12 text-sm sm:text-base active:scale-[0.98]">
                  Перейти к оплате
                </Button>
                
                <p className="text-[10px] sm:text-xs text-center text-muted-foreground mt-2 sm:mt-3">
                  Безопасная оплата картой
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
