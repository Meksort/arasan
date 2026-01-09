import { Shield, Zap, Clock, CreditCard } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Мгновенная покупка",
    description: "Выберите тариф и оплатите за минуту",
  },
  {
    icon: Shield,
    title: "Безопасная оплата",
    description: "Защищённые платежи картой",
  },
  {
    icon: Clock,
    title: "Без очередей",
    description: "Проходите сразу по QR-коду",
  },
  {
    icon: CreditCard,
    title: "Гибкие тарифы",
    description: "От часа до безлимита",
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
