import React from "react";
import { StyleSheet, Text } from "react-native";
import { theme } from "../theme";
import { Card } from "../components/ui/Card";
import { Screen } from "../components/ui/Screen";

export function AboutScreen() {
  return (
    <Screen contentContainerStyle={styles.wrap}>
      <Card style={styles.card}>
        <Text style={styles.title}>О нас</Text>
        <Text style={styles.text}>Покупочка — удобный сервис доставки продуктов на каждый день.</Text>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.subtitle}>Доставка и оплата</Text>
        <Text style={styles.text}>Доставка 199 ₽, от 2000 ₽ бесплатно.</Text>
        <Text style={styles.text}>Обычно доставляем за 45-90 минут, в пиковые часы показываем точный ETA.</Text>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.subtitle}>Вакансии</Text>
        <Text style={styles.text}>Курьер, сборщик заказов, оператор поддержки.</Text>
        <Text style={styles.text}>Стабильная оплата, гибкий график, обучение на старте.</Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: theme.spacing.md, gap: theme.spacing.sm, backgroundColor: theme.bg },
  card: { gap: theme.spacing.xs },
  title: { fontWeight: "700", fontSize: theme.font.h2, color: theme.ink },
  subtitle: { fontWeight: "700", fontSize: theme.font.h3, color: theme.ink },
  text: { color: theme.muted, fontSize: theme.font.body }
});
