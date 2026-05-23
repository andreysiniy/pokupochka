import { useMemo, useRef, useState } from "react";
import { useShop } from "../context/ShopContext";

const ADDRESSES_KEY = "shop.addresses";
const PROFILE_KEY = "shop.checkoutProfile";
const LOYALTY_PROFILE_KEY = "shop.loyaltyProfile";
const LOYALTY_HISTORY_KEY = "shop.loyaltyHistory";

type SavedAddress = {
  id: string;
  label: string;
  city: string;
  street: string;
  house: string;
  apartment: string;
  floor: string;
  entrance: string;
};

type SavedProfile = {
  name: string;
  phoneDigits: string;
};

type LoyaltyProfile = {
  phoneDigits: string;
  points: number;
  tier: "Silver" | "Gold";
};

type LoyaltyHistoryItem = {
  id: string;
  title: string;
  delta: number;
  createdAt: string;
};

function readAddresses(): SavedAddress[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ADDRESSES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is SavedAddress =>
        !!item &&
        typeof item === "object" &&
        typeof (item as { id?: unknown }).id === "string" &&
        typeof (item as { label?: unknown }).label === "string" &&
        typeof (item as { city?: unknown }).city === "string" &&
        typeof (item as { street?: unknown }).street === "string" &&
        typeof (item as { house?: unknown }).house === "string" &&
        typeof (item as { apartment?: unknown }).apartment === "string" &&
        typeof (item as { floor?: unknown }).floor === "string" &&
        typeof (item as { entrance?: unknown }).entrance === "string"
    );
  } catch {
    return [];
  }
}

function readProfile(): SavedProfile {
  if (typeof window === "undefined") return { name: "", phoneDigits: "" };
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    if (!raw) return { name: "", phoneDigits: "" };
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return { name: "", phoneDigits: "" };
    const name = typeof (parsed as { name?: unknown }).name === "string" ? (parsed as { name: string }).name : "";
    const phoneDigits =
      typeof (parsed as { phoneDigits?: unknown }).phoneDigits === "string"
        ? (parsed as { phoneDigits: string }).phoneDigits
        : "";
    return { name, phoneDigits };
  } catch {
    return { name: "", phoneDigits: "" };
  }
}

function toPhoneDigits(input: string) {
  const raw = input.replace(/\D/g, "");
  if (!raw) return "";
  const normalized = raw.replace(/^8/, "7");
  return (normalized.startsWith("7") ? normalized : `7${normalized}`).slice(0, 11);
}

function formatPhoneDisplay(digits: string) {
  if (!digits) return "";
  const d = digits.padEnd(11, "_");
  return `+7 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7, 9)}-${d.slice(9, 11)}`;
}

function isPhoneComplete(phoneDigits: string) {
  return phoneDigits.length === 11 && phoneDigits.startsWith("7");
}

function money(value: number) {
  return `${value} ₽`;
}

