import { Card } from "@/components/ui/card";
import { useSelectMany } from "@/hooks/use-select-many";
import { SELECT_SETS_QUERY } from "@/lib/queries";
import { SetGetDto } from "@/lib/types";
import { Stack, Link } from "expo-router";
import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function StudyScreen() {
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
          <View className="flex-1 justify-center items-center">
            <Text className="dark:text-white">Loading...</Text>
          </View>
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