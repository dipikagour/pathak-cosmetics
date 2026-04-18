export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
}

export const CATEGORIES = [
  { id: '1', name: 'Skincare', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=400&q=80' },
  { id: '2', name: 'Makeup', image: 'https://images.unsplash.com/photo-1512496115841-db0aaf52d81c?auto=format&fit=crop&w=400&q=80' },
  { id: '3', name: 'Hair Care', image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=400&q=80' },
  { id: '4', name: 'Fragrance', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=400&q=80' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Radiance Glow Serum',
    category: 'Skincare',
    price: 1299,
    originalPrice: 1599,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviews: 124,
    isNew: true,
  },
  {
    id: 'p2',
    name: 'Velvet Matte Lipstick',
    category: 'Makeup',
    price: 599,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80',
    rating: 4.5,
    reviews: 89,
  },
  {
    id: 'p3',
    name: 'Hydrating Night Cream',
    category: 'Skincare',
    price: 949,
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviews: 210,
  },
  {
    id: 'p4',
    name: 'Silk Revive Hair Oil',
    category: 'Hair Care',
    price: 799,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 'p5',
    name: 'Rose & Vanilla Perfume',
    category: 'Fragrance',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    reviews: 72,
    isNew: true,
  },
  {
    id: 'p6',
    name: 'Luminous Foundation',
    category: 'Makeup',
    price: 1150,
    originalPrice: 1300,
    image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=600&q=80',
    rating: 4.3,
    reviews: 45,
  },
  {
    id: 'p7',
    name: 'Gentle Foaming Cleanser',
    category: 'Skincare',
    price: 450,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600&q=80',
    rating: 4.4,
    reviews: 112,
  },
  {
    id: 'p8',
    name: 'Volume Boost Mascara',
    category: 'Makeup',
    price: 650,
    image: 'https://images.unsplash.com/photo-1631214500515-6902bebc017f?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviews: 201,
  }
];
