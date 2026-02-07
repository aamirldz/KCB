import { MenuItem } from '@/types/menu';

export const menuItems: MenuItem[] = [
    // Korean Special Ramen variants
    {
        id: 'korean-special-ramen-veg',
        name: 'Korean Special Ramen (Veg)',
        description: 'Premium vegetarian ramen with rich spicy broth, soft-boiled egg, fresh vegetables, green onions, and nori seaweed',
        price: 429,
        category: 'bowls',
        spiceLevel: 2,
        isVeg: true,
        isAvailable: true,
        image: '/images/menu/korean-special-ramen.png',
        tags: ['popular'],
    },
    {
        id: 'korean-special-ramen-chicken',
        name: 'Korean Special Ramen (Chicken)',
        description: 'Premium chicken ramen with rich spicy broth, tender chicken, soft-boiled egg, green onions, and nori seaweed',
        price: 509,
        category: 'bowls',
        spiceLevel: 2,
        isVeg: false,
        isAvailable: true,
        image: '/images/menu/korean-special-ramen.png',
        tags: ['popular', 'chef-special'],
    },
    {
        id: 'korean-special-ramen-mutton',
        name: 'Korean Special Ramen (Mutton)',
        description: 'Premium mutton ramen with rich spicy broth, succulent mutton pieces, soft-boiled egg, green onions, and nori seaweed',
        price: 559,
        category: 'bowls',
        spiceLevel: 2,
        isVeg: false,
        isAvailable: true,
        image: '/images/menu/korean-special-ramen.png',
        tags: ['chef-special'],
    },

    // Korean Spicy Ramen variants
    {
        id: 'korean-spicy-ramen-veg',
        name: 'Korean Spicy Ramen (Veg)',
        description: 'Special Korean ramen with fiery spicy soup, curly noodles, soft-boiled egg, spinach, and sesame seeds',
        price: 329,
        category: 'bowls',
        spiceLevel: 3,
        isVeg: true,
        isAvailable: true,
        image: '/images/menu/korean-spicy-ramen.png',
        tags: [],
    },
    {
        id: 'korean-spicy-ramen-chicken',
        name: 'Korean Spicy Ramen (Chicken)',
        description: 'Special Korean ramen with fiery spicy chicken soup, curly noodles, tender chicken, soft-boiled egg, and spinach',
        price: 409,
        category: 'bowls',
        spiceLevel: 3,
        isVeg: false,
        isAvailable: true,
        image: '/images/menu/korean-spicy-ramen.png',
        tags: ['popular'],
    },
    {
        id: 'korean-spicy-ramen-mutton',
        name: 'Korean Spicy Ramen (Mutton)',
        description: 'Special Korean ramen with fiery spicy mutton soup, curly noodles, succulent mutton, soft-boiled egg, and spinach',
        price: 459,
        category: 'bowls',
        spiceLevel: 3,
        isVeg: false,
        isAvailable: true,
        image: '/images/menu/korean-spicy-ramen.png',
        tags: [],
    },

    // Shin Ramen variants
    {
        id: 'shin-ramen-veg',
        name: 'Shin Ramen (Veg)',
        description: 'Classic Korean shin ramen noodles with spicy vegetable broth, soft-boiled egg, mushrooms, and green onions',
        price: 319,
        category: 'noodles',
        spiceLevel: 2,
        isVeg: true,
        isAvailable: true,
        image: '/images/menu/shin-ramen.png',
        tags: [],
    },
    {
        id: 'shin-ramen-chicken',
        name: 'Shin Ramen (Chicken)',
        description: 'Classic Korean shin ramen noodles with spicy chicken broth, tender chicken, soft-boiled egg, and mushrooms',
        price: 409,
        category: 'noodles',
        spiceLevel: 2,
        isVeg: false,
        isAvailable: true,
        image: '/images/menu/shin-ramen.png',
        tags: ['popular'],
    },
    {
        id: 'shin-ramen-mutton',
        name: 'Shin Ramen (Mutton)',
        description: 'Classic Korean shin ramen noodles with spicy mutton broth, succulent mutton pieces, soft-boiled egg, and mushrooms',
        price: 449,
        category: 'noodles',
        spiceLevel: 2,
        isVeg: false,
        isAvailable: true,
        image: '/images/menu/shin-ramen.png',
        tags: [],
    },

    // Bibimbap variants
    {
        id: 'bibimbap-veg',
        name: 'Bibimbap (Veg)',
        description: 'Traditional Korean rice bowl with assorted colorful vegetables, fried egg, gochujang chili paste, and sesame seeds',
        price: 409,
        category: 'rice',
        spiceLevel: 1,
        isVeg: true,
        isAvailable: true,
        image: '/images/menu/bibimbap.png',
        tags: ['popular'],
    },
    {
        id: 'bibimbap-chicken',
        name: 'Bibimbap (Chicken)',
        description: 'Traditional Korean rice bowl with tender chicken, colorful vegetables, fried egg, gochujang chili paste, and sesame seeds',
        price: 459,
        category: 'rice',
        spiceLevel: 1,
        isVeg: false,
        isAvailable: true,
        image: '/images/menu/bibimbap.png',
        tags: ['chef-special'],
    },
    {
        id: 'bibimbap-mutton',
        name: 'Bibimbap (Mutton)',
        description: 'Traditional Korean rice bowl with succulent mutton, colorful vegetables, fried egg, gochujang chili paste, and sesame seeds',
        price: 509,
        category: 'rice',
        spiceLevel: 1,
        isVeg: false,
        isAvailable: true,
        image: '/images/menu/bibimbap.png',
        tags: [],
    },
];

// Helper functions
export const getPopularItems = () => {
    return menuItems.filter(item => item.tags.includes('popular'));
};

export const getChefSpecials = () => {
    return menuItems.filter(item => item.tags.includes('chef-special'));
};

export const getVegItems = () => {
    return menuItems.filter(item => item.isVeg);
};

export const getNonVegItems = () => {
    return menuItems.filter(item => !item.isVeg);
};

export const getItemsByCategory = (category: string) => {
    if (category === 'all') return menuItems;
    return menuItems.filter(item => item.category === category);
};
