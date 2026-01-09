import { useState } from "react";
import Header from "@/components/Header";
import TariffCard from "@/components/TariffCard";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const tariffs = [
  {
    id: "adult",
    title: "Взрослый тариф",
    subtitle: "Weekday",
    timeSlot: "07:00 - 16:00",
    icon: "adult" as const,
    options: [
      { duration: "1 час", price: 1800 },
      { duration: "2 часа", price: 3000 },
      { duration: "3 часа", price: 4000 },
      { duration: "Безлимит", price: 7000 },
    ],
  },
  {
    id: "child",
    title: "Детский тариф",
    subtitle: "Weekday",
    timeSlot: "07:00 - 16:00",
    icon: "child" as const,
    options: [
      { duration: "1 час", price: 700 },
      { duration: "2 часа", price: 1200 },
      { duration: "3 часа", price: 1600 },
      { duration: "Безлимит", price: 5500 },
    ],
  },
  {
    id: "senior",
    title: "Пенсионный тариф",
    subtitle: "Weekday",
    timeSlot: "00:01 - 24:00",
    icon: "senior" as const,
    options: [
      { duration: "1 час", price: 750 },
      { duration: "2 часа", price: 1500 },
      { duration: "3 часа", price: 2000 },
      { duration: "Безлимит", price: 6000 },
    ],
  },
];

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (tariffId: string, tariffTitle: string, option: { duration: string; price: number }, quantity: number) => {
    const itemId = `${tariffId}-${option.duration}`;
    const existingItem = cartItems.find(item => item.id === itemId);

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        id: itemId,
        title: tariffTitle,
        duration: option.duration,
        price: option.price,
        quantity,
      }]);
    }
    
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartCount={cartCount}
        cartTotal={cartTotal}
        onCartClick={() => setIsCartOpen(true)}
      />

      <Features />

      {/* Tariffs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent-foreground rounded-full text-sm font-medium mb-4">
              Сейчас доступно
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Доступные тарифы
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Выберите подходящий тариф, добавьте в корзину и оплатите онлайн. 
              Мгновенный доступ без очередей.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tariffs.map((tariff, index) => (
              <TariffCard
                key={tariff.id}
                title={tariff.title}
                subtitle={tariff.subtitle}
                timeSlot={tariff.timeSlot}
                options={tariff.options}
                icon={tariff.icon}
                delay={index * 150}
                onAdd={(option, quantity) => handleAddToCart(tariff.id, tariff.title, option, quantity)}
              />
            ))}
          </div>

          {/* All Tariffs Link */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-4 bg-card border border-border rounded-2xl px-6 py-4">
              <div className="text-left">
                <p className="font-medium text-foreground">Посмотреть все тарифы</p>
                <p className="text-sm text-muted-foreground">Другие временные слоты и варианты</p>
              </div>
              <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 transition-colors font-medium text-sm">
                Открыть
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
      />
    </div>
  );
};

export default Index;
