import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const ProfilePage = () => {
  const handleSaveProfile = () => {
    toast.success('Профиль успешно обновлен!');
  };

  const orders = [
    { id: '001', date: '15.12.2024', status: 'Доставлен', total: 25980 },
    { id: '002', date: '10.12.2024', status: 'В пути', total: 12990 },
    { id: '003', date: '05.12.2024', status: 'Доставлен', total: 8990 },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Личный кабинет
            </h1>
            <p className="text-muted-foreground">Управляйте своими данными и заказами</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="md:col-span-1 animate-fade-in">
              <CardContent className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-secondary text-white">
                    ИП
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold mb-1">Иван Петров</h2>
                <p className="text-sm text-muted-foreground mb-4">ivan@example.com</p>
                <Button variant="outline" className="w-full">
                  <Icon name="Upload" size={16} className="mr-2" />
                  Загрузить фото
                </Button>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Личные данные</h3>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Имя</label>
                      <Input defaultValue="Иван" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Фамилия</label>
                      <Input defaultValue="Петров" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input type="email" defaultValue="ivan@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Телефон</label>
                    <Input defaultValue="+7 (999) 123-45-67" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Адрес доставки</label>
                    <Input placeholder="Введите адрес" />
                  </div>
                  <Button
                    onClick={handleSaveProfile}
                    className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  >
                    <Icon name="Save" size={16} className="mr-2" />
                    Сохранить изменения
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">История заказов</h3>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id}>
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon name="Package" size={20} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">Заказ #{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold mb-1 ${
                            order.status === 'Доставлен' ? 'text-green-600' : 'text-blue-600'
                          }`}
                        >
                          {order.status}
                        </p>
                        <p className="text-sm font-bold">
                          {order.total.toLocaleString('ru-RU')} ₽
                        </p>
                      </div>
                    </div>
                    {order.id !== orders[orders.length - 1].id && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid sm:grid-cols-2 gap-6 mt-8">
            <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Heart" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Избранное</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      12 товаров в списке желаний
                    </p>
                    <Button variant="outline" size="sm">
                      Посмотреть
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="CreditCard" size={24} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Способы оплаты</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      2 привязанные карты
                    </p>
                    <Button variant="outline" size="sm">
                      Управление
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
