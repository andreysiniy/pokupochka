import React from "react";
import { Pressable, Text, View } from "react-native";
import { ProductList } from "../components/ProductList";
import { products } from "../data/shopData";
import { useStore } from "../context/StoreContext";

export function WishlistScreen() {
  const { favoriteIds, clearFavorites } = useStore();
  const data = products.filter((p) => favoriteIds.includes(p.id));
  return (
    <View style={{ flex: 1 }}>
      <Pressable onPress={clearFavorites} style={{ margin: 12, borderWidth: 1, padding: 8 }}><Text>Очистить избранное</Text></Pressable>
      <ProductList data={data} />
    </View>
  );
}
