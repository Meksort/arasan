import { useState } from "react";
import { Plus, Minus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TariffOption {
  duration: string;
  price: number;
}

interface TariffCardProps {
  title: string;
  subtitle: string;
  timeSlot: string;
  options: TariffOption[];
  icon: "adult" | "child" | "senior";
  onAdd: (option: TariffOption, quantity: number) => void;
  delay?: number;
}

const TariffCard = ({ title, subtitle, timeSlot, options, icon: _icon, onAdd, delay = 0 }: TariffCardProps) => {
  const [selectedOption, setSelectedOption] = useState<TariffOption | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    if (selectedOption) {
      onAdd(selectedOption, quantity);
      setSelectedOption(null);
      setQuantity(1);
    }
  };

  // Keep header color identical for all tariffs
  const headerGradient = "from-spa-burgundy-light to-primary";

  return (
    <div 
      className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group animate-fade-in w-full"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Header */}
      <div className={cn("p-4 sm:p-6 bg-gradient-to-br", headerGradient)}>
        <div>
          <span className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-[10px] sm:text-xs font-medium mb-2 sm:mb-3">
            {subtitle}
          </span>
          <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">{title}</h3>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 text-white/80 text-xs sm:text-sm">
          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>{timeSlot}</span>
        </div>
      </div>

      {/* Options */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
          {options.map((option) => (
            <button
              key={option.duration}
              onClick={() => setSelectedOption(option)}
              className={cn(
                "p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 text-left transition-all duration-200 active:scale-[0.98]",
                selectedOption?.duration === option.duration
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              )}
            >
              <div className="text-xs sm:text-sm text-muted-foreground">{option.duration}</div>
              <div className="text-base sm:text-lg font-semibold text-foreground">{option.price.toLocaleString()} ₸</div>
            </button>
          ))}
        </div>

        {/* Quantity & Add */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1 sm:gap-2 bg-muted rounded-lg sm:rounded-xl p-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 sm:h-9 sm:w-9 rounded-md sm:rounded-lg active:scale-95"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Button>
            <span className="w-6 sm:w-8 text-center font-medium text-sm sm:text-base">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 sm:h-9 sm:w-9 rounded-md sm:rounded-lg active:scale-95"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Button>
          </div>
          
          <Button 
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base h-10 sm:h-11 active:scale-[0.98]"
            disabled={!selectedOption}
            onClick={handleAdd}
          >
            Добавить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TariffCard;
