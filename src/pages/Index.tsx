import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  discount: string | null;
  description: string;
};

type CartItem = Product & { quantity: number };

type Order = {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
};

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [balance, setBalance] = useState(2450);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      date: '2026-01-03',
      items: [{ id: 5, name: 'Telegram Premium 1 месяц', price: 299, category: 'Premium', image: 'https://cdn.poehali.dev/projects/39f5c18c-0755-4a2d-8eb1-fa9c526e6504/files/069985f1-b840-4d2a-a714-60e1b6cca150.jpg', discount: null, description: 'Доступ ко всем функциям Telegram Premium на 1 месяц', quantity: 1 }],
      total: 299,
      status: 'completed'
    }
  ]);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);
  const { toast } = useToast();

  const products: Product[] = [
    { 
      id: 1, 
      name: '50 Telegram Stars', 
      price: 99, 
      category: 'Stars', 
      image: 'https://cdn.poehali.dev/projects/39f5c18c-0755-4a2d-8eb1-fa9c526e6504/files/9ff665f6-087a-46d4-a0f1-ee4747270b26.jpg',
      discount: null,
      description: 'Используйте Stars для покупок и донатов в Telegram'
    },
    { 
      id: 2, 
      name: '100 Telegram Stars', 
      price: 189, 
      category: 'Stars', 
      image: 'https://cdn.poehali.dev/projects/39f5c18c-0755-4a2d-8eb1-fa9c526e6504/files/9ff665f6-087a-46d4-a0f1-ee4747270b26.jpg',
      discount: '-5%',
      description: 'Выгодный пакет Stars со скидкой 5%'
    },
    { 
      id: 3, 
      name: '500 Telegram Stars', 
      price: 899, 
      category: 'Stars', 
      image: 'https://cdn.poehali.dev/projects/39f5c18c-0755-4a2d-8eb1-fa9c526e6504/files/9ff665f6-087a-46d4-a0f1-ee4747270b26.jpg',
      discount: '-10%',
      description: 'Популярный пакет со скидкой 10%'
    },
    { 
      id: 4, 
      name: '1000 Telegram Stars', 
      price: 1699, 
      category: 'Stars', 
      image: 'https://cdn.poehali.dev/projects/39f5c18c-0755-4a2d-8eb1-fa9c526e6504/files/9ff665f6-087a-46d4-a0f1-ee4747270b26.jpg',
      discount: '-15%',
      description: 'Максимальная выгода! Скидка 15%'
    },
    { 
      id: 5, 
      name: 'Telegram Premium 1 месяц', 
      price: 299, 
      category: 'Premium', 
      image: 'https://cdn.poehali.dev/projects/39f5c18c-0755-4a2d-8eb1-fa9c526e6504/files/069985f1-b840-4d2a-a714-60e1b6cca150.jpg',
      discount: null,
      description: 'Доступ ко всем функциям Telegram Premium на 1 месяц'
    },
    { 
      id: 6, 
      name: 'Telegram Premium 3 месяца', 
      price: 799, 
      category: 'Premium', 
      image: 'https://cdn.poehali.dev/projects/39f5c18c-0755-4a2d-8eb1-fa9c526e6504/files/069985f1-b840-4d2a-a714-60e1b6cca150.jpg',
      discount: '-11%',
      description: 'Подписка на 3 месяца со скидкой 11%'
    },
    { 
      id: 7, 
      name: 'Telegram Premium 6 месяцев', 
      price: 1499, 
      category: 'Premium', 
      image: 'https://cdn.poehali.dev/projects/39f5c18c-0755-4a2d-8eb1-fa9c526e6504/files/069985f1-b840-4d2a-a714-60e1b6cca150.jpg',
      discount: '-17%',
      description: 'Полгода Premium с выгодой 17%'
    },
    { 
      id: 8, 
      name: 'Telegram Premium 12 месяцев', 
      price: 2799, 
      category: 'Premium', 
      image: 'https://cdn.poehali.dev/projects/39f5c18c-0755-4a2d-8eb1-fa9c526e6504/files/069985f1-b840-4d2a-a714-60e1b6cca150.jpg',
      discount: '-22%',
      description: 'Год Premium по лучшей цене! Экономия 22%'
    },
  ];

  const categories = ['Все', 'Stars', 'Premium'];
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const filteredProducts = selectedCategory === 'Все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const faqItems = [
    { q: 'Как оплатить покупку?', a: 'Мы принимаем оплату через СБП от всех банков России, включая ОТП Банк. После оформления заказа вы получите ссылку на оплату.' },
    { q: 'Можно ли вернуть деньги?', a: 'Возврат возможен в течение 14 дней, если товар не был использован.' },
    { q: 'Как получить бонусы?', a: 'Бонусы начисляются за каждую покупку и активность в приложении. 1 бонус = 1 рубль.' },
    { q: 'Как быстро приходят Stars и Premium?', a: 'Активация происходит автоматически в течение 1-5 минут после оплаты.' },
  ];

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast({
      title: "Добавлено в корзину",
      description: product.name,
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    const orderTotal = cartTotal;
    const newOrder: Order = {
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      total: orderTotal,
      status: 'pending'
    };

    try {
      const response = await fetch('https://functions.poehali.dev/606c19d1-e079-4eb1-a005-0892f3333d86', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: newOrder.id,
          amount: orderTotal,
          user_id: 'user123'
        })
      });

      const paymentData = await response.json();
      
      if (paymentData.payment_url) {
        setOrders([newOrder, ...orders]);
        setPaymentUrl(paymentData.payment_url);
        setPaymentId(paymentData.payment_id);
        setCart([]);
        setIsCartOpen(false);
        toast({
          title: "Заказ создан!",
          description: "Переходим к оплате через СБП",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать платеж. Попробуйте позже.",
        variant: "destructive"
      });
    }
  };

  const checkPaymentStatus = async () => {
    if (!paymentId) return;

    setIsCheckingPayment(true);
    try {
      const response = await fetch(
        `https://functions.poehali.dev/606c19d1-e079-4eb1-a005-0892f3333d86?payment_id=${paymentId}`
      );
      const statusData = await response.json();

      if (statusData.status === 'completed') {
        toast({
          title: "✅ Оплата успешна!",
          description: statusData.message,
        });
        setOrders(orders.map(order => 
          order.status === 'pending' ? { ...order, status: 'completed' as const } : order
        ));
        setPaymentUrl(null);
        setPaymentId(null);
      } else if (statusData.status === 'failed') {
        toast({
          title: "❌ Ошибка оплаты",
          description: statusData.message,
          variant: "destructive"
        });
        setPaymentUrl(null);
        setPaymentId(null);
      } else {
        toast({
          title: "⏳ Ожидаем оплату",
          description: statusData.message,
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось проверить статус оплаты",
        variant: "destructive"
      });
    } finally {
      setIsCheckingPayment(false);
    }
  };

  const topUpBalance = (amount: number) => {
    setBalance(balance + amount);
    toast({
      title: "Баланс пополнен",
      description: `+${amount} ₽`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-2xl mx-auto">
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-2xl">🦆</div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                DuckPrime
              </h1>
            </div>
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      {cart.map(item => (
                        <Card key={item.id} className="p-4">
                          <div className="flex gap-4">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm">{item.name}</h4>
                              <p className="text-primary font-bold">{item.price} ₽</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="h-7 w-7 p-0"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  -
                                </Button>
                                <span className="text-sm w-8 text-center">{item.quantity}</span>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="h-7 w-7 p-0"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  +
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="ml-auto"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <Icon name="Trash2" size={16} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                      <div className="border-t pt-4">
                        <div className="flex justify-between text-lg font-bold mb-4">
                          <span>Итого:</span>
                          <span className="text-primary">{cartTotal} ₽</span>
                        </div>
                        <Button className="w-full" size="lg" onClick={handleCheckout}>
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

          <TabsContent value="home" className="mt-0 px-4 animate-fade-in">
            <div className="bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl p-6 my-4 text-white animate-scale-in">
              <h2 className="text-xl font-bold mb-2">Выгодные предложения! ⭐</h2>
              <p className="text-sm opacity-90 mb-3">Купите Telegram Stars и Premium по лучшей цене</p>
              <Button className="bg-white text-primary hover:bg-white/90" onClick={() => setActiveTab('catalog')}>
                Смотреть все предложения
              </Button>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Популярное</h3>
              <div className="grid grid-cols-2 gap-3">
                {products.slice(0, 4).map((product, idx) => (
                  <Card 
                    key={product.id} 
                    className="p-4 hover:border-primary transition-all cursor-pointer animate-slide-up relative overflow-hidden group"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    {product.discount && (
                      <Badge className="absolute top-2 right-2 bg-accent text-white z-10">
                        {product.discount}
                      </Badge>
                    )}
                    <div className="relative mb-3">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-24 object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="font-medium text-sm mb-2 line-clamp-2">{product.name}</h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-primary font-bold">{product.price} ₽</span>
                      <Button 
                        size="sm" 
                        className="h-7 px-3"
                        onClick={() => addToCart(product)}
                      >
                        <Icon name="ShoppingCart" size={14} />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Категории</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Stars', 'Premium'].map((cat, idx) => (
                  <Card 
                    key={cat} 
                    className="p-6 text-center hover:border-primary transition-all cursor-pointer animate-scale-in group"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setActiveTab('catalog');
                    }}
                  >
                    <div className="relative w-16 h-16 mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <img 
                        src={cat === 'Stars' 
                          ? 'https://cdn.poehali.dev/projects/39f5c18c-0755-4a2d-8eb1-fa9c526e6504/files/9ff665f6-087a-46d4-a0f1-ee4747270b26.jpg'
                          : 'https://cdn.poehali.dev/projects/39f5c18c-0755-4a2d-8eb1-fa9c526e6504/files/069985f1-b840-4d2a-a714-60e1b6cca150.jpg'
                        }
                        alt={cat}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <p className="font-semibold">{cat === 'Stars' ? 'Telegram Stars' : 'Telegram Premium'}</p>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="catalog" className="mt-0 px-4 animate-fade-in">
            <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  className="cursor-pointer whitespace-nowrap"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>

            <div className="grid gap-3 pb-4">
              {filteredProducts.map((product, idx) => (
                <Card 
                  key={product.id} 
                  className="p-4 hover:border-primary transition-all cursor-pointer animate-slide-up relative overflow-hidden group"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  {product.discount && (
                    <Badge className="absolute top-3 right-3 bg-accent text-white z-10">
                      {product.discount}
                    </Badge>
                  )}
                  <div className="flex items-start gap-4">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-20 h-20 object-cover rounded-lg group-hover:scale-110 transition-transform"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{product.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{product.description}</p>
                        </div>
                        <span className="text-primary font-bold text-lg whitespace-nowrap ml-2">{product.price} ₽</span>
                      </div>
                      <Button 
                        className="w-full mt-2" 
                        onClick={() => addToCart(product)}
                      >
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        В корзину
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="mt-0 px-4 animate-fade-in">
            <Card className="p-6 mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-16 w-16 border-2 border-primary">
                  <AvatarFallback className="bg-primary text-white text-xl">
                    А
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg">Александр</h3>
                  <p className="text-sm text-muted-foreground">Premium пользователь</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-card rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-primary">{balance}</div>
                  <div className="text-xs text-muted-foreground">Баланс ₽</div>
                </div>
                <div className="bg-card rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-secondary">{orders.length}</div>
                  <div className="text-xs text-muted-foreground">Заказов</div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button 
                  className="flex-1" 
                  variant="outline"
                  onClick={() => topUpBalance(500)}
                >
                  +500 ₽
                </Button>
                <Button 
                  className="flex-1" 
                  variant="outline"
                  onClick={() => topUpBalance(1000)}
                >
                  +1000 ₽
                </Button>
              </div>
            </Card>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-3">История заказов</h3>
              {orders.length === 0 ? (
                <Card className="p-6 text-center text-muted-foreground">
                  У вас пока нет заказов
                </Card>
              ) : (
                <div className="space-y-2">
                  {orders.map(order => (
                    <Card key={order.id} className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <Badge variant={order.status === 'completed' ? 'default' : order.status === 'pending' ? 'secondary' : 'destructive'}>
                          {order.status === 'completed' ? 'Выполнен' : order.status === 'pending' ? 'В обработке' : 'Отменён'}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {order.items.map(item => `${item.name} x${item.quantity}`).join(', ')}
                      </div>
                      <div className="text-primary font-bold">{order.total} ₽</div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Card className="p-4 flex items-center justify-between cursor-pointer hover:border-primary transition-all">
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/20 p-2 rounded-lg">
                    <Icon name="CreditCard" size={20} className="text-secondary" />
                  </div>
                  <span className="font-medium">Способы оплаты</span>
                </div>
                <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
              </Card>

              <Card className="p-4 flex items-center justify-between cursor-pointer hover:border-primary transition-all">
                <div className="flex items-center gap-3">
                  <div className="bg-accent/20 p-2 rounded-lg">
                    <Icon name="Gift" size={20} className="text-accent" />
                  </div>
                  <span className="font-medium">Реферальная программа</span>
                </div>
                <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
              </Card>

              <Card className="p-4 flex items-center justify-between cursor-pointer hover:border-primary transition-all">
                <div className="flex items-center gap-3">
                  <div className="bg-muted p-2 rounded-lg">
                    <Icon name="Settings" size={20} />
                  </div>
                  <span className="font-medium">Настройки</span>
                </div>
                <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="support" className="mt-0 px-4 animate-fade-in">
            <Card className="p-6 mb-4 bg-gradient-to-br from-primary/10 to-secondary/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary p-3 rounded-full">
                  <Icon name="MessageCircle" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Поддержка 24/7</h3>
                  <p className="text-sm text-muted-foreground">Мы всегда на связи</p>
                </div>
              </div>
              <Button className="w-full">
                <Icon name="Send" size={16} className="mr-2" />
                Написать в поддержку
              </Button>
            </Card>

            <h3 className="text-lg font-semibold mb-3">Часто задаваемые вопросы</h3>
            <Accordion type="single" collapsible className="space-y-2">
              {faqItems.map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Card className="p-6 mt-4 text-center">
              <div className="text-4xl mb-3">📧</div>
              <h4 className="font-semibold mb-2">Не нашли ответ?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Напишите нам на почту и мы ответим в течение 24 часов
              </p>
              <Button variant="outline" className="w-full">
                support@duckprime.ru
              </Button>
            </Card>
          </TabsContent>

          <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border">
            <div className="max-w-2xl mx-auto">
              <TabsList className="w-full grid grid-cols-4 h-16 bg-transparent">
                <TabsTrigger 
                  value="home" 
                  className="flex flex-col gap-1 data-[state=active]:text-primary transition-all"
                >
                  <Icon name="Home" size={20} />
                  <span className="text-xs">Главная</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="catalog" 
                  className="flex flex-col gap-1 data-[state=active]:text-primary transition-all"
                >
                  <Icon name="Grid3x3" size={20} />
                  <span className="text-xs">Каталог</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="profile" 
                  className="flex flex-col gap-1 data-[state=active]:text-primary transition-all"
                >
                  <Icon name="User" size={20} />
                  <span className="text-xs">Профиль</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="support" 
                  className="flex flex-col gap-1 data-[state=active]:text-primary transition-all"
                >
                  <Icon name="HeadphonesIcon" size={20} />
                  <span className="text-xs">Поддержка</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
        </Tabs>

        <Dialog open={!!paymentUrl} onOpenChange={() => setPaymentUrl(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Оплата заказа</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Сумма к оплате</p>
                <p className="text-2xl font-bold text-primary">{cartTotal} ₽</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Для оплаты перейдите по ссылке ниже. Мы принимаем СБП от всех банков России.
                </p>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <Input 
                    value={paymentUrl || ''} 
                    readOnly 
                    className="flex-1"
                  />
                  <Button 
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(paymentUrl || '');
                      toast({ title: "Скопировано!" });
                    }}
                  >
                    <Icon name="Copy" size={16} />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  className="flex-1" 
                  size="lg"
                  onClick={() => {
                    window.open(paymentUrl || '', '_blank');
                    toast({ 
                      title: "Переход к оплате",
                      description: "Откроется новое окно для оплаты"
                    });
                  }}
                >
                  <Icon name="ExternalLink" size={16} className="mr-2" />
                  Перейти к оплате
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={checkPaymentStatus}
                  disabled={isCheckingPayment}
                >
                  <Icon name={isCheckingPayment ? "Loader2" : "RefreshCw"} size={16} className={isCheckingPayment ? "animate-spin" : ""} />
                </Button>
              </div>
              <p className="text-xs text-center text-muted-foreground">
                После оплаты нажмите кнопку обновления для проверки статуса
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}