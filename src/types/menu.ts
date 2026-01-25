export type MenuCategory = 'starters' | 'bowls' | 'noodles' | 'sushi' | 'rice' | 'drinks';

export type SpiceLevel = 0 | 1 | 2 | 3;

export type MenuTag = 'popular' | 'chef-special' | 'new';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  isVeg: boolean;
  spiceLevel: SpiceLevel;
  image: string;
  tags: MenuTag[];
}

export interface MenuCategoryInfo {
  id: MenuCategory;
  name: string;
  description: string;
  icon: string;
}

export const MENU_CATEGORIES: MenuCategoryInfo[] = [
  { id: 'starters', name: 'Starters', description: 'Begin your journey', icon: '🥟' },
  { id: 'bowls', name: 'Bowls', description: 'Signature creations', icon: '🍜' },
  { id: 'noodles', name: 'Noodles', description: 'Hand-pulled perfection', icon: '🍝' },
  { id: 'sushi', name: 'Sushi', description: 'Fresh & artful', icon: '🍣' },
  { id: 'rice', name: 'Rice', description: 'Comfort classics', icon: '🍚' },
  { id: 'drinks', name: 'Drinks', description: 'Refresh & revive', icon: '🍵' },
];
