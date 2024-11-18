import { Text, TextInput, View, ViewProps } from "react-native";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AudioButton } from "./audio-button";
import { useTestContext } from "@/providers/test-context";
import { Badge } from "./ui/badge";
import { useForm, Controller } from "react-hook-form";
import { TestInput } from "@/stores/test-store";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { useAudioPlayer } from "@/hooks/use-audio-player";

interface TestCardProps extends ViewProps {
  text: string;
  textTtsUrl?: string;
  answerTtsUrl?: string;
  index: number;
  total: number;
}

export const TestCard = ({
  text,
  textTtsUrl,
  index,
  answerTtsUrl,
  total,
  className,
  ...props
}: TestCardProps) => {
  const { playAsync } = useAudioPlayer(`https://quizlet.com/${answerTtsUrl}`);

  const form = useForm<TestInput>({
    defaultValues: {
      answer: "",
    },
  });

  const submit = useTestContext((selector) => selector.submit);
  const next = useTestContext((selector) => selector.next);
  const state = useTestContext((selector) => selector.state);
  const currentIndex = useTestContext((selector) => selector.currentIndex);
  const items = useTestContext((selector) => selector.items);

  useEffect(() => {
    if (state !== "idle" && index === currentIndex) {
      playAsync();
    }
  }, [state]);

  const idle = state === "idle";
  const success = state === "success";
  const error = state === "error";

  if (index !== currentIndex) {
    return null;
  }

  return (
    <Card className={className} {...props}>
      <View className="justify-end content-end items-end">
        <Badge className="self-end" text={`${index + 1} / ${total}`} />
      </View>
      <View className="flex-1 justify-center items-center gap-6">
        <Text className="text-xl dark:text-white">{text}</Text>
        <AudioButton
          className="bg-zinc-500 dark:bg-zinc-400"
          uri={`https://quizlet.com/${textTtsUrl}`}
        />
      </View>
      <View className="gap-3">
        {success && (
          <Text className="text-green-500 text-lg">
            Your answer is correct!
          </Text>
        )}
        {error && (
          <Text className="text-red-500 text-lg">
            Corrent answer: {items[currentIndex].answer}
          </Text>
        )}
        <Controller
          control={form.control}
          name="answer"
          rules={{ required: false }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              className={cn("placeholder:font-medium", { "opacity-50": !idle })}
              placeholder="Type the answer"
              value={value}
              onChangeText={(value) => onChange(value)}
              onBlur={onBlur}
              editable={idle}
              selectTextOnFocus={idle}
              onSubmitEditing={form.handleSubmit(submit)}
            />
          )}
        />
        {idle ? (
          <Button title="Answer" onPress={form.handleSubmit(submit)} />
        ) : (
          <Button title="Continue" onPress={next} />
        )}
      </View>
    </Card>
  );
};
