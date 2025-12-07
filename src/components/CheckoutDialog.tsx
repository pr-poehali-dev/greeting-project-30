import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useUser } from '@/context/UserContext';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CheckoutDialog = ({ open, onOpenChange }: CheckoutDialogProps) => {
  const { user, isAuthenticated, createUser, addAddress, addOrder } = useUser();
  const { cart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    zipCode: '',
    deliveryDate: '',
    deliveryTime: '10:00-14:00',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStepOne = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Заполните все поля');
      return;
    }

    if (!isAuthenticated) {
      createUser(formData.name, formData.email, formData.phone);
      toast.success('Личный кабинет создан!');
    }

    setStep(2);
  };

  const handleStepTwo = () => {
    if (!formData.street || !formData.city || !formData.zipCode) {
      toast.error('Заполните адрес доставки');
      return;
    }

    addAddress({
      street: formData.street,
      city: formData.city,
      zipCode: formData.zipCode,
      isDefault: true,
    });

    setStep(3);
  };

  const handleStepThree = () => {
    if (!formData.deliveryDate) {
      toast.error('Выберите дату доставки');
      return;
    }

    setStep(4);
  };

  const handleConfirmOrder = () => {
    const order = {
      status: 'processing' as const,
      total: getTotalPrice(),
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      deliveryAddress: `${formData.city}, ${formData.street}`,
      deliveryDate: formData.deliveryDate,
      deliveryTime: formData.deliveryTime,
    };

    addOrder(order);
    clearCart();
    toast.success('Заказ успешно оформлен! 🎉');
    onOpenChange(false);
    navigate('/profile');
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Оформление заказа</DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
              {step > 1 ? <Icon name="Check" size={16} /> : '1'}
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
              {step > 2 ? <Icon name="Check" size={16} /> : '2'}
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
              {step > 3 ? <Icon name="Check" size={16} /> : '3'}
            </div>
            <div className={`w-16 h-1 ${step >= 4 ? 'bg-primary' : 'bg-gray-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 4 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
              4
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-semibold">Ваши данные</h3>
            <div>
              <Label htmlFor="name">Имя и фамилия</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Иван Петров"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="ivan@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+7 (999) 123-45-67"
              />
            </div>
            <Button onClick={handleStepOne} className="w-full bg-gradient-to-r from-primary to-secondary">
              Продолжить
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-semibold">Адрес доставки</h3>
            <div>
              <Label htmlFor="city">Город</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="Москва"
              />
            </div>
            <div>
              <Label htmlFor="street">Улица, дом, квартира</Label>
              <Input
                id="street"
                value={formData.street}
                onChange={(e) => handleInputChange('street', e.target.value)}
                placeholder="ул. Примерная, д. 1, кв. 10"
              />
            </div>
            <div>
              <Label htmlFor="zipCode">Индекс</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                placeholder="123456"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Назад
              </Button>
              <Button onClick={handleStepTwo} className="flex-1 bg-gradient-to-r from-primary to-secondary">
                Продолжить
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-semibold">Дата и время доставки</h3>
            <div>
              <Label htmlFor="deliveryDate">Дата доставки</Label>
              <Input
                id="deliveryDate"
                type="date"
                min={getTomorrowDate()}
                value={formData.deliveryDate}
                onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
              />
            </div>
            <div>
              <Label>Время доставки</Label>
              <RadioGroup value={formData.deliveryTime} onValueChange={(value) => handleInputChange('deliveryTime', value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="10:00-14:00" id="time1" />
                  <Label htmlFor="time1" className="cursor-pointer">10:00 - 14:00</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="14:00-18:00" id="time2" />
                  <Label htmlFor="time2" className="cursor-pointer">14:00 - 18:00</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="18:00-22:00" id="time3" />
                  <Label htmlFor="time3" className="cursor-pointer">18:00 - 22:00</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Назад
              </Button>
              <Button onClick={handleStepThree} className="flex-1 bg-gradient-to-r from-primary to-secondary">
                Продолжить
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-semibold">Подтверждение заказа</h3>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Контактные данные</p>
                <p className="font-semibold">{formData.name}</p>
                <p className="text-sm">{formData.email} • {formData.phone}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Адрес доставки</p>
                <p className="font-semibold">{formData.city}, {formData.street}</p>
                <p className="text-sm">Индекс: {formData.zipCode}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Доставка</p>
                <p className="font-semibold">{new Date(formData.deliveryDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}</p>
                <p className="text-sm">{formData.deliveryTime}</p>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-bold">
                <span>Итого к оплате:</span>
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {getTotalPrice().toLocaleString('ru-RU')} ₽
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(3)} className="flex-1">
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Назад
              </Button>
              <Button onClick={handleConfirmOrder} className="flex-1 bg-gradient-to-r from-primary to-secondary">
                Подтвердить заказ
                <Icon name="Check" size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
