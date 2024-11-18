import { Stack, useLocalSearchParams } from "expo-router";
import { Dimensions, Switch, View, Text, FlatList } from "react-native";
import { Item } from "@/lib/types";
import { TestProvider, useTestContext } from "@/providers/test-context";
import { useSelectMany } from "@/hooks/use-select-many";
import { SELECT_ITEMS_BY_SET_QUERY } from "@/lib/queries";
import { LoadingView } from "@/components/loading-view";
import { TestCard } from "@/components/test-card";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "react-native-gesture-handler";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { LazyLoadView } from "@/components/ui/lazy-view";
import { usePersistentStorage } from "@/hooks/use-persistent-storage";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TestResult = () => {
  const answers = useTestContext((selector) => selector.answers);
  const init = useTestContext((selector) => selector.init);

  const handleRestartPressed = () => {
    init();
  };

  return (
    <Card className="flex-1 m-3 gap-3">
      <Text className="dark:text-white text-center text-3xl ">Results</Text>
      <FlatList
        className="flex-1"
        contentContainerClassName="gap-3"
        data={answers}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => (
          <Card
            key={`answer-${item.id}`}
            className={cn("bg-zinc-50 dark:bg-zinc-500")}
          >
            <Text className="dark:text-white">Question: {item.text}</Text>
            <Text className="dark:text-white">Answer: {item.answer}</Text>
            <Text className="dark:text-white">Given Answer: {item.given}</Text>
            <Text className="dark:text-white">
              Correct: {item.correct ? "yes" : "no"}
            </Text>
          </Card>
        )}
      />
      <Button title="Restart" onPress={handleRestartPressed} />
    </Card>
  );
};

const TestCarousel = () => {
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
        <LazyLoadView index={index} currentIndex={currentIndex}>
          <TestCard
            className="flex-1 m-3"
            key={item.id}
            text={item.text}
            textTtsUrl={item.textTtsUrl}
            answerTtsUrl={item.answerTtsUrl}
            index={index}
            total={items.length}
          />
        </LazyLoadView>
      )}
    />
  );
};

interface TestPagerProps {
  children: React.ReactNode;
}

const TestPager = ({ children }: TestPagerProps) => {
  const state = useTestContext((selector) => selector.state);
  const { items, length } = useMemo(() => {
    const items = React.Children.toArray(children);
    return {
      items,
      length: items.length,
    };
  }, [children]);

  if (state === "complete" && length > 1) {
    return items[1];
  }

  return items[0];
};

export default function TestScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { value: mode } = usePersistentStorage<boolean>("mode");
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
          <TestProvider initialItems={data} mode={mode || false}>
            <TestPager>
              <TestCarousel />
              <TestResult />
            </TestPager>
          </TestProvider>
        )}
      </View>
    </>
  );
}
