import { MOCK_SET } from "@/lib/mock";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Item, Set } from "@/lib/types";
import PagerView from "react-native-pager-view";
import { TestProvider } from "@/providers/test-context";
import { useSelectMany } from "@/hooks/use-select-many";
import { SELECT_ITEMS_BY_SET_QUERY } from "@/lib/queries";
import { LoadingView } from "@/components/loading-view";

export default function TestScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, refresh } = useSelectMany<Item>(
    SELECT_ITEMS_BY_SET_QUERY,
    { $setId: id }
  );

  return (
    <>
      <Stack.Screen options={{ headerTitle: "Test" }} />
      <View className="flex-1 dark:bg-zinc-800 p-3">
        {isLoading || !data ? (
          <LoadingView />
        ) : (
          <TestProvider initialItems={data} currentIndex={0}>
            <PagerView>{}</PagerView>
          </TestProvider>
        )}
      </View>
    </>
  );
}
