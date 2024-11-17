import { useSelectMany } from "@/hooks/use-select-many";
import {
  View,
  Text,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { Set, SetGetDto } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { SELECT_SETS_QUERY } from "@/lib/queries";
import { Link, Stack } from "expo-router";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { LoadingView } from "@/components/loading-view";

export default function LibraryScreen() {
  const { data, isLoading, refresh } =
    useSelectMany<SetGetDto>(SELECT_SETS_QUERY);

  const handleRefreshPressed = async () => {
    await refresh();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              className="mr-3 p-3 bg-zinc-50 rounded-md"
              onPress={handleRefreshPressed}
            >
              <Icon name="refresh" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <View className="flex-1 p-3 dark:bg-zinc-800">
        {isLoading ? (
          <LoadingView />
        ) : (
          <View>
            <FlatList
              data={data}
              contentContainerClassName="gap-4"
              renderItem={({ item }) => (
                <Link
                  href={{
                    pathname: "/sets/[id]/flashcards",
                    params: { id: item.id },
                  }}
                >
                  <Card className="w-full">
                    <Text className="text-xl dark:text-white">
                      {item.title}
                    </Text>
                  </Card>
                </Link>
              )}
            />
          </View>
        )}
      </View>
    </>
  );
}
