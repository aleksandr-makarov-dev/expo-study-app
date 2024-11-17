import { Pressable, PressableProps, Text, View } from "react-native";
import { cn } from "@/lib/utils";
import React from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export interface ButtonProps extends PressableProps {
  title?: string;
  iconEnd?: boolean;
  icon?: React.ComponentProps<typeof Icon>["name"];
}

export const Button = React.forwardRef<View, ButtonProps>(
  ({ title, icon, iconEnd, className, ...props }, ref) => {
    return (
      <Pressable
        className={cn(
          "flex-row items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 h-14 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:bg-blue-300 dark:disabled:bg-blue-400",
          { "flex-row-reverse": iconEnd },
          className
        )}
        ref={ref}
        {...props}
      >
        {icon && <Icon size={24} name={icon} color="white" />}
        <Text className="text-white text-lg font-medium">{title}</Text>
      </Pressable>
    );
  }
);
