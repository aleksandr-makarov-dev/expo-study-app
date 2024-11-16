import { cn } from "@/lib/utils";
import { View, StyleSheet, ViewProps } from "react-native";

interface FlipCardProps extends ViewProps {
  isFlipped: boolean;
  frontSide: React.ReactNode;
  backSide: React.ReactNode;
}

export const FlipCard = ({
  isFlipped,
  frontSide,
  backSide,
  className,
  ...props
}: FlipCardProps) => {
  return (
    <View className={cn(className)} {...props}>
      {isFlipped ? backSide : frontSide}
    </View>
  );
};
