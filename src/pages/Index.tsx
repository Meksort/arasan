import { useState } from "react";
import Header from "@/components/Header";
import TariffCard from "@/components/TariffCard";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import arasanBuilding from "@/assets/arasan-building.jpg";
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
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        cartCount={cartCount}
        cartTotal={cartTotal}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Tariffs Section */}
      <section className="py-8 sm:py-16 pb-8 sm:pb-16 relative flex-1">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 pointer-events-none"
          style={{ backgroundImage: `url(${arasanBuilding})`, backgroundSize: 'cover', backgroundPosition: 'center bottom' }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-6 sm:mb-12">
            <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-accent/20 text-accent-foreground rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              Сейчас доступно
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-2 sm:mb-4">
              Доступные тарифы
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base px-2">
              Выберите подходящий тариф, добавьте в корзину и оплатите онлайн. 
              Мгновенный доступ без очередей.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
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