export function CheckoutPage() {
  const { cart, clearCart } = useShop();
  const profile = readProfile();
  const [name, setName] = useState(profile.name);
  const [phoneDigits, setPhoneDigits] = useState(profile.phoneDigits || "");
  const [comment, setComment] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [apartment, setApartment] = useState("");
  const [floor, setFloor] = useState("");
  const [entrance, setEntrance] = useState("");
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>(() => readAddresses());
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const phoneInputRef = useRef<HTMLInputElement | null>(null);

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);
  const delivery = total >= 2000 || total === 0 ? 0 : 199;
  const finalTotal = total + delivery;
  const eta = total === 0 ? "—" : total >= 3000 ? "45-60 мин" : "60-90 мин";

  const applySavedAddress = (id: string) => {
    setSelectedAddressId(id);
    const selected = savedAddresses.find((item) => item.id === id);
    if (!selected) return;
    setCity(selected.city);
    setStreet(selected.street);
    setHouse(selected.house);
    setApartment(selected.apartment);
    setFloor(selected.floor);
    setEntrance(selected.entrance);
  };

  const removeSavedAddress = (id: string) => {
    const next = savedAddresses.filter((item) => item.id !== id);
    setSavedAddresses(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(ADDRESSES_KEY, JSON.stringify(next));
    }
    if (selectedAddressId === id) {
      setSelectedAddressId("");
    }
  };

  const saveAddress = () => {
    if (!city.trim() || !street.trim() || !house.trim()) return;
    const newAddress: SavedAddress = {
      id: `addr-${Date.now()}`,
      label: `Адрес ${savedAddresses.length + 1}`,
      city: city.trim(),
      street: street.trim(),
      house: house.trim(),
      apartment: apartment.trim(),
      floor: floor.trim(),
      entrance: entrance.trim()
    };
    const next = [...savedAddresses, newAddress];
    setSavedAddresses(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(ADDRESSES_KEY, JSON.stringify(next));
    }
  };

  const submitOrder = () => {
    if (!name.trim() || !isPhoneComplete(phoneDigits) || !city.trim() || !street.trim() || !house.trim() || cart.length === 0) return;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(PROFILE_KEY, JSON.stringify({ name: name.trim(), phoneDigits }));

      const rawLoyalty = window.localStorage.getItem(LOYALTY_PROFILE_KEY);
      if (rawLoyalty) {
        try {
          const loyalty = JSON.parse(rawLoyalty) as LoyaltyProfile;
          if (loyalty.phoneDigits === phoneDigits) {
            const earned = Math.max(10, Math.floor(total * 0.03));
            const nextPoints = loyalty.points + earned;
            const nextTier: "Silver" | "Gold" = nextPoints >= 3000 ? "Gold" : "Silver";
            window.localStorage.setItem(
              LOYALTY_PROFILE_KEY,
              JSON.stringify({ ...loyalty, points: nextPoints, tier: nextTier })
            );

            const historyKey = `${LOYALTY_HISTORY_KEY}.${phoneDigits}`;
            const rawHistory = window.localStorage.getItem(historyKey);
            const history = rawHistory ? (JSON.parse(rawHistory) as LoyaltyHistoryItem[]) : [];
            const nextItem: LoyaltyHistoryItem = {
              id: `h-${Date.now()}`,
              title: `Покупка на ${money(total)}`,
              delta: earned,
              createdAt: new Date().toLocaleDateString("ru-RU")
            };
            window.localStorage.setItem(historyKey, JSON.stringify([nextItem, ...history].slice(0, 30)));
          }
        } catch {
          // ignore broken loyalty profile
        }
      }
    }
    clearCart();
    setComment("");
    alert("Заказ оформлен! Спасибо за покупку.");
  };

  const handlePhoneChange = (value: string, caret: number | null) => {
    const normalizedDigits = toPhoneDigits(value);

    let digitsBeforeCaret = 0;
    if (caret !== null) {
      for (let i = 0; i < Math.min(caret, value.length); i += 1) {
        if (/\d/.test(value[i])) digitsBeforeCaret += 1;
      }
    }
    if (digitsBeforeCaret > 0) digitsBeforeCaret = Math.max(1, digitsBeforeCaret);
    if (digitsBeforeCaret > normalizedDigits.length) digitsBeforeCaret = normalizedDigits.length;

    setPhoneDigits(normalizedDigits);

    requestAnimationFrame(() => {
      const input = phoneInputRef.current;
      if (!input) return;
      const display = formatPhoneDisplay(normalizedDigits);
      if (!display) {
        input.setSelectionRange(0, 0);
        return;
      }

      let seenDigits = 0;
      let targetPos = display.length;
      for (let i = 0; i < display.length; i += 1) {
        if (/\d/.test(display[i])) {
          seenDigits += 1;
          if (seenDigits >= digitsBeforeCaret) {
            targetPos = i + 1;
            break;
          }
        }
      }
      input.setSelectionRange(targetPos, targetPos);
    });
  };

  return (
    <section className="checkout-page">
      <h1>Оформление заказа</h1>
      <div className="checkout-grid">
        <div className="checkout-form">
          <label>Имя<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Как к вам обращаться" /></label>
          <label>
            Телефон
            <input
              ref={phoneInputRef}
              value={formatPhoneDisplay(phoneDigits)}
              onChange={(e) => handlePhoneChange(e.target.value, e.target.selectionStart)}
              placeholder="+7 (___) ___-__-__"
              inputMode="numeric"
            />
          </label>

          <div className="saved-addresses">
            <p>Сохраненные адреса</p>
            {savedAddresses.length === 0 ? <small>Пока нет сохраненных адресов</small> : null}
            {savedAddresses.map((item) => (
              <div key={item.id} className="saved-address-item">
                <button className={selectedAddressId === item.id ? "active" : ""} onClick={() => applySavedAddress(item.id)}>
                  {item.label}
                </button>
                <button className="outline" onClick={() => removeSavedAddress(item.id)}>Удалить</button>
              </div>
            ))}
          </div>

          <div className="address-grid">
            <label>Город<input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Город" /></label>
            <label>Улица<input value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Улица" /></label>
            <label>Дом<input value={house} onChange={(e) => setHouse(e.target.value)} placeholder="Дом" /></label>
            <label>Квартира<input value={apartment} onChange={(e) => setApartment(e.target.value)} placeholder="Кв." /></label>
            <label>Этаж<input value={floor} onChange={(e) => setFloor(e.target.value)} placeholder="Этаж" /></label>
            <label>Подъезд<input value={entrance} onChange={(e) => setEntrance(e.target.value)} placeholder="Подъезд" /></label>
          </div>
          <div className="checkout-actions">
            <button className="outline" onClick={saveAddress}>Сохранить адрес</button>
          </div>

          <label>Комментарий к заказу<textarea rows={3} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Например, позвонить за 10 минут" /></label>
          <button className="solid" onClick={submitOrder}>Подтвердить заказ</button>
        </div>

        <aside className="checkout-cart">
          <h2>Ваш заказ</h2>
          {cart.length === 0 ? <p>Корзина пустая.</p> : null}
          {cart.map((item) => (
            <div key={item.id} className="cart-row">
              <span>{item.title}</span>
              <span>x{item.qty}</span>
              <b>{money(item.qty * item.price)}</b>
            </div>
          ))}
          <div className="cart-summary">
            <div><span>Товары</span><b>{money(total)}</b></div>
            <div><span>Доставка</span><b>{delivery === 0 ? "Бесплатно" : money(delivery)}</b></div>
            <div><span>Ожидание</span><b>{eta}</b></div>
            <div className="cart-total"><span>Итого</span><b>{money(finalTotal)}</b></div>
          </div>
        </aside>
      </div>
    </section>
  );
}
