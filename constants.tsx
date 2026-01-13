
import { MenuItem, BusinessHours } from './types';

export const BUSINESS_NAME = "Grey Chair";
export const TAGLINE = "Wood-Fired Kitchen";
export const ADDRESS = "1400 Race St, Cincinnati, OH 45202";
export const PHONE = "(513) 555-0123";

export const HOURS: BusinessHours[] = [
  { day: "Mon", hours: "Closed" },
  { day: "Tue – Thu", hours: "4:00 PM – 9:00 PM" },
  { day: "Fri – Sat", hours: "4:00 PM – 10:00 PM" },
  { day: "Sun", hours: "4:00 PM – 8:30 PM" }
];

export const MENU: MenuItem[] = [
  {
    id: 'm1',
    name: "Classic Hummus",
    description: "Chickpea, tahini, lemon, extra virgin olive oil. Served with warm house-made pita.",
    price: "9",
    category: "Meze",
    dietary: ["VG", "GF Options"]
  },
  {
    id: 'm2',
    name: "Lula Kebab",
    description: "Hand-minced lamb and beef seasoned with sumac and bell peppers. Wood-fired on steel skewers.",
    price: "26",
    category: "Grill",
    dietary: ["GF"]
  },
  {
    id: 'm3',
    name: "Octopus Salad",
    description: "Charred octopus, baby arugula, red onion, capers, lemon-oregano vinaigrette.",
    price: "18",
    category: "Meze"
  },
  {
    id: 'm4',
    name: "Adana Kebab",
    description: "Spicy minced lamb, charred tomato, grilled long pepper, bulgur pilaf.",
    price: "24",
    category: "Grill"
  },
  {
    id: 'm5',
    name: "Warm Olives",
    description: "Mixed Mediterranean olives marinated in citrus and herbs.",
    price: "7",
    category: "Meze",
    dietary: ["VG", "GF"]
  },
  {
    id: 'm6',
    name: "Pistachio Baklava",
    description: "Hand-rolled filo, crushed pistachios, honey syrup.",
    price: "10",
    category: "Dessert"
  }
];
