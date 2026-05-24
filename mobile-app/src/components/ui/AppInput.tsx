import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { theme } from "../../theme";

export function AppInput(props: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor={theme.muted}
      style={[styles.input, props.style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: theme.line,
    backgroundColor: theme.panel,
    padding: 10,
    color: theme.ink
  }
});
