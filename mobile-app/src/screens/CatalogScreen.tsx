import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { products } from "../data/shopData";
import { categories } from "../data/shopData";
import { ProductList } from "../components/ProductList";
import { AppButton } from "../components/ui/AppButton";
import { theme } from "../theme";

export function CatalogScreen() {
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    if (category === "all") return products;
    return products.filter((item) => item.category === category);
  }, [category]);

  return (
    <View style={styles.wrap}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
      >
        <AppButton
          label="Все"
          variant={category === "all" ? "soft" : "outline"}
          onPress={() => setCategory("all")}
          style={styles.filterBtn}
        />
        {categories.map((item) => (
          <AppButton
            key={item.key}
            label={item.label}
            variant={category === item.key ? "soft" : "outline"}
            onPress={() => setCategory(item.key)}
            style={styles.filterBtn}
          />
        ))}
      </ScrollView>
      <ProductList data={filtered} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: theme.bg },
  filters: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    backgroundColor: theme.panel,
    borderBottomWidth: 1,
    borderBottomColor: theme.line
  },
  filterBtn: { alignSelf: "center", minHeight: 40, paddingVertical: 8, paddingHorizontal: 10 }
});
