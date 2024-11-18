import { Stack, useRouter } from "expo-router";
import { FlatList, Text, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import { SetCreateDto } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { parsePage } from "@/lib/parse";
import { useSQLiteContext } from "expo-sqlite";
import { insertSet } from "@/lib/sqlite";
import "react-native-gesture-handler";

export default function CreateScreen() {
  const router = useRouter();
  const db = useSQLiteContext();

  const [data, setData] = useState<SetCreateDto | null>(null);

  const handleBrowsePressed = async () => {
    const documentPickResult = await DocumentPicker.getDocumentAsync({
      multiple: false,
      type: "text/html",
    });

    if (documentPickResult.canceled) {
      console.log("browse file cancelled");
      return;
    }

    const file = documentPickResult.assets[0];

    const content = await FileSystem.readAsStringAsync(file.uri);

    const pageParseResult = await parsePage(content);

    if (pageParseResult.success) {
      setData(pageParseResult.data);
    } else {
      console.error(pageParseResult.error);
    }
  };

  const handleSavePressed = async () => {
    if (!data) {
      return;
    }

    await insertSet(db, data);

    setData(null);

    router.navigate({ pathname: "/(tabs)" });
  };

  return (
    <>
      <Stack.Screen options={{ headerTitle: "New Set" }} />
      <View className="p-3 flex-1 dark:bg-zinc-800">
        <Button
          className="mb-6"
          title="Browse files"
          icon="folder-open"
          onPress={handleBrowsePressed}
        />
        {data ? (
          <>
            <Input className="mb-4" placeholder="Title" value={data?.title} />
            <Text className="dark:text-white font-medium text-xl pb-4">
              Items ({data?.items.length ?? 0})
            </Text>
            <FlatList
              data={data?.items}
              contentContainerClassName="gap-3"
              renderItem={({ item }) => (
                <Card>
                  <Text className="dark:text-white mb-2">{item.text}</Text>
                  <Text className="dark:text-white">{item.definition}</Text>
                </Card>
              )}
            />
            <View className="pt-3">
              <Button
                title="Save set"
                icon="content-save"
                onPress={handleSavePressed}
              />
            </View>
          </>
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="dark:text-white text-xl">
              Choose file to start import process
            </Text>
          </View>
        )}
      </View>
    </>
  );
}
