import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { StoreProvider } from "./src/context/StoreContext";
import { theme } from "./src/theme";
import { HomeScreen } from "./src/screens/HomeScreen";
import { CatalogScreen } from "./src/screens/CatalogScreen";
import { SaleScreen } from "./src/screens/SaleScreen";
import { WishlistScreen } from "./src/screens/WishlistScreen";
import { AboutScreen } from "./src/screens/InfoScreens";
import { CheckoutScreen } from "./src/screens/CheckoutScreen";
import { LoyaltyCardScreen, LoyaltyLoginScreen } from "./src/screens/LoyaltyScreens";
import Logo from "./assets/logo.svg";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Root = createNativeStackNavigator();

function LoyaltyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoyaltyLogin" component={LoyaltyLoginScreen} options={{ title: "Вход в карту" }} />
      <Stack.Screen name="LoyaltyCard" component={LoyaltyCardScreen} options={{ title: "Баллы" }} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.brand,
        tabBarInactiveTintColor: theme.muted,
        tabBarStyle: {
          backgroundColor: theme.panel,
          borderTopColor: theme.line,
          borderTopWidth: 1,
          height: 62,
          paddingBottom: 8,
          paddingTop: 6
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600"
        },
        headerTitle: () => (
          <View style={styles.headerLogoWrap}>
            <Logo width={140} height={28} />
          </View>
        )
      }}
    >
      <Tab.Screen name="Главная" component={HomeScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} /> }} />
      <Tab.Screen name="Корзина" component={CheckoutScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="cart-outline" color={color} size={size} /> }} />
      <Tab.Screen name="Скидочная карта" component={LoyaltyStack} options={{ headerShown: false, tabBarIcon: ({ color, size }) => <Ionicons name="card-outline" color={color} size={size} /> }} />
      <Tab.Screen name="О нас" component={AboutScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="information-circle-outline" color={color} size={size} /> }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <NavigationContainer>
        <Root.Navigator>
          <Root.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
          <Root.Screen name="Catalog" component={CatalogScreen} options={{ title: "Каталог" }} />
          <Root.Screen name="Sale" component={SaleScreen} options={{ title: "Акции" }} />
          <Root.Screen name="Wishlist" component={WishlistScreen} options={{ title: "Избранное" }} />
        </Root.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  headerLogoWrap: {
    alignItems: "center",
    justifyContent: "center"
  }
});
