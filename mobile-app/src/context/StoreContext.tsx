import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products } from "../data/shopData";
import { CartItem, SavedAddress } from "../types";

const KEYS = {
  favorites: "shop.favoriteIds",
  cart: "shop.cart",
  addresses: "shop.addresses",
  checkoutProfile: "shop.checkoutProfile",
  loyaltyProfile: "shop.loyaltyProfile"
};

type CheckoutProfile = { name: string; phoneDigits: string };
type LoyaltyProfile = { phoneDigits: string; points: number; tier: "Silver" | "Gold" };

type StoreValue = {
  favoriteIds: number[];
  cart: CartItem[];
  addresses: SavedAddress[];
  checkoutProfile: CheckoutProfile;
  loyaltyProfile: LoyaltyProfile | null;
  toggleFavorite: (id: number) => void;
  addToCart: (id: number) => void;
  decCart: (id: number) => void;
  clearCart: () => void;
  clearFavorites: () => void;
  saveAddresses: (list: SavedAddress[]) => void;
  saveCheckoutProfile: (profile: CheckoutProfile) => void;
  loginLoyalty: (phoneDigits: string) => void;
  logoutLoyalty: () => void;
  addLoyaltyPoints: (amount: number) => void;
};

const Ctx = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [checkoutProfile, setCheckoutProfile] = useState<CheckoutProfile>({ name: "", phoneDigits: "" });
  const [loyaltyProfile, setLoyaltyProfile] = useState<LoyaltyProfile | null>(null);

  useEffect(() => {
    (async () => {
      const [favRaw, cartRaw, addrRaw, profileRaw, loyaltyRaw] = await Promise.all([
        AsyncStorage.getItem(KEYS.favorites),
        AsyncStorage.getItem(KEYS.cart),
        AsyncStorage.getItem(KEYS.addresses),
        AsyncStorage.getItem(KEYS.checkoutProfile),
        AsyncStorage.getItem(KEYS.loyaltyProfile)
      ]);
      if (favRaw) setFavoriteIds(JSON.parse(favRaw));
      if (cartRaw) {
        const compact: Array<{ id: number; qty: number }> = JSON.parse(cartRaw);
        setCart(
          compact
            .map((x) => {
              const p = products.find((pp) => pp.id === x.id);
              if (!p) return null;
              return { ...p, qty: Math.min(x.qty, p.stock) };
            })
            .filter(Boolean) as CartItem[]
        );
      }
      if (addrRaw) setAddresses(JSON.parse(addrRaw));
      if (profileRaw) setCheckoutProfile(JSON.parse(profileRaw));
      if (loyaltyRaw) setLoyaltyProfile(JSON.parse(loyaltyRaw));
    })();
  }, []);

  useEffect(() => { AsyncStorage.setItem(KEYS.favorites, JSON.stringify(favoriteIds)); }, [favoriteIds]);
  useEffect(() => { AsyncStorage.setItem(KEYS.cart, JSON.stringify(cart.map((x) => ({ id: x.id, qty: x.qty })))); }, [cart]);
  useEffect(() => { AsyncStorage.setItem(KEYS.addresses, JSON.stringify(addresses)); }, [addresses]);
  useEffect(() => { AsyncStorage.setItem(KEYS.checkoutProfile, JSON.stringify(checkoutProfile)); }, [checkoutProfile]);
  useEffect(() => {
    if (loyaltyProfile) AsyncStorage.setItem(KEYS.loyaltyProfile, JSON.stringify(loyaltyProfile));
    else AsyncStorage.removeItem(KEYS.loyaltyProfile);
  }, [loyaltyProfile]);

  const value = useMemo<StoreValue>(() => ({
    favoriteIds,
    cart,
    addresses,
    checkoutProfile,
    loyaltyProfile,
    toggleFavorite: (id) => setFavoriteIds((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id])),
    addToCart: (id) => setCart((prev) => {
      const product = products.find((p) => p.id === id);
      if (!product || product.stock <= 0) return prev;
      const found = prev.find((x) => x.id === id);
      if (!found) return [...prev, { ...product, qty: 1 }];
      if (found.qty >= product.stock) return prev;
      return prev.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x));
    }),
    decCart: (id) => setCart((prev) => {
      const f = prev.find((x) => x.id === id);
      if (!f) return prev;
      if (f.qty <= 1) return prev.filter((x) => x.id !== id);
      return prev.map((x) => (x.id === id ? { ...x, qty: x.qty - 1 } : x));
    }),
    clearCart: () => setCart([]),
    clearFavorites: () => setFavoriteIds([]),
    saveAddresses: (list) => setAddresses(list),
    saveCheckoutProfile: (profile) => setCheckoutProfile(profile),
    loginLoyalty: (phoneDigits) => {
      const pts = 500 + (Number(phoneDigits.slice(-4)) % 4500);
      setLoyaltyProfile({ phoneDigits, points: pts, tier: pts >= 3000 ? "Gold" : "Silver" });
    },
    logoutLoyalty: () => setLoyaltyProfile(null),
    addLoyaltyPoints: (amount) => setLoyaltyProfile((p) => {
      if (!p) return p;
      const points = p.points + amount;
      return { ...p, points, tier: points >= 3000 ? "Gold" : "Silver" };
    })
  }), [favoriteIds, cart, addresses, checkoutProfile, loyaltyProfile]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used in StoreProvider");
  return ctx;
}
