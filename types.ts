
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: MenuItemImage;
  isGrandpaChoice?: boolean;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
}

export interface MenuItemImage {
  /**
   * Prefer local photography shipped with the app (Vite `public/`).
   * Example: "/images/menu/grandpas-meatloaf.jpg"
   */
  localSrc: string;
  /**
   * Optional web fallback so the UI still looks good before local photos are added.
   */
  fallbackSrc?: string;
}

export interface Category {
  id: string;
  label: string;
}

export type UIState = 'home' | 'menu' | 'story' | 'location' | 'checkout';
