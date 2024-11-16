import { Stack } from "expo-router";
import { View, Text } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 justify-center items-center gap-4 dark:bg-zinc-800">
        <Icon size={64} color="white" name="feature-search" />
        <Text className="text-xl dark:text-white">Something went wrong...</Text>
      </View>
    </>
  );
}
