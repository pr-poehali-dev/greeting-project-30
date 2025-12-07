import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { products, categories } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const CatalogPage = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('Все категории');

  const filteredProducts =
    selectedCategory === 'Все категории'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product);
    toast.success('Товар добавлен в корзину!');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Каталог товаров
          </h1>
          <p className="text-muted-foreground">Найдите то, что вам нужно</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={`cursor-pointer px-4 py-2 text-sm transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90'
                  : 'hover:border-primary'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="mb-4 text-sm text-muted-foreground">
          Найдено товаров: <span className="font-semibold">{filteredProducts.length}</span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in"
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
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Icon name="Package" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Товары не найдены</h3>
            <p className="text-muted-foreground">Попробуйте выбрать другую категорию</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
