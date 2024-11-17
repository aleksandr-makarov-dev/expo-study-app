import { Stack } from "expo-router";
import "@/index.css";
import { SQLiteProvider } from "expo-sqlite";
import { applyMigration, DATABASE_NAME } from "@/lib/sqlite";
import { Suspense } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import colors from "@/constants/colors";

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
          value={colorScheme === "dark" ? colors.dark : colors.light}
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
