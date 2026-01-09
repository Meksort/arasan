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
      <SheetContent className="w-full sm:max-w-md bg-card border-border">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="flex items-center gap-2 font-serif text-xl">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Ваш заказ
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-[calc(100vh-180px)] mt-6">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Корзина пуста</p>
              <p className="text-sm text-muted-foreground mt-1">Добавьте тарифы для посещения</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {items.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-muted/50 rounded-xl p-4 flex items-start gap-4 animate-fade-in"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.duration}</p>
                      <p className="text-primary font-semibold mt-1">{item.price.toLocaleString()} ₸</p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => onRemove(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      
                      <div className="flex items-center gap-1 bg-card rounded-lg p-1 border border-border">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded"
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded"
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
              <div className="border-t border-border pt-6 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Итого:</span>
                  <span className="text-2xl font-serif font-semibold text-foreground">
                    {total.toLocaleString()} ₸
                  </span>
                </div>
                
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base">
                  Перейти к оплате
                </Button>
                
                <p className="text-xs text-center text-muted-foreground mt-3">
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
