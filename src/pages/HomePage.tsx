import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const HomePage = () => {
  const { addToCart } = useCart();
  const featuredProducts = products.slice(0, 4);
  const unicornProducts = products.filter(p => p.category === 'Единороги').slice(0, 4);

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product);
    toast.success('Товар добавлен в корзину!');
  };

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="text-6xl mb-4">🦄💖</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Обними единорога
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Магазин волшебных плюшевых единорогов для детей и взрослых 🌈✨
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/catalog">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                  Перейти в каталог
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-2 hover:border-primary transition-colors animate-fade-in">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="Truck" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Быстрая доставка</h3>
                <p className="text-muted-foreground">Доставим ваш заказ в течение 1-3 дней</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-secondary transition-colors animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Icon name="Shield" size={32} className="text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Гарантия качества</h3>
                <p className="text-muted-foreground">Официальная гарантия на все товары</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-colors animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Icon name="CreditCard" size={32} className="text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Удобная оплата</h3>
                <p className="text-muted-foreground">Поддержка всех популярных способов оплаты</p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Популярные товары</h2>
            <p className="text-muted-foreground">Самые востребованные позиции в нашем каталоге</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <Card
                key={product.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.inStock && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                      В наличии
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold">{product.rating}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {product.price.toLocaleString('ru-RU')} ₽
                    </span>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    >
                      <Icon name="ShoppingCart" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/catalog">
              <Button size="lg" variant="outline" className="group">
                Смотреть все товары
                <Icon name="ArrowRight" size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-pink-950/20 dark:via-purple-950/20 dark:to-blue-950/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-5xl">🦄</span>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Волшебные Плюшевые Единороги
              </h2>
              <span className="text-5xl">✨</span>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Окунитесь в мир магии с нашей коллекцией очаровательных плюшевых единорогов!
              Идеальный подарок для детей и всех, кто верит в чудеса 🌈
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {unicornProducts.map((product, index) => (
              <Card
                key={product.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-300 animate-scale-in border-2 border-pink-200 dark:border-pink-800 hover:border-pink-400 dark:hover:border-pink-600"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Icon name="Sparkles" size={14} />
                    Магия
                  </div>
                  {product.inStock && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                      В наличии
                    </div>
                  )}
                </div>
                <CardContent className="p-4 bg-gradient-to-b from-white to-pink-50 dark:from-gray-900 dark:to-pink-950/30">
                  <div className="flex items-center gap-1 mb-2">
                    <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold">{product.rating}</span>
                    <span className="text-xs text-muted-foreground ml-auto">🦄</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 line-clamp-1 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                      {product.price.toLocaleString('ru-RU')} ₽
                    </span>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                    >
                      <Icon name="ShoppingCart" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/catalog">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:opacity-90 text-white font-bold shadow-lg hover:shadow-xl transition-all"
              >
                <Icon name="Sparkles" size={20} className="mr-2" />
                Смотреть всех единорогов
                <span className="ml-2">🦄</span>
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            <Card className="border-2 border-pink-200 dark:border-pink-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">💝</div>
                <h3 className="font-bold text-lg mb-2">Идеальный подарок</h3>
                <p className="text-sm text-muted-foreground">
                  Восторг в глазах ребенка гарантирован!
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 dark:border-purple-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">✨</div>
                <h3 className="font-bold text-lg mb-2">Премиум качество</h3>
                <p className="text-sm text-muted-foreground">
                  Мягкие, безопасные, гипоаллергенные
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 dark:border-blue-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">🌈</div>
                <h3 className="font-bold text-lg mb-2">Большой выбор</h3>
                <p className="text-sm text-muted-foreground">
                  Разные цвета, размеры и стили
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;