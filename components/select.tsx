import { View } from "react-native";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface SelectProps {
  value: string;
  options: string[];
  disabled: boolean;
  onPress: (value: string) => void;
}

export const Select = ({ value, options, disabled, onPress }: SelectProps) => {
  return (
    <View className="grid grid-cols-2 gap-3">
      {options.map((option, i) => {
        const selected = option === value;
        return (
          <Button
            key={i}
            className={cn("dark:bg-zinc-500 justify-start", {
              "dark:bg-blue-600": selected,
            })}
            title={option}
            icon={selected ? "checkbox-marked" : "checkbox-blank"}
            onPress={() => onPress(option)}
            disabled={disabled}
          />
        );
      })}
    </View>
  );
};
