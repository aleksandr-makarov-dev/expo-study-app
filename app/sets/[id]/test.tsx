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
  const pagerRef = useRef<PagerView>(null);

  const init = useTestContext((selector) => selector.init);
  const items = useTestContext((selector) => selector.items);
  const currentIndex = useTestContext((selector) => selector.currentIndex);

  useEffect(() => {
    pagerRef.current?.setPage(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    init();
  }, []);

  return (
    <PagerView
      ref={pagerRef}
      style={{ flex: 1 }}
      pageMargin={8}
      initialPage={0}
      scrollEnabled={false}
    >
      {items.map((item, i) => (
        <TestCard
          className="flex-1"
          key={item.id}
          text={item.text}
          textTtsUrl={item.textTtsUrl}
          index={i + 1}
          total={items.length}
        />
      ))}
    </PagerView>
  );
};

export default function TestScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useSelectMany<Item>(SELECT_ITEMS_BY_SET_QUERY, {
    $setId: id,
  });

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
