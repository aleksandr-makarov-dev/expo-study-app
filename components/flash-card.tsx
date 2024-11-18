import { View, Text, ViewProps, Pressable, Image } from "react-native";
import { Card } from "./ui/card";
import { AudioButton } from "./audio-button";
import { FlipCard } from "./flip-card";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface FlashCardSideProps {
  text: string;
  image?: string;
  textTtsUrl?: string;
  index: number;
  total: number;
  onPress: () => void;
}

const FlashCardSide = ({
  text,
  image,
  index,
  total,
  textTtsUrl,
  onPress,
}: FlashCardSideProps) => {
  return (
    <View className="flex-1">
      <View className="justify-end content-end items-end">
        <Badge className="self-end" text={`${index} / ${total}`} />
      </View>
      <Pressable className="flex-1" onPress={onPress}>
        <View className="flex-1 justify-center items-center gap-4">
          {image && <Image className="w-64 h-64 rounded-lg" src={image} />}
          <Text className="text-2xl dark:text-white">{text}</Text>
        </View>
      </Pressable>
      <View>
        <AudioButton
          className="bg-zinc-500 dark:bg-zinc-400"
          uri={`https://quizlet.com/${textTtsUrl}`}
        />
      </View>
    </View>
  );
};

interface FlashCardProps extends ViewProps {
  text: string;
  definition: string;
  index: number;
  total: number;
  image?: string;
  textTtsUrl?: string;
  definitionTtsUrl?: string;
}

export const FlashCard = ({
  text,
  definition,
  image,
  textTtsUrl,
  definitionTtsUrl,
  index,
  total,
  className,
  ...props
}: FlashCardProps) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handlePressed = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <Card className={cn("m-3", className)} {...props}>
      <FlipCard
        className="flex-1"
        isFlipped={isFlipped}
        frontSide={
          <FlashCardSide
            index={index}
            total={total}
            text={text}
            textTtsUrl={textTtsUrl}
            onPress={handlePressed}
          />
        }
        backSide={
          <FlashCardSide
            index={index}
            total={total}
            text={definition}
            textTtsUrl={definitionTtsUrl}
            image={image}
            onPress={handlePressed}
          />
        }
      />
    </Card>
  );
};
