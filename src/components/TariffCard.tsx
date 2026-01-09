import { useState } from "react";
import { Plus, Minus, Clock, Users } from "lucide-react";
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

const TariffCard = ({ title, subtitle, timeSlot, options, icon, onAdd, delay = 0 }: TariffCardProps) => {
  const [selectedOption, setSelectedOption] = useState<TariffOption | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    if (selectedOption) {
      onAdd(selectedOption, quantity);
      setSelectedOption(null);
      setQuantity(1);
    }
  };

  const iconColors = {
    adult: "from-primary to-spa-burgundy-light",
    child: "from-accent to-spa-gold-light",
    senior: "from-spa-burgundy-light to-primary",
  };

  return (
    <div 
      className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Header */}
      <div className={cn("p-6 bg-gradient-to-br", iconColors[icon])}>
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium mb-3">
              {subtitle}
            </span>
            <h3 className="font-serif text-2xl text-white font-medium">{title}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 text-white/80 text-sm">
          <Clock className="w-4 h-4" />
          <span>{timeSlot}</span>
        </div>
      </div>

      {/* Options */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-3 mb-6">
          {options.map((option) => (
            <button
              key={option.duration}
              onClick={() => setSelectedOption(option)}
              className={cn(
                "p-4 rounded-xl border-2 text-left transition-all duration-200",
                selectedOption?.duration === option.duration
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              )}
            >
              <div className="text-sm text-muted-foreground">{option.duration}</div>
              <div className="text-lg font-semibold text-foreground">{option.price.toLocaleString()} ₸</div>
            </button>
          ))}
        </div>

        {/* Quantity & Add */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-muted rounded-xl p-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <Button 
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
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
