import React, { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { useStore } from "../context/StoreContext";
import { formatPhoneDisplay, isPhoneComplete, toPhoneDigits } from "../utils/phone";
import { AppButton } from "../components/ui/AppButton";
import { AppInput } from "../components/ui/AppInput";
import { Screen } from "../components/ui/Screen";
import { Card } from "../components/ui/Card";

export function LoyaltyLoginScreen({ navigation }: { navigation: any }) {
  const { loginLoyalty } = useStore();
  const [phoneDigits, setPhoneDigits] = useState("");
  return (
    <Screen contentContainerStyle={{ padding: 12, gap: 10 }}>
      <Text style={{ fontWeight: "700", fontSize: 22 }}>Скидочная карта</Text>
      <AppInput
        value={formatPhoneDisplay(phoneDigits)}
        onChangeText={(t) => setPhoneDigits(toPhoneDigits(t))}
        placeholder="+7 (___) ___-__-__"
      />
      <AppButton
        variant="solid"
        label="Войти"
        onPress={() => {
          if (!isPhoneComplete(phoneDigits)) return;
          loginLoyalty(phoneDigits);
          navigation.replace("LoyaltyCard");
        }}
        disabled={!isPhoneComplete(phoneDigits)}
      />
    </Screen>
  );
}

export function LoyaltyCardScreen({ navigation }: { navigation: any }) {
  const { loyaltyProfile, logoutLoyalty } = useStore();
  const next = useMemo(() => (loyaltyProfile ? Math.max(0, 3000 - loyaltyProfile.points) : 0), [loyaltyProfile]);
  useEffect(() => {
    if (!loyaltyProfile) {
      navigation.replace("LoyaltyLogin");
    }
  }, [loyaltyProfile, navigation]);

  if (!loyaltyProfile) {
    return null;
  }
  return (
    <Screen contentContainerStyle={{ padding: 12, gap: 10 }}>
      <Text style={{ fontWeight: "700", fontSize: 22 }}>Скидочная карта</Text>
      <Card style={{ gap: 6 }}>
        <Text>{loyaltyProfile.tier}</Text>
        <Text>{formatPhoneDisplay(loyaltyProfile.phoneDigits)}</Text>
        <Text style={{ fontSize: 28, fontWeight: "700" }}>{loyaltyProfile.points} баллов</Text>
        <Text>До Gold: {next}</Text>
      </Card>
      <AppButton label="Выйти" onPress={logoutLoyalty} />
    </Screen>
  );
}
