import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";
import { Card } from "../components/ui/Card";
import { AppButton } from "../components/ui/AppButton";
import { Screen } from "../components/ui/Screen";

export function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <Screen contentContainerStyle={styles.wrap}>
      <Card style={styles.hero}><Text style={styles.h1}>Покупочка</Text><Text style={styles.sub}>Свежие продукты с доставкой за 60 минут</Text></Card>
      <Image source={require("../../assets/hero.png")} style={styles.heroImage} resizeMode="cover" />
      <View style={styles.quickRow}>
        <AppButton variant="soft" label="Каталог" onPress={() => navigation.navigate("Catalog")} />
        <AppButton variant="soft" label="Акции" onPress={() => navigation.navigate("Sale")} />
        <AppButton variant="soft" label="Избранное" onPress={() => navigation.navigate("Wishlist")} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: theme.spacing.md, backgroundColor: theme.bg, gap: theme.spacing.sm },
  hero: { gap: theme.spacing.xs },
  heroImage: { width: "100%", height: 180, borderWidth: 1, borderColor: theme.line },
  quickRow: { gap: theme.spacing.sm },
  h1: { fontSize: theme.font.h1, fontWeight: "700", color: theme.ink },
  sub: { color: theme.muted, fontSize: theme.font.body }
});
