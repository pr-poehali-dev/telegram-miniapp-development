import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');

  const products = [
    { id: 1, name: 'Премиум подписка', price: 999, category: 'Подписки', emoji: '⭐' },
    { id: 2, name: 'Игровая валюта', price: 299, category: 'Игры', emoji: '💎' },
    { id: 3, name: 'Стикерпак', price: 149, category: 'Стикеры', emoji: '🎨' },
    { id: 4, name: 'VIP статус', price: 1499, category: 'Подписки', emoji: '👑' },
    { id: 5, name: 'Бонусные очки', price: 199, category: 'Бонусы', emoji: '🎯' },
    { id: 6, name: 'Эксклюзивный значок', price: 499, category: 'Значки', emoji: '🏆' },
  ];

  const categories = ['Все', 'Подписки', 'Игры', 'Стикеры', 'Бонусы', 'Значки'];
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const filteredProducts = selectedCategory === 'Все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const faqItems = [
    { q: 'Как оплатить покупку?', a: 'Используйте Telegram Stars или привяжите банковскую карту в настройках профиля.' },
    { q: 'Можно ли вернуть деньги?', a: 'Возврат возможен в течение 14 дней, если товар не был использован.' },
    { q: 'Как получить бонусы?', a: 'Бонусы начисляются за каждую покупку и активность в приложении.' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-2xl mx-auto">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="p-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Telegram Shop
            </h1>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

          <TabsContent value="home" className="mt-0 px-4 animate-fade-in">
            <div className="bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl p-6 my-4 text-white animate-scale-in">
              <h2 className="text-xl font-bold mb-2">Новогодняя распродажа! 🎄</h2>
              <p className="text-sm opacity-90 mb-3">Скидки до 50% на все премиум подписки</p>
              <Button className="bg-white text-primary hover:bg-white/90">
                Смотреть предложения
              </Button>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Популярное</h3>
              <div className="grid grid-cols-2 gap-3">
                {products.slice(0, 4).map((product, idx) => (
                  <Card 
                    key={product.id} 
                    className="p-4 hover:border-primary transition-all cursor-pointer animate-slide-up"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="text-4xl mb-2">{product.emoji}</div>
                    <h4 className="font-medium text-sm mb-1">{product.name}</h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-primary font-bold">{product.price} ₽</span>
                      <Button size="sm" className="h-7 px-3">
                        <Icon name="ShoppingCart" size={14} />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Категории</h3>
              <div className="grid grid-cols-3 gap-3">
                {['Подписки', 'Игры', 'Стикеры'].map((cat, idx) => (
                  <Card 
                    key={cat} 
                    className="p-4 text-center hover:border-primary transition-all cursor-pointer animate-scale-in"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setActiveTab('catalog');
                    }}
                  >
                    <div className="text-3xl mb-1">
                      {cat === 'Подписки' ? '⭐' : cat === 'Игры' ? '🎮' : '🎨'}
                    </div>
                    <p className="text-xs font-medium">{cat}</p>
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
                  className="p-4 hover:border-primary transition-all cursor-pointer animate-slide-up"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{product.emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                        <span className="text-primary font-bold text-lg">{product.price} ₽</span>
                      </div>
                      <Button className="w-full mt-2">
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        Купить
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
                  <div className="text-2xl font-bold text-primary">2,450</div>
                  <div className="text-xs text-muted-foreground">Бонусов</div>
                </div>
                <div className="bg-card rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-secondary">12</div>
                  <div className="text-xs text-muted-foreground">Покупок</div>
                </div>
              </div>
            </Card>

            <div className="space-y-2">
              <Card className="p-4 flex items-center justify-between cursor-pointer hover:border-primary transition-all">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <Icon name="ShoppingBag" size={20} className="text-primary" />
                  </div>
                  <span className="font-medium">Мои покупки</span>
                </div>
                <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
              </Card>

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
                support@telegram-shop.ru
              </Button>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
          <div className="max-w-2xl mx-auto">
            <TabsList className="w-full grid grid-cols-4 h-16 bg-transparent">
              <TabsTrigger 
                value="home" 
                className="flex flex-col gap-1 data-[state=active]:text-primary"
              >
                <Icon name="Home" size={20} />
                <span className="text-xs">Главная</span>
              </TabsTrigger>
              <TabsTrigger 
                value="catalog" 
                className="flex flex-col gap-1 data-[state=active]:text-primary"
              >
                <Icon name="Grid3x3" size={20} />
                <span className="text-xs">Каталог</span>
              </TabsTrigger>
              <TabsTrigger 
                value="profile" 
                className="flex flex-col gap-1 data-[state=active]:text-primary"
              >
                <Icon name="User" size={20} />
                <span className="text-xs">Профиль</span>
              </TabsTrigger>
              <TabsTrigger 
                value="support" 
                className="flex flex-col gap-1 data-[state=active]:text-primary"
              >
                <Icon name="HeadphonesIcon" size={20} />
                <span className="text-xs">Поддержка</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
      </div>
    </div>
  );
}