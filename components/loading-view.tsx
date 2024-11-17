import { Text, View } from "react-native";

export const LoadingView = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="dark:text-white">Loading...</Text>
    </View>
  );
};
