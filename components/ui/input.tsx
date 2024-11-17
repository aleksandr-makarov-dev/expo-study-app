import { cn } from "@/lib/utils";
import React from "react";
import { TextInput, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {}

export const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        className={cn(
          "bg-zinc-50 h-16 border text-lg border-zinc-300 text-zinc-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full px-3 dark:bg-zinc-600 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:placeholder:text-zinc-300",
          className
        )}
        {...props}
      />
    );
  }
);
