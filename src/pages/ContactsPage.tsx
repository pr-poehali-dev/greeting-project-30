import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const ContactsPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Контакты
            </h1>
            <p className="text-xl text-muted-foreground">
              Свяжитесь с нами удобным способом
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="animate-fade-in">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Телефон</h3>
                    <p className="text-muted-foreground mb-1">+7 (800) 555-35-35</p>
                    <p className="text-sm text-muted-foreground">Бесплатно по России</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" size={24} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Email</h3>
                    <p className="text-muted-foreground mb-1">support@shophub.ru</p>
                    <p className="text-sm text-muted-foreground">Ответим в течение 24 часов</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Адрес</h3>
                    <p className="text-muted-foreground mb-1">г. Москва, ул. Примерная, д. 1</p>
                    <p className="text-sm text-muted-foreground">Пн-Вс: 9:00 - 21:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="MessageCircle" size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Мессенджеры</h3>
                    <p className="text-muted-foreground mb-1">WhatsApp, Telegram</p>
                    <p className="text-sm text-muted-foreground">Онлайн-консультация</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Отправить сообщение</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Имя</label>
                    <Input placeholder="Ваше имя" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input type="email" placeholder="your@email.com" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Тема</label>
                  <Input placeholder="Тема сообщения" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Сообщение</label>
                  <Textarea placeholder="Опишите ваш вопрос..." rows={5} required />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  Отправить сообщение
                  <Icon name="Send" size={20} className="ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
