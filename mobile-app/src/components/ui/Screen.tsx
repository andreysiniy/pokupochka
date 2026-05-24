import React from "react";
import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";
import { theme } from "../../theme";

export function Screen({ contentContainerStyle, children, ...props }: ScrollViewProps) {
  return (
    <ScrollView
      contentContainerStyle={[styles.content, contentContainerStyle]}
      {...props}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
    backgroundColor: theme.bg
  }
});
