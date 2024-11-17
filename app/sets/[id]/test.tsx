import { MOCK_SET } from "@/lib/mock";
import { Stack } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Set } from "@/lib/types";
import PagerView from "react-native-pager-view";
import { TestProvider } from "@/providers/test-context";

export default function TestScreen() {
  const [data, setData] = useState<Set | null>(MOCK_SET);

  return (
    <>
      <Stack.Screen options={{ headerTitle: "Test" }} />
      <View className="flex-1 dark:bg-zinc-800 p-3">
        <TestProvider initialItems={MOCK_SET.items} currentIndex={0}>
          <PagerView></PagerView>
        </TestProvider>
      </View>
    </>
  );
}
