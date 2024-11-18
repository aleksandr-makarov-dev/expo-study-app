import { FlashCard } from "@/components/flash-card";
import { Button } from "@/components/ui/button";
import { LazyLoadView } from "@/components/ui/lazy-view";
import { useSelectMany } from "@/hooks/use-select-many";
import { SELECT_ITEMS_BY_SET_QUERY } from "@/lib/queries";
import { Item } from "@/lib/types";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

export default function FlashCardsScreen() {
  const local = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useSelectMany<Item>(SELECT_ITEMS_BY_SET_QUERY, {
    $setId: local.id,
  });

  const carouselRef = useRef<ICarouselInstance | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [width] = useState(Dimensions.get("window").width);

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < (data?.length ?? 0) - 1;

  const handlePageSelected = (index: number) => setCurrentIndex(index);

  const handlePrevPressed = () => carouselRef.current?.prev();
  const handleNextPressed = () => carouselRef.current?.next();

  return (
    <>
      <Stack.Screen options={{ headerTitle: "Flashcards" }} />
      <View className="flex-1 dark:bg-zinc-800">
        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <Text className="dark:text-white">Loading...</Text>
          </View>
        ) : (
          <>
            <Carousel
              ref={carouselRef}
              width={width}
              loop={false}
              defaultIndex={0}
              scrollAnimationDuration={200}
              data={data ?? []}
              onSnapToItem={handlePageSelected}
              panGestureHandlerProps={{ activeOffsetX: [-1000, 1000] }}
              renderItem={({ item, index }) => (
                <LazyLoadView currentIndex={currentIndex} index={index}>
                  <FlashCard
                    key={item.id}
                    className="flex-1"
                    index={index}
                    total={data?.length ?? 0}
                    text={item.text}
                    definition={item.definition}
                    textTtsUrl={item.textTtsUrl}
                    definitionTtsUrl={item.definitionTtsUrl}
                    image={item.image}
                  />
                </LazyLoadView>
              )}
            />

            <View className="flex-row p-3 gap-3">
              <Button
                className="flex-1"
                title="Previous"
                icon="arrow-left"
                onPress={handlePrevPressed}
                disabled={!canGoPrevious}
              />
              <Button
                className="flex-1"
                title="Next"
                icon="arrow-right"
                iconEnd
                onPress={handleNextPressed}
                disabled={!canGoNext}
              />
            </View>
          </>
        )}
      </View>
    </>
  );
}
