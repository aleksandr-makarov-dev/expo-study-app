import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const usePersistentStorage = <T,>(key: string) => {
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    async function init() {
      const json = await AsyncStorage.getItem(key);

      if (json) {
        const value = JSON.parse(json);
        setValue(value);
      }
    }

    init();
  }, []);

  const storeAsync = async (value: T | null) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  };

  return {
    value,
    storeAsync,
  };
};
