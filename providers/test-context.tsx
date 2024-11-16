import { TestProps } from "@/stores/test-store";
import { createContext, PropsWithChildren, useContext } from "react";

const TestContext = createContext<TestProps | null>(null);

export const TestProvider = ({
  initialItems,
  children,
  currentIndex = 0,
}: PropsWithChildren<TestProps>) => {
  return (
    <TestContext.Provider
      value={{
        currentIndex,
        initialItems,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};

export const useTestContext = () => {
  const context = useContext(TestContext);

  if (!context) {
    throw new Error("Missing TestContext.Provider in the tree");
  }

  return context;
};
