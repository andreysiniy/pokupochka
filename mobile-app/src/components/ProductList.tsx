import React from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Product } from "../types";
import { useStore } from "../context/StoreContext";
import { theme } from "../theme";
import { Card } from "./ui/Card";
import { AppButton } from "./ui/AppButton";

export function ProductList({ data }: { data: Product[] }) {
  const { addToCart, decCart, cart, favoriteIds, toggleFavorite } = useStore();
  const imageMap: Record<string, any> = {
    vegetables: require("../../assets/products/vegetables.png"),
    fruits: require("../../assets/products/fruits.png"),
    milk: require("../../assets/products/milk.png"),
    bread: require("../../assets/products/bread.png"),
    grocery: require("../../assets/products/grocery.png"),
    meat: require("../../assets/products/meat.png"),
    fish: require("../../assets/products/fish.png"),
    drinks: require("../../assets/products/drinks.png"),
    frozen: require("../../assets/products/frozen.png"),
    sweets: require("../../assets/products/sweets.png")
  };
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => {
        const qty = cart.find((x) => x.id === item.id)?.qty ?? 0;
        const out = item.stock <= 0;
        const fav = favoriteIds.includes(item.id);
        return (
          <Card style={styles.card}>
            <Image source={imageMap[item.imageKey] ?? imageMap.vegetables} style={styles.image} resizeMode="cover" />
            <View style={styles.row}><Text style={styles.title}>{item.title}</Text><Pressable onPress={() => toggleFavorite(item.id)}><Text style={styles.favorite}>{fav ? "♥" : "♡"}</Text></Pressable></View>
            <Text style={styles.meta}>{item.unit} • {item.rating}★</Text>
            <Text style={[styles.stock, out && styles.out]}>{out ? "Нет в наличии" : `В наличии: ${item.stock}`}</Text>
            <View style={styles.row}><Text style={styles.price}>{item.price} ₽</Text>{item.oldPrice > 0 ? <Text style={styles.old}>{item.oldPrice} ₽</Text> : null}</View>
            {qty > 0 ? (
              <View style={styles.qty}>
                <Pressable style={styles.btn} onPress={() => decCart(item.id)}><Text style={styles.btnText}>-</Text></Pressable>
                <Text>{qty}</Text>
                <Pressable style={styles.btn} onPress={() => addToCart(item.id)} disabled={qty >= item.stock}><Text style={styles.btnText}>+</Text></Pressable>
              </View>
            ) : (
              <AppButton variant="solid" label="В корзину" onPress={() => addToCart(item.id)} disabled={out} />
            )}
          </Card>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 12, gap: 10, backgroundColor: theme.bg },
  card: { gap: theme.spacing.xs },
  image: { width: "100%", height: 120 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { fontWeight: "700", color: theme.ink },
  favorite: { color: theme.brand, fontSize: 18 },
  meta: { color: theme.muted },
  stock: { color: "#2f7a4f", fontSize: 12 },
  out: { color: theme.danger },
  price: { fontWeight: "700", color: theme.ink },
  old: { textDecorationLine: "line-through", color: "#92a69d" },
  btn: { borderWidth: 1, borderColor: theme.line, paddingHorizontal: 10, paddingVertical: 6, backgroundColor: theme.panel },
  btnText: { color: theme.ink, fontWeight: "700" },
  qty: { flexDirection: "row", alignItems: "center", gap: 10 },
  disabled: { opacity: 0.4 }
});
