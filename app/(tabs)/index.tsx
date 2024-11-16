import { Button } from "@/components/ui/button";
import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function LibraryScreen() {
  return (
    <View className="flex-1 justify-center items-center dark:bg-zinc-800 gap-4">
      <Text className="dark:text-white">
        Edit app/index.tsx to edit this screen.
      </Text>
      <Link href="/(tabs)/create" asChild>
        <Button icon="import" title="Import" />
      </Link>
      <Link
        href={{ pathname: "/sets/[id]/flashcards", params: { id: "set-1" } }}
        asChild
      >
        <Button icon="view-dashboard" title="Flashcards" />
      </Link>
      <Link
        href={{ pathname: "/sets/[id]/test", params: { id: "set-1" } }}
        asChild
      >
        <Button icon="test-tube" title="Test" />
      </Link>
    </View>
  );
}
