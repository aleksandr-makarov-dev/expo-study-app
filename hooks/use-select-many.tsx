import { SQLiteBindParams, useSQLiteContext } from "expo-sqlite";
import { useEffect, useState, useCallback } from "react";

export const useSelectMany = <T,>(
  query: string,
  params: SQLiteBindParams = {}
) => {
  const db = useSQLiteContext();

  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const exec = useCallback(async () => {
    const stmt = await db.prepareAsync(query);

    try {
      setIsLoading(true);
      const result = await stmt.executeAsync<T>(params);
      const rows = await result.getAllAsync();
      setData(rows);
    } catch (e) {
      console.log(e);
      setData(null);
    } finally {
      await stmt.finalizeAsync();
      setIsLoading(false);
    }
  }, [db, query, params]);

  useEffect(() => {
    exec();
  }, []);

  return { data, isLoading, refresh: exec };
};
