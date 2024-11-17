import {
  createTestStore,
  TestProps,
  TestState,
  TestStore,
} from "@/stores/test-store";
import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

const TestContext = createContext<TestStore | null>(null);

type TestProviderProps = React.PropsWithChildren<TestProps>;

export const TestProvider = ({ children, ...props }: TestProviderProps) => {
  const storeRef = useRef<TestStore>();

  if (!storeRef.current) {
    storeRef.current = createTestStore(props);
  }

  return (
    <TestContext.Provider value={storeRef.current}>
      {children}
    </TestContext.Provider>
  );
};

export function useTestContext<T>(selector: (state: TestState) => T): T {
  const store = useContext(TestContext);
  if (!store) throw new Error("Missing BearContext.Provider in the tree");
  return useStore(store, selector);
}
