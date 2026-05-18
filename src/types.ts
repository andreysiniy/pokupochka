export type Category = {
  key: string;
  label: string;
  color: string;
};

export type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  oldPrice: number;
  rating: number;
  unit: string;
  image: string;
  stock: number;
};

export type CartItem = Product & { qty: number };
