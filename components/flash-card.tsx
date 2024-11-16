import { View, Text, ViewProps, Pressable } from "react-native";
import { Card } from "./ui/card";
import { AudioButton } from "./audio-button";
import { FlipCard } from "./flip-card";
import { useState } from "react";

interface FlashCardSideProps {
  text: string;
  image?: string;
  textTtsUrl?: string;
  onPress: () => void;
}

const FlashCardSide = ({
  text,
  image,
  textTtsUrl,
  onPress,
}: FlashCardSideProps) => {
  return (
    <View className="flex-1">
      <Pressable className="flex-1 bg-red-50" onPress={onPress}>
        <View className="flex-1 justify-center items-center">
          <Text className="text-2xl dark:text-white">{text}</Text>
        </View>
      </Pressable>
      <View>
        <AudioButton uri={`https://quizlet.com/${textTtsUrl}`} />
      </View>
    </View>
  );
};

interface FlashCardProps extends ViewProps {
  text: string;
  definition: string;
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
  className,
  ...props
}: FlashCardProps) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handlePressed = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <Card className={className} {...props}>
      <FlipCard
        className="flex-1"
        isFlipped={isFlipped}
        frontSide={
          <FlashCardSide
            text={text}
            textTtsUrl={textTtsUrl}
            onPress={handlePressed}
          />
        }
        backSide={
          <FlashCardSide
            text={definition}
            textTtsUrl={definitionTtsUrl}
            onPress={handlePressed}
          />
        }
      />
    </Card>
  );
};
