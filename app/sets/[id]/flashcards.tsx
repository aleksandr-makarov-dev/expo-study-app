import { FlashCard } from "@/components/flash-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MOCK_SET } from "@/lib/mock";
import { Set } from "@/lib/types";
import { Stack } from "expo-router";
import { useRef, useState } from "react";
import { NativeSyntheticEvent, Text, View } from "react-native";
import PagerView from "react-native-pager-view";

export default function FlashCardsScreen() {
  const [data, setData] = useState<Set | null>(MOCK_SET);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [canGoNext, setCanGoNext] = useState<boolean>(true);
  const [canGoPrevious, setCanGoPrevious] = useState<boolean>(false);

  const pagerRef = useRef<PagerView | null>(null);

  const handlePageSelected = (
    e: NativeSyntheticEvent<Readonly<{ position: number }>>
  ) => {
    const position = e.nativeEvent.position;
    setCurrentPage(position);

    setCanGoNext(position < (data?.items.length ?? 0) - 1);
    setCanGoPrevious(position > 0);
  };

  const handlePrevPressed = () => {
    pagerRef.current?.setPage(currentPage - 1);
  };

  const handleNextPressed = () => {
    pagerRef.current?.setPage(currentPage + 1);
  };

  return (
    <>
      <Stack.Screen options={{ headerTitle: data?.title }} />
      <View className="flex-1 bg-zinc-800 p-3">
        <PagerView
          style={{ flex: 1 }}
          pageMargin={8}
          ref={pagerRef}
          onPageSelected={handlePageSelected}
        >
          {MOCK_SET.items.map((item) => (
            <FlashCard key={item.id} className="flex-1" {...item} />
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
      </View>
    </>
  );
}
