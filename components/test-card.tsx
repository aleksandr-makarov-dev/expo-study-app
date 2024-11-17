import { Text, View, ViewProps } from "react-native";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AudioButton } from "./audio-button";
import { useTestContext } from "@/providers/test-context";
import { Badge } from "./ui/badge";
interface TestCardProps extends ViewProps {
  text: string;
  textTtsUrl?: string;
  index: number;
  total: number;
}

export const TestCard = ({
  text,
  textTtsUrl,
  index,
  total,
  className,
  ...props
}: TestCardProps) => {
  const { submit } = useTestContext();

  const handleAnswerPressed = () => {
    submit();
  };

  return (
    <Card className={className} {...props}>
      <View className="justify-end content-end items-end">
        <Badge className="self-end" text={`${index} / ${total}`} />
      </View>
      <View className="flex-1 justify-center items-center gap-6">
        <Text className="text-xl dark:text-white">{text}</Text>
        <AudioButton
          className="bg-zinc-500 dark:bg-zinc-400"
          uri={`https://quizlet.com/${textTtsUrl}`}
        />
      </View>
      <View className="gap-3">
        <Input
          className="placeholder:font-medium"
          placeholder="Type the answer"
        />
        <Button title="Answer" onPress={handleAnswerPressed} />
      </View>
    </Card>
  );
};
