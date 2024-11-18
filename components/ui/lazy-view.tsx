import { PropsWithChildren } from "react";
import { View, ViewProps } from "react-native";

interface LazyLoadViewProps extends ViewProps {
  currentIndex: number;
  index: number;
}

export const LazyLoadView = ({
  currentIndex,
  index,
  children,
  ...props
}: LazyLoadViewProps) => {
  const isActive = indexIsActive(currentIndex, index);
  if (!isActive) {
    return <View {...props}></View>;
  }

  return children;
};

export function indexIsActive(currentIndex: number, myIndex: number) {
  return (
    currentIndex == myIndex ||
    currentIndex - 1 == myIndex ||
    currentIndex + 1 == myIndex
  );
}
