import { useSelectMany } from "@/hooks/use-select-many";
import {
  View,
  Text,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Set, SetGetDto } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { SELECT_SETS_QUERY } from "@/lib/queries";
import { Link, Stack } from "expo-router";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { LoadingView } from "@/components/loading-view";
import { useSQLiteContext } from "expo-sqlite";
import { deleteSetAsync } from "@/lib/sqlite";

export default function LibraryScreen() {
  const { data, isLoading, refreshAsync } =
    useSelectMany<SetGetDto>(SELECT_SETS_QUERY);

  const db = useSQLiteContext();

  const handleRefreshPressed = async () => {
    await refreshAsync();
  };

  const handleDeletePressed = async (id: number) => {
    Alert.alert("Delete set", "Are you sure you want to delete this set?", [
      {
        text: "Yes, delete",
        onPress: async () => {
          await deleteSetAsync(db, id);
          await refreshAsync();
        },
      },
      {
        text: "No, keep it",
        style: "cancel",
      },
    ]);
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
                  <Card className="gap-3 w-full flex-row items-center justify-between">
                    <Text className="text-xl dark:text-white">
                      {item.title}
                    </Text>
                    <TouchableOpacity
                      className="bg-red-500 dark:bg-red-600 rounded-md p-3"
                      onPress={async () => await handleDeletePressed(item.id)}
                    >
                      <Icon name="trash-can" size={24} color="white" />
                    </TouchableOpacity>
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
