import { Stack, useLocalSearchParams } from "expo-router";
import { Dimensions, View } from "react-native";
import { Item } from "@/lib/types";
import { TestProvider, useTestContext } from "@/providers/test-context";
import { useSelectMany } from "@/hooks/use-select-many";
import { SELECT_ITEMS_BY_SET_QUERY } from "@/lib/queries";
import { LoadingView } from "@/components/loading-view";
import { TestCard } from "@/components/test-card";
import { useEffect, useRef, useState } from "react";
import "react-native-gesture-handler";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

const TestPager = () => {
  const [width] = useState(Dimensions.get("window").width);
  const carouselRef = useRef<ICarouselInstance>(null);

  const init = useTestContext((selector) => selector.init);
  const items = useTestContext((selector) => selector.items);
  const currentIndex = useTestContext((selector) => selector.currentIndex);

  useEffect(() => {
    carouselRef.current?.scrollTo({ index: currentIndex, animated: true });
  }, [currentIndex]);

  useEffect(() => {
    init();
  }, []);

  return (
    <Carousel
      ref={carouselRef}
      width={width}
      loop={false}
      defaultIndex={0}
      scrollAnimationDuration={200}
      data={items}
      panGestureHandlerProps={{ activeOffsetX: [-1000, 1000] }}
      renderItem={({ item, index }) => (
        <TestCard
          className="flex-1 m-3"
          key={item.id}
          text={item.text}
          textTtsUrl={item.textTtsUrl}
          answerTtsUrl={item.answerTtsUrl}
          index={index}
          total={items.length}
        />
      )}
    />
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
      <View className="flex-1 dark:bg-zinc-800">
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
