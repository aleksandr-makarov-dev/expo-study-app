import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Item } from "@/lib/types";
import PagerView from "react-native-pager-view";
import { TestProvider, useTestContext } from "@/providers/test-context";
import { useSelectMany } from "@/hooks/use-select-many";
import { SELECT_ITEMS_BY_SET_QUERY } from "@/lib/queries";
import { LoadingView } from "@/components/loading-view";
import { TestCard } from "@/components/test-card";
import { useEffect, useRef } from "react";

const TestPager = () => {
  const { currentIndex, initialItems } = useTestContext();
  const pagerRef = useRef<PagerView>(null);

  useEffect(() => {
    pagerRef.current?.setPage(currentIndex);
  }, [currentIndex]);

  return (
    <PagerView
      ref={pagerRef}
      style={{ flex: 1 }}
      pageMargin={8}
      initialPage={0}
      scrollEnabled={false}
    >
      {initialItems.map((item) => (
        <TestCard
          className="flex-1"
          key={item.id}
          text={item.definition}
          textTtsUrl={item.definitionTtsUrl}
          index={currentIndex + 1}
          total={initialItems.length}
        />
      ))}
    </PagerView>
  );
};

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
          <TestProvider initialItems={data}>
            <TestPager />
          </TestProvider>
        )}
      </View>
    </>
  );
}
