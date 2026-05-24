import React, { useMemo, useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { useStore } from "../context/StoreContext";
import { formatPhoneDisplay, isPhoneComplete, toPhoneDigits } from "../utils/phone";
import { theme } from "../theme";
import { Card } from "../components/ui/Card";
import { AppButton } from "../components/ui/AppButton";
import { AppInput } from "../components/ui/AppInput";
import { Screen } from "../components/ui/Screen";

export function CheckoutScreen() {
  const { cart, clearCart, checkoutProfile, saveCheckoutProfile, addLoyaltyPoints, addresses, saveAddresses } = useStore();
  const [name, setName] = useState(checkoutProfile.name);
  const [phoneDigits, setPhoneDigits] = useState(checkoutProfile.phoneDigits);
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [apartment, setApartment] = useState("");
  const [floor, setFloor] = useState("");
  const [entrance, setEntrance] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState("");

  const total = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart]);
  const delivery = total >= 2000 || total === 0 ? 0 : 199;
  const final = total + delivery;

  const submit = () => {
    if (!name.trim() || !isPhoneComplete(phoneDigits) || !city.trim() || !street.trim() || !house.trim() || cart.length === 0) return;
    saveCheckoutProfile({ name: name.trim(), phoneDigits });
    addLoyaltyPoints(Math.max(10, Math.floor(total * 0.03)));
    clearCart();
    Alert.alert("Заказ оформлен");
  };

  const saveAddress = () => {
    if (!city.trim() || !street.trim() || !house.trim()) return;
    const next = [
      ...addresses,
      {
        id: `addr-${Date.now()}`,
        label: `Адрес ${addresses.length + 1}`,
        city: city.trim(),
        street: street.trim(),
        house: house.trim(),
        apartment: apartment.trim(),
        floor: floor.trim(),
        entrance: entrance.trim()
      }
    ];
    saveAddresses(next);
  };

  const applyAddress = (id: string) => {
    setSelectedAddressId(id);
    const item = addresses.find((x) => x.id === id);
    if (!item) return;
    setCity(item.city);
    setStreet(item.street);
    setHouse(item.house);
    setApartment(item.apartment);
    setFloor(item.floor);
    setEntrance(item.entrance);
  };

  const removeAddress = (id: string) => {
    saveAddresses(addresses.filter((x) => x.id !== id));
    if (selectedAddressId === id) setSelectedAddressId("");
  };

  return (
    <Screen contentContainerStyle={styles.wrap}>
      <AppInput value={name} onChangeText={setName} placeholder="Имя" />
      <AppInput value={formatPhoneDisplay(phoneDigits)} onChangeText={(t) => setPhoneDigits(toPhoneDigits(t))} placeholder="Телефон" />
      <Card style={styles.savedBox}>
        <Text style={styles.savedTitle}>Сохраненные адреса</Text>
        {addresses.length === 0 ? <Text style={styles.summaryText}>Пока нет сохраненных адресов</Text> : null}
        {addresses.map((a) => (
          <Card key={a.id} style={styles.savedRow}>
            <Text>{a.label}</Text>
            <Text style={styles.summaryText}>{a.city}, {a.street}, {a.house}</Text>
            <Text style={styles.summaryText}>кв. {a.apartment || "-"}, этаж {a.floor || "-"}, подъезд {a.entrance || "-"}</Text>
            <Card style={styles.savedActions}>
              <AppButton label="Выбрать" variant={selectedAddressId === a.id ? "soft" : "outline"} onPress={() => applyAddress(a.id)} />
              <AppButton label="Удалить" onPress={() => removeAddress(a.id)} />
            </Card>
          </Card>
        ))}
      </Card>
      <AppInput value={city} onChangeText={setCity} placeholder="Город" />
      <AppInput value={street} onChangeText={setStreet} placeholder="Улица" />
      <AppInput value={house} onChangeText={setHouse} placeholder="Дом" />
      <AppInput value={apartment} onChangeText={setApartment} placeholder="Квартира" />
      <AppInput value={floor} onChangeText={setFloor} placeholder="Этаж" />
      <AppInput value={entrance} onChangeText={setEntrance} placeholder="Подъезд" />
      <AppButton label="Сохранить адрес" onPress={saveAddress} />
      <Card style={styles.summary}>
        {cart.map((i) => <Text key={i.id}>{i.title} x{i.qty}</Text>)}
        <Text style={styles.summaryText}>Товары: {total} ₽</Text>
        <Text style={styles.summaryText}>Доставка: {delivery === 0 ? "Бесплатно" : `${delivery} ₽`}</Text>
        <Text style={styles.total}>Итого: {final} ₽</Text>
      </Card>
      <AppButton variant="solid" label="Подтвердить заказ" onPress={submit} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: theme.spacing.md, gap: theme.spacing.sm, backgroundColor: theme.bg },
  savedBox: { gap: theme.spacing.xs },
  savedTitle: { color: theme.ink, fontWeight: "700" },
  savedRow: { gap: 4 },
  savedActions: { gap: 8 },
  summary: { gap: theme.spacing.xs },
  summaryText: { color: theme.muted, fontSize: theme.font.body },
  total: { color: theme.ink, fontWeight: "700" },
});
