import { Card } from "@/components/ui/card";
import { useSelectMany } from "@/hooks/use-select-many";
import { SELECT_SETS_QUERY } from "@/lib/queries";
import { SetGetDto } from "@/lib/types";
import { Stack, Link } from "expo-router";
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  useColorScheme,
  Switch,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { LoadingView } from "@/components/loading-view";
import "react-native-gesture-handler";
import { usePersistentStorage } from "@/hooks/use-persistent-storage";

export default function StudyScreen() {
  const theme = useColorScheme();
  const { storeAsync, value: mode } = usePersistentStorage<boolean>("mode");

  const { data, isLoading, refreshAsync } =
    useSelectMany<SetGetDto>(SELECT_SETS_QUERY);

  const handleRefreshPressed = async () => {
    await refreshAsync();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View className="flex-row gap-3 items-center">
              <Text className="dark:text-white">Select / Input</Text>
              <Switch
                value={mode || false}
                onChange={async (e) => await storeAsync(e.nativeEvent.value)}
              />
              <TouchableOpacity
                className="mr-3 p-3 bg-zinc-300 rounded-md dark:text-white dark:bg-zinc-800"
                onPress={handleRefreshPressed}
              >
                <Icon
                  name="refresh"
                  size={24}
                  color={theme === "dark" ? "white" : "black"}
                />
              </TouchableOpacity>
            </View>
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
                    pathname: "/sets/[id]/test",
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
