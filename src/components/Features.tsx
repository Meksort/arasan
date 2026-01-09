import { Shield, Zap, Clock, CreditCard } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Мгновенная покупка",
  },
  {
    icon: Shield,
    title: "Безопасная оплата",
  },
  {
    icon: Clock,
    title: "Без очередей",
  },
  {
    icon: CreditCard,
    title: "Гибкие тарифы",
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-medium text-foreground">{feature.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
