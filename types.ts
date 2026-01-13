
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'Meze' | 'Grill' | 'Sides' | 'Dessert';
  dietary?: string[];
}

export interface BusinessHours {
  day: string;
  hours: string;
}

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
}
