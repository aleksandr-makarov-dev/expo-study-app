export const CREATE_SET_TABLE_QUERY =
  "CREATE TABLE IF NOT EXISTS sets (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT)";

export const CREATE_ITEM_TABLE_QUERY =
  "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT NOT NULL, definition TEXT NOT NULL, image TEXT, textTtsUrl TEXT, definitionTtsUrl TEXT, setId INTEGER, FOREIGN KEY(setId) REFERENCES sets(id))";

export const INSERT_SET_QUERY = "INSERT INTO sets (title) VALUES ($title)";

export const INSERT_ITEM_QUERY =
  "INSERT INTO items (text, definition, image, textTtsUrl, definitionTtsUrl, setId) VALUES ($text, $definition, $image, $textTtsUrl, $definitionTtsUrl, $setId)";

export const SELECT_SETS_QUERY = "SELECT id, title from sets ORDER BY id DESC";

export const SELECT_ITEMS_BY_SET_QUERY =
  "SELECT id, text, definition, image, textTtsUrl, definitionTtsUrl from items WHERE setId = $setId";

export const DELETE_ITEMS_BY_SET_QUERY =
  "DELETE FROM items WHERE setId = $setId";

export const DELETE_SET_QUERY = "DELETE FROM sets WHERE id = $id";

export const SELECT_SINGLE_SET_QUERY =
  "SELECT id, title FROM sets WHERE id = $id";
