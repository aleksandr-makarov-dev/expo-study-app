import "react-native-gesture-handler";
import { Stack } from "expo-router";
import "@/index.css";
import { SQLiteProvider } from "expo-sqlite";
import { applyMigration, DATABASE_NAME } from "@/lib/sqlite";
import { Suspense } from "react";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

export const darkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    primary: "#2563eb",
    background: "#2b2b2b",
    card: "#18181b",
    text: "#ffffff",
    border: "#27272a",
    notification: "#436195",
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Suspense>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        onInit={applyMigration}
        useSuspense
      >
        <ThemeProvider
          value={colorScheme === "dark" ? darkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </SQLiteProvider>
    </Suspense>
  );
}
