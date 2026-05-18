import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products } from "../data/shopData";
import type { CartItem, Product } from "../types";

const FAVORITES_KEY = "shop.favoriteIds";
const CART_KEY = "shop.cart";

type StoredCartItem = {
  id: number;
  qty: number;
};

function readFavoriteIds(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((value): value is number => Number.isInteger(value));
  } catch {
    return [];
  }
}

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    const normalized: StoredCartItem[] = parsed
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const id = (item as { id?: unknown }).id;
        const qty = (item as { qty?: unknown }).qty;
        if (!Number.isInteger(id) || !Number.isInteger(qty)) return null;
        if ((qty as number) <= 0) return null;
        return { id: id as number, qty: qty as number };
      })
      .filter((item): item is StoredCartItem => item !== null);

    return normalized
      .map((item) => {
        const product = products.find((p) => p.id === item.id);
        if (!product) return null;
        const qty = Math.min(item.qty, product.stock);
        if (qty <= 0) return null;
        return { ...product, qty };
      })
      .filter((item): item is CartItem => item !== null);
  } catch {
    return [];
  }
}

type ShopContextType = {
  products: Product[];
  favoriteIds: number[];
  cart: CartItem[];
  getCartQty: (id: number) => number;
  openedProduct: Product | null;
  cartOpen: boolean;
  productOpen: boolean;
  toggleFavorite: (id: number) => void;
  addToCart: (id: number) => void;
  decreaseCartItem: (id: number) => void;
  clearCart: () => void;
  clearFavorites: () => void;
  openProduct: (product: Product) => void;
  closeProduct: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const ShopContext = createContext<ShopContextType | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => readFavoriteIds());
  const [cart, setCart] = useState<CartItem[]>(() => readCart());
  const [openedProduct, setOpenedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const compact = cart.map((item) => ({ id: item.id, qty: item.qty }));
    window.localStorage.setItem(CART_KEY, JSON.stringify(compact));
  }, [cart]);

  const value = useMemo<ShopContextType>(
    () => ({
      products,
      favoriteIds,
      cart,
      getCartQty: (id) => cart.find((item) => item.id === id)?.qty ?? 0,
      openedProduct,
      cartOpen,
      productOpen: Boolean(openedProduct),
      toggleFavorite: (id) => {
        setFavoriteIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
      },
      addToCart: (id) => {
        const product = products.find((p) => p.id === id);
        if (!product) return;
        if (product.stock <= 0) return;
        setCart((prev) => {
          const found = prev.find((item) => item.id === id);
          if (found) {
            if (found.qty >= product.stock) return prev;
            return prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item));
          }
          return [...prev, { ...product, qty: 1 }];
        });
      },
      decreaseCartItem: (id) => {
        setCart((prev) => {
          const found = prev.find((item) => item.id === id);
          if (!found) return prev;
          if (found.qty <= 1) return prev.filter((item) => item.id !== id);
          return prev.map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item));
        });
      },
      clearCart: () => setCart([]),
      clearFavorites: () => setFavoriteIds([]),
      openProduct: setOpenedProduct,
      closeProduct: () => setOpenedProduct(null),
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false)
    }),
    [favoriteIds, cart, openedProduct, cartOpen]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used inside ShopProvider");
  return context;
}
