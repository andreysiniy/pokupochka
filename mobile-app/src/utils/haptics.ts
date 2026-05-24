import * as Haptics from "expo-haptics";

export async function softHaptic() {
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch {
    // haptics is optional on some devices
  }
}
