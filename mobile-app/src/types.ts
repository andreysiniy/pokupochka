export type Category = { key: string; label: string };

export type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  oldPrice: number;
  rating: number;
  unit: string;
  stock: number;
  imageKey: string;
};

export type CartItem = Product & { qty: number };

export type SavedAddress = {
  id: string;
  label: string;
  city: string;
  street: string;
  house: string;
  apartment: string;
  floor: string;
  entrance: string;
};
