import { Category, Product } from "../types";

export const categories: Category[] = [
  { key: "vegetables", label: "Овощи" },
  { key: "fruits", label: "Фрукты" },
  { key: "milk", label: "Молочные" },
  { key: "bread", label: "Выпечка" },
  { key: "grocery", label: "Бакалея" }
];

export const products: Product[] = [
  { id: 1, title: "Томаты сливка", category: "vegetables", price: 169, oldPrice: 219, rating: 4.8, unit: "500 г", stock: 10, imageKey: "vegetables" },
  { id: 2, title: "Огурцы", category: "vegetables", price: 149, oldPrice: 0, rating: 4.7, unit: "600 г", stock: 6, imageKey: "vegetables" },
  { id: 3, title: "Салат романо", category: "vegetables", price: 119, oldPrice: 0, rating: 4.4, unit: "1 шт", stock: 0, imageKey: "vegetables" },
  { id: 4, title: "Яблоки", category: "fruits", price: 229, oldPrice: 259, rating: 4.9, unit: "1 кг", stock: 14, imageKey: "fruits" },
  { id: 5, title: "Бананы", category: "fruits", price: 169, oldPrice: 199, rating: 4.7, unit: "1 кг", stock: 12, imageKey: "fruits" },
  { id: 6, title: "Клубника", category: "fruits", price: 329, oldPrice: 399, rating: 4.8, unit: "400 г", stock: 5, imageKey: "fruits" },
  { id: 7, title: "Молоко 3.2%", category: "milk", price: 109, oldPrice: 0, rating: 4.6, unit: "900 мл", stock: 9, imageKey: "milk" },
  { id: 8, title: "Сыр гауда", category: "milk", price: 239, oldPrice: 299, rating: 4.8, unit: "200 г", stock: 7, imageKey: "milk" },
  { id: 9, title: "Йогурт", category: "milk", price: 99, oldPrice: 0, rating: 4.5, unit: "180 г", stock: 11, imageKey: "milk" },
  { id: 10, title: "Хлеб ремесленный", category: "bread", price: 89, oldPrice: 0, rating: 4.3, unit: "450 г", stock: 15, imageKey: "bread" },
  { id: 11, title: "Круассан", category: "bread", price: 79, oldPrice: 99, rating: 4.5, unit: "2 шт", stock: 8, imageKey: "bread" },
  { id: 12, title: "Пита", category: "bread", price: 89, oldPrice: 0, rating: 4.2, unit: "4 шт", stock: 4, imageKey: "bread" },
  { id: 13, title: "Паста фузилли", category: "grocery", price: 119, oldPrice: 159, rating: 4.4, unit: "500 г", stock: 10, imageKey: "grocery" },
  { id: 14, title: "Рис жасмин", category: "grocery", price: 139, oldPrice: 0, rating: 4.5, unit: "900 г", stock: 7, imageKey: "grocery" },
  { id: 15, title: "Чай черный", category: "grocery", price: 159, oldPrice: 199, rating: 4.6, unit: "100 пак.", stock: 13, imageKey: "grocery" }
];
