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
        <Button
          icon="camera"
          title="Import"
          onPress={() => console.log("Pressed")}
        />
      </Link>
      <Link
        href={{ pathname: "/sets/[id]/flashcards", params: { id: "set-1" } }}
        asChild
      >
        <Button
          icon="camera"
          title="Flashcards"
          onPress={() => console.log("Pressed")}
        />
      </Link>
    </View>
  );
}
