import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { theme } from "../../theme";

export function Card({ style, ...props }: ViewProps) {
  return <View style={[styles.card, style]} {...props} />;
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: theme.line,
    backgroundColor: theme.panel,
    padding: theme.spacing.md,
    gap: theme.spacing.xs
  }
});
