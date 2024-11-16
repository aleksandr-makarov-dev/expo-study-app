import { Stack } from "expo-router";
import "@/index.css";
import { SQLiteProvider } from "expo-sqlite";
import { applyMigration, DATABASE_NAME } from "@/lib/sqlite";
import { Suspense } from "react";

export default function RootLayout() {
  return (
    <Suspense>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        onInit={applyMigration}
        useSuspense
      >
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SQLiteProvider>
    </Suspense>
  );
}
