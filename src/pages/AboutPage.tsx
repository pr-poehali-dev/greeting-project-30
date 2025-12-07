import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const AboutPage = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              О магазине ShopHub
            </h1>
            <p className="text-xl text-muted-foreground">
              Ваш надежный партнер в мире онлайн-шопинга
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="animate-fade-in">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Target" size={24} className="text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Наша миссия</h2>
                <p className="text-muted-foreground">
                  Сделать качественные товары доступными для каждого, обеспечивая лучший сервис
                  и удобство покупок онлайн.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Icon name="Eye" size={24} className="text-secondary" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Наше видение</h2>
                <p className="text-muted-foreground">
                  Стать ведущей платформой электронной коммерции, где клиенты находят всё необходимое
                  в одном месте.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6">Почему выбирают нас</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="CheckCircle2" size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Широкий ассортимент</h3>
                    <p className="text-sm text-muted-foreground">
                      Более 10,000 товаров на любой вкус
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="CheckCircle2" size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Выгодные цены</h3>
                    <p className="text-sm text-muted-foreground">
                      Постоянные акции и специальные предложения
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="CheckCircle2" size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Быстрая доставка</h3>
                    <p className="text-sm text-muted-foreground">
                      Доставка по всей России от 1 дня
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="CheckCircle2" size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Поддержка 24/7</h3>
                    <p className="text-sm text-muted-foreground">
                      Всегда готовы помочь и ответить на вопросы
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Наши достижения</h2>
              <div className="grid sm:grid-cols-3 gap-8 mt-8">
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                    50K+
                  </div>
                  <p className="text-muted-foreground">Довольных клиентов</p>
                </div>
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                    10K+
                  </div>
                  <p className="text-muted-foreground">Товаров в каталоге</p>
                </div>
                <div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                    98%
                  </div>
                  <p className="text-muted-foreground">Положительных отзывов</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
