import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useUser } from '@/context/UserContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, isAuthenticated, updateUser, logout } = useUser();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center animate-fade-in">
            <Icon name="User" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Вход не выполнен</h2>
            <p className="text-muted-foreground mb-6">
              Оформите заказ, чтобы создать личный кабинет
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/catalog')}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              Перейти в каталог
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleSaveProfile = () => {
    toast.success('Профиль успешно обновлен!');
  };

  const handleLogout = () => {
    logout();
    toast.success('Вы вышли из аккаунта');
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500';
      case 'shipped':
        return 'bg-blue-500';
      case 'processing':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Доставлен';
      case 'shipped':
        return 'В пути';
      case 'processing':
        return 'Обрабатывается';
      case 'cancelled':
        return 'Отменен';
      default:
        return 'Ожидает';
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center justify-between animate-fade-in">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Личный кабинет
              </h1>
              <p className="text-muted-foreground">Управляйте своими данными и заказами</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="md:col-span-1 animate-fade-in">
              <CardContent className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-secondary text-white">
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold mb-1">{user.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">{user.email}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Icon name="Phone" size={16} />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Icon name="Package" size={16} />
                    <span>{user.orders.length} заказов</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Личные данные</h3>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Имя</label>
                      <Input
                        defaultValue={user.name.split(' ')[0]}
                        onChange={(e) => updateUser({ name: `${e.target.value} ${user.name.split(' ')[1] || ''}` })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Фамилия</label>
                      <Input
                        defaultValue={user.name.split(' ')[1] || ''}
                        onChange={(e) => updateUser({ name: `${user.name.split(' ')[0]} ${e.target.value}` })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      defaultValue={user.email}
                      onChange={(e) => updateUser({ email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Телефон</label>
                    <Input
                      defaultValue={user.phone}
                      onChange={(e) => updateUser({ phone: e.target.value })}
                    />
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

          {user.addresses.length > 0 && (
            <Card className="mt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Адреса доставки</h3>
                <div className="space-y-3">
                  {user.addresses.map((address) => (
                    <div
                      key={address.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:border-primary transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <Icon name="MapPin" size={20} className="text-primary" />
                        <div>
                          <p className="font-semibold">
                            {address.city}, {address.street}
                          </p>
                          <p className="text-sm text-muted-foreground">Индекс: {address.zipCode}</p>
                        </div>
                      </div>
                      {address.isDefault && (
                        <Badge className="bg-green-500">По умолчанию</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="mt-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">История заказов</h3>
              {user.orders.length === 0 ? (
                <div className="text-center py-8">
                  <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">У вас пока нет заказов</p>
                  <Button
                    className="mt-4 bg-gradient-to-r from-primary to-secondary"
                    onClick={() => navigate('/catalog')}
                  >
                    Перейти в каталог
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {user.orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 hover:border-primary transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold">Заказ #{order.id}</h4>
                            <Badge className={getStatusColor(order.status)}>
                              {getStatusText(order.status)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {order.date} • {order.items.length} товаров
                          </p>
                        </div>
                        <p className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          {order.total.toLocaleString('ru-RU')} ₽
                        </p>
                      </div>

                      <Separator className="my-3" />

                      <div className="grid sm:grid-cols-2 gap-4 mb-3">
                        <div className="flex items-start gap-2">
                          <Icon name="MapPin" size={16} className="text-muted-foreground mt-1" />
                          <div>
                            <p className="text-sm font-medium">Адрес доставки</p>
                            <p className="text-sm text-muted-foreground">{order.deliveryAddress}</p>
                          </div>
                        </div>
                        {order.deliveryDate && (
                          <div className="flex items-start gap-2">
                            <Icon name="Calendar" size={16} className="text-muted-foreground mt-1" />
                            <div>
                              <p className="text-sm font-medium">Дата и время</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(order.deliveryDate).toLocaleDateString('ru-RU')}
                                {order.deliveryTime && `, ${order.deliveryTime}`}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {order.items.slice(0, 4).map((item) => (
                          <div key={item.id} className="relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full aspect-square object-cover rounded-lg"
                            />
                            {item.quantity > 1 && (
                              <div className="absolute top-1 right-1 bg-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                {item.quantity}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>


        </div>
      </div>
    </div>
  );
};

export default ProfilePage;