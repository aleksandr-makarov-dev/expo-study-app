import { cn } from "@/lib/utils";
import React from "react";
import { View, ViewProps } from "react-native";

interface CardProps extends ViewProps {}

export const Card = React.forwardRef<View, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <View
        className={cn(
          "bg-white p-6 border border-zinc-200 rounded-lg shadow dark:bg-zinc-700 dark:border-zinc-600",
          className
        )}
        ref={ref}
        {...props}
      ></View>
    );
  }
);
