
import { MenuItem, Category } from './types.ts';

export const BRAND_INFO = {
  motto: "Good Food. Since '94.",
  promise: "Fresh meals for our neighbors.",
  foundingYear: 1994,
  ownerNames: "Sarah & James Miller",
  colors: {
    primary: "stone-900",
    accent: "orange-950",
    bg: "stone-50",
  }
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: "Grandpa's Meatloaf",
    description: "Our #1 seller for 30 years. Served with real mashed potatoes, brown gravy, and green beans.",
    price: 16.50,
    category: 'mains',
    image: {
      localSrc: '/images/menu/grandpas-meatloaf.jpg',
      // fallback photography (until local images are added)
      fallbackSrc: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200',
    },
    isGrandpaChoice: true,
    isVegetarian: false,
    isGlutenFree: false
  },
  {
    id: '2',
    name: "Cincy Chili Mac",
    description: "Classic local chili with a hint of cinnamon over thick noodles. Topped with plenty of cheddar.",
    price: 13.00,
    category: 'mains',
    image: {
      localSrc: '/images/menu/cincy-chili-mac.jpg',
      fallbackSrc: 'https://images.unsplash.com/photo-1604908176997-125f25cc500f?auto=format&fit=crop&q=80&w=1200',
    },
    isVegetarian: false,
    isGlutenFree: false
  },
  {
    id: '3',
    name: "Main St. Burger",
    description: "Fresh beef from the local market, American cheese, and pickles. Simple and filling.",
    price: 14.50,
    category: 'mains',
    image: {
      localSrc: '/images/menu/main-st-burger.jpg',
      fallbackSrc: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=1200',
    },
    isVegetarian: false,
    isGlutenFree: false
  },
  {
    id: '4',
    name: "Buttermilk Chicken",
    description: "Three pieces of crispy chicken. Served with a hot biscuit and honey butter.",
    price: 17.00,
    category: 'mains',
    image: {
      localSrc: '/images/menu/buttermilk-chicken.jpg',
      fallbackSrc: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&q=80&w=1200',
    },
    isVegetarian: false,
    isGlutenFree: false
  },
  {
    id: '5',
    name: "House Salad",
    description: "Fresh greens, walnuts, and our own house-made vinaigrette dressing.",
    price: 10.00,
    category: 'sides',
    image: {
      localSrc: '/images/menu/house-salad.jpg',
      fallbackSrc: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?auto=format&fit=crop&q=80&w=1200',
    },
    isVegetarian: true,
    isGlutenFree: true
  },
  {
    id: '7',
    name: "Roasted Veggie Plate",
    description: "Seasonal market vegetables roasted with garlic and herbs. Served with a side of fruit.",
    price: 14.00,
    category: 'mains',
    image: {
      localSrc: '/images/menu/roasted-veggie-plate.jpg',
      fallbackSrc: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=1200',
    },
    isVegetarian: true,
    isGlutenFree: true
  },
  {
    id: '8',
    name: "Butter Smashed Potatoes",
    description: "A large side of our daily mashed potatoes. No gravy (vegetarian friendly).",
    price: 5.50,
    category: 'sides',
    image: {
      localSrc: '/images/menu/butter-smashed-potatoes.jpg',
      fallbackSrc: 'https://images.unsplash.com/photo-1604908554162-45a3b0ce3f4f?auto=format&fit=crop&q=80&w=1200',
    },
    isVegetarian: true,
    isGlutenFree: true
  },
  {
    id: '6',
    name: "Peach Cobbler",
    description: "Made fresh this morning. Best served with a scoop of vanilla ice cream.",
    price: 6.50,
    category: 'dessert',
    image: {
      localSrc: '/images/menu/peach-cobbler.jpg',
      fallbackSrc: 'https://images.unsplash.com/photo-1621303837174-89787a7d2c63?auto=format&fit=crop&q=80&w=1200',
    },
    isVegetarian: true,
    isGlutenFree: false
  }
];

export const CATEGORIES: Category[] = [
  { id: 'all', label: 'All Items' },
  { id: 'mains', label: 'Dinner' },
  { id: 'sides', label: 'Sides' },
  { id: 'dessert', label: 'Dessert' }
];

export const RESTAURANT_INFO = {
  phone: "(513) 555-0123",
  address: "123 Miller Way, Milford, OH 45150",
  hours: [
    { day: "Tue - Thu", time: "11am - 9pm" },
    { day: "Fri - Sat", time: "11am - 10pm" },
    { day: "Sun", time: "10am - 8pm" },
    { day: "Mon", time: "Closed" }
  ]
};
