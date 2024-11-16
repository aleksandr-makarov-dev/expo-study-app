import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

export const DATABASE_NAME: string = "studyapp";

const CREATE_SET_TABLE_QUERY =
  "CREATE TABLE IF NOT EXISTS sets (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT)";

export async function applyMigration(db: SQLite.SQLiteDatabase) {
  console.log("migration applied");

  const SQLITE_DIRECTORY = FileSystem.documentDirectory + "SQLite";

  const directory = await FileSystem.getInfoAsync(SQLITE_DIRECTORY);

  if (!directory.exists) {
    await FileSystem.makeDirectoryAsync(SQLITE_DIRECTORY);
  }

  await db.withTransactionAsync(async () => {
    await db.execAsync(CREATE_SET_TABLE_QUERY);
  });
}
