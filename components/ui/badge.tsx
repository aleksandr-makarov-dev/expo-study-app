import { cn } from "@/lib/utils";
import { View, Text, ViewProps } from "react-native";

interface BadgeProps extends ViewProps {
  text: string;
}

export const Badge = ({ text, children, className, ...props }: BadgeProps) => {
  return (
    <View
      className={cn(
        "bg-zinc-100 px-2.5 py-0.5 rounded dark:bg-blue-900",
        className
      )}
      {...props}
    >
      <Text className="text-blue-800 text-xs font-medium dark:text-blue-300 text-center">
        {text}
      </Text>
    </View>
  );
};
