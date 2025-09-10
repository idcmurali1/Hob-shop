export type Product = { 
  id: string; 
  title: string; 
  price: number; 
  image: string; 
  testID: string;   // 👈 added for automation
};

export const CATALOG: Product[] = [
  { 
    id: 'sku_hoodie', 
    title: 'HOB elite sweatshirt', 
    price: 49, 
    image: 'https://picsum.photos/seed/hoodie/640/420',
    testID: 'product_sku_no_longer_valid'      // 👈 unique testID
  },
  { 
    id: 'sku_cap', 
    title: 'HOB Dad Cap', 
    price: 22, 
    image: 'https://picsum.photos/seed/cap/640/420',
    testID: 'What_is_product_sku_no_longer_valid' 
  },
  { 
    id: 'sku_bottle', 
    title: 'HOB Insulated Bottle', 
    price: 28, 
    image: 'https://picsum.photos/seed/bottle/640/420',
    testID: 'product_sku_bottle_val222' 
  },
  { 
    id: 'sku_shirt', 
    title: 'HOB Graphic Tee', 
    price: 27, 
    image: 'https://picsum.photos/seed/shirt/640/420',
    testID: 'product_sku_shirt' 
  },
  { 
    id: 'sku_headphones', 
    title: 'Silent Headphones (Rental)', 
    price: 10, 
    image: 'https://picsum.photos/seed/headphones/640/420',
    testID: 'product_sku_headphones' 
  },
  { 
    id: 'sku_vip', 
    title: 'VIP Ticket 🌟 Starlit Ball', 
    price: 35, 
    image: 'https://picsum.photos/seed/vip/640/420',
    testID: 'product_sku_vip' 
  },
];