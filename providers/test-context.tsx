import { Item } from "@/lib/types";
import { TestProps } from "@/stores/test-store";
import { createContext, PropsWithChildren, useContext, useState } from "react";

const TestContext = createContext<TestProps | null>(null);

interface TestProviderProps {
  initialItems: Item[];
}

export const TestProvider = ({
  initialItems,
  children,
}: PropsWithChildren<TestProviderProps>) => {
  const [index, setIndex] = useState<number>(0);

  const handleSubmit = () => {
    setIndex((prev) => ++prev);
  };

  return (
    <TestContext.Provider
      value={{
        currentIndex: index,
        initialItems,
        submit: handleSubmit,
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
