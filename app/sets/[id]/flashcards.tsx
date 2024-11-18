import { FlashCard } from "@/components/flash-card";
import { Button } from "@/components/ui/button";
import { useSelectMany } from "@/hooks/use-select-many";
import { SELECT_ITEMS_BY_SET_QUERY } from "@/lib/queries";
import { Item } from "@/lib/types";
import { Stack, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

export default function FlashCardsScreen() {
  const [width] = useState(Dimensions.get("window").width);
  const local = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useSelectMany<Item>(SELECT_ITEMS_BY_SET_QUERY, {
    $setId: local.id,
  });

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [canGoNext, setCanGoNext] = useState<boolean>(true);
  const [canGoPrevious, setCanGoPrevious] = useState<boolean>(false);

  const carouselRef = useRef<ICarouselInstance | null>(null);

  const handlePageSelected = (index: number) => {
    setCurrentPage(index);

    setCanGoNext(index < (data?.length ?? 0) - 1);
    setCanGoPrevious(index > 0);
  };

  const handlePrevPressed = () => {
    carouselRef.current?.prev();
  };

  const handleNextPressed = () => {
    carouselRef.current?.next();
  };

  const total = data?.length ?? 0;

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
              panGestureHandlerProps={{ activeOffsetX: [-1000, 1000] }} // manual swiping makes cards jump back
              renderItem={({ item, index }) => (
                <FlashCard
                  key={item.id}
                  className="flex-1"
                  index={index + 1}
                  total={total}
                  text={item.text}
                  definition={item.definition}
                  textTtsUrl={item.textTtsUrl}
                  definitionTtsUrl={item.definitionTtsUrl}
                  image={item.image}
                />
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
