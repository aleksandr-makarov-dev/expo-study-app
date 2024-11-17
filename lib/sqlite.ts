import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Set, SetCreateDto } from "./types";
import {
  CREATE_ITEM_TABLE_QUERY,
  CREATE_SET_TABLE_QUERY,
  INSERT_ITEM_QUERY,
  INSERT_SET_QUERY,
  SELECT_SETS_QUERY,
} from "./queries";

export const DATABASE_NAME: string = "studyapp";

// START QUERIES

// END QUERIES

export async function applyMigration(db: SQLite.SQLiteDatabase) {
  console.log("migration applied");

  const SQLITE_DIRECTORY = FileSystem.documentDirectory + "SQLite";

  const directory = await FileSystem.getInfoAsync(SQLITE_DIRECTORY);

  if (!directory.exists) {
    await FileSystem.makeDirectoryAsync(SQLITE_DIRECTORY);
  }

  await db.withTransactionAsync(async () => {
    await db.execAsync(CREATE_SET_TABLE_QUERY);
    await db.execAsync(CREATE_ITEM_TABLE_QUERY);
  });
}

export async function insertSet(db: SQLite.SQLiteDatabase, set: SetCreateDto) {
  await db.withTransactionAsync(async () => {
    const stmt = await db.prepareAsync(INSERT_SET_QUERY);
    const stmt2 = await db.prepareAsync(INSERT_ITEM_QUERY);

    try {
      const result = await stmt.executeAsync({ $title: set.title });

      const id = result.lastInsertRowId;

      console.log("set:[id=" + id + "] inserted");

      set.items.forEach(async (item) => {
        const result2 = await stmt2.executeAsync({
          $text: item.text,
          $definition: item.definition,
          $image: item.image ?? null,
          $textTtsUrl: item.textTtsUrl ?? null,
          $definitionTtsUrl: item.definitionTtsUrl ?? null,
          $setId: id,
        });

        console.log("item:[id=" + result2.lastInsertRowId + "] inserted");
      });
    } finally {
      await stmt.finalizeAsync();
      await stmt2.finalizeAsync();
    }
  });
}

export async function selectSets(db: SQLite.SQLiteDatabase) {
  const stmt = await db.prepareAsync(SELECT_SETS_QUERY);

  try {
    const result = await stmt.executeAsync<Set>();
    return await result.getAllAsync();
  } finally {
    await stmt.finalizeAsync();
  }
}
