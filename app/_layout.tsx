import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export type RootStackParamList = {
  index: undefined;
  home: undefined;
  payment: { transferType: "domestic" | "international" };
  review: { values: string; transferType: "domestic" | "international" };
  success: { transferType: "domestic" | "international"; amount: string; recipient: string };
};

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
        <Stack.Screen name="payment" />
        <Stack.Screen name="review" />
        <Stack.Screen name="success" />
      </Stack>
    </>
  );
}
