import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { theme } from "../../theme";
import { softHaptic } from "../../utils/haptics";

type Props = {
  label: string;
  onPress: () => void;
  variant?: "solid" | "outline" | "soft";
  disabled?: boolean;
  style?: ViewStyle;
};

export function AppButton({ label, onPress, variant = "outline", disabled, style }: Props) {
  return (
    <Pressable
      onPress={async () => {
        await softHaptic();
        onPress();
      }}
      disabled={disabled}
      style={[styles.base, variant === "solid" && styles.solid, variant === "soft" && styles.soft, disabled && styles.disabled, style]}
    >
      <Text style={[styles.text, variant === "solid" && styles.solidText, variant === "soft" && styles.softText]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderColor: theme.line,
    backgroundColor: theme.panel,
    paddingHorizontal: 12,
    paddingVertical: 12
  },
  text: { color: theme.ink, fontWeight: "700", textAlign: "center" },
  solid: { borderColor: theme.brand, backgroundColor: theme.brand },
  solidText: { color: "#fff" },
  soft: { borderColor: theme.line, backgroundColor: theme.brandSoft },
  softText: { color: theme.brand },
  disabled: { opacity: 0.45 }
});
