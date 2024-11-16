import { Link, Stack } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 justify-center items-center dark:bg-zinc-800">
        <Text className="dark:text-white">Error</Text>
      </View>
    </>
  );
}
