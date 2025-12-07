import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Address {
  id: string;
  street: string;
  city: string;
  zipCode: string;
  isDefault: boolean;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  deliveryAddress: string;
  deliveryDate?: string;
  deliveryTime?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  orders: Order[];
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  createUser: (name: string, email: string, phone: string) => void;
  updateUser: (updates: Partial<User>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  setDefaultAddress: (addressId: string) => void;
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const createUser = (name: string, email: string, phone: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      addresses: [],
      orders: [],
    };
    setUser(newUser);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    if (user) {
      const newAddress: Address = {
        ...address,
        id: Date.now().toString(),
      };
      setUser({
        ...user,
        addresses: [...user.addresses, newAddress],
      });
    }
  };

  const setDefaultAddress = (addressId: string) => {
    if (user) {
      setUser({
        ...user,
        addresses: user.addresses.map((addr) => ({
          ...addr,
          isDefault: addr.id === addressId,
        })),
      });
    }
  };

  const addOrder = (order: Omit<Order, 'id' | 'date'>) => {
    if (user) {
      const newOrder: Order = {
        ...order,
        id: `ORD-${Date.now()}`,
        date: new Date().toLocaleDateString('ru-RU'),
      };
      setUser({
        ...user,
        orders: [newOrder, ...user.orders],
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        createUser,
        updateUser,
        addAddress,
        setDefaultAddress,
        addOrder,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
