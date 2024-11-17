import { FlashCard } from "@/components/flash-card";
import { Button } from "@/components/ui/button";
import { useSelectMany } from "@/hooks/use-select-many";
import { SELECT_ITEMS_BY_SET_QUERY } from "@/lib/queries";
import { Item, Set } from "@/lib/types";
import { Stack, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { NativeSyntheticEvent, View, Text } from "react-native";
import PagerView from "react-native-pager-view";

export default function FlashCardsScreen() {
  const local = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useSelectMany<Item>(SELECT_ITEMS_BY_SET_QUERY, {
    $setId: local.id,
  });

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [canGoNext, setCanGoNext] = useState<boolean>(true);
  const [canGoPrevious, setCanGoPrevious] = useState<boolean>(false);

  const pagerRef = useRef<PagerView | null>(null);

  const handlePageSelected = (
    e: NativeSyntheticEvent<Readonly<{ position: number }>>
  ) => {
    const position = e.nativeEvent.position;
    setCurrentPage(position);

    setCanGoNext(position < (data?.length ?? 0) - 1);
    setCanGoPrevious(position > 0);
  };

  const handlePrevPressed = () => {
    pagerRef.current?.setPage(currentPage - 1);
  };

  const handleNextPressed = () => {
    pagerRef.current?.setPage(currentPage + 1);
  };

  const total = data?.length ?? 0;

  return (
    <>
      <Stack.Screen options={{ headerTitle: "Flashcards" }} />
      <View className="flex-1 dark:bg-zinc-800 p-3">
        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <Text className="dark:text-white">Loading...</Text>
          </View>
        ) : (
          <>
            <PagerView
              style={{ flex: 1 }}
              pageMargin={8}
              ref={pagerRef}
              onPageSelected={handlePageSelected}
            >
              {data?.map((item, i) => (
                <FlashCard
                  key={item.id}
                  className="flex-1"
                  index={i + 1}
                  total={total}
                  text={item.text}
                  definition={item.definition}
                  textTtsUrl={item.textTtsUrl}
                  definitionTtsUrl={item.definitionTtsUrl}
                  image={item.image}
                />
              ))}
            </PagerView>
            <View className="flex-row pt-3 gap-3">
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
