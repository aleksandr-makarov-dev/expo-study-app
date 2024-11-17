import { Item } from "@/lib/types";
import { sanityzeText } from "@/lib/utils";
import { createStore } from "zustand";

export interface TestInput {
  answer: string;
}

export interface TestProps {
  initialItems: Item[];
}

export type TestItemType = "input";

export interface TestItemAnswer {
  id: string;
  text: string;
  answer: string;
  given: string;
  correct: boolean;
}

export interface TestItem {
  id: string;
  text: string;
  answer: string;
  type: TestItemType;
  textTtsUrl?: string;
  given?: string;
}

export interface TestState extends TestProps {
  state: "idle" | "success" | "error";
  currentIndex: number;
  items: TestItem[];
  answers: TestItemAnswer[];
  init: () => void;
  submit: (input: TestInput) => void;
  next: () => void;
}

export const createTestStore = (initProps?: Partial<TestProps>) => {
  const DEFAULT_PROPS: TestProps = {
    initialItems: [],
  };

  return createStore<TestState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    currentIndex: 0,
    state: "idle",
    items: [],
    answers: [],
    init: () =>
      set((state) => ({
        items: state.initialItems.map((itm) => ({
          id: itm.id,
          text: itm.definition,
          textTtsUrl: itm.definitionTtsUrl,
          answer: itm.text,
          type: "input",
        })),
      })),
    submit: (input: TestInput) =>
      set((state) => {
        const currentItem = state.items[state.currentIndex];

        const sanitizedGivenAnswer = sanityzeText(input.answer);
        const sanitizedAnswer = sanityzeText(currentItem.answer);

        const correct = sanitizedAnswer === sanitizedGivenAnswer;
        console.log(sanitizedAnswer, sanitizedGivenAnswer, correct);

        return {
          answers: [
            ...state.answers,
            {
              id: currentItem.id,
              text: currentItem.text,
              answer: currentItem.answer,
              given: input.answer,
              correct: correct,
            },
          ],
          state: correct ? "success" : "error",
        };
      }),
    next: () =>
      set((state) => ({ currentIndex: ++state.currentIndex, state: "idle" })),
  }));
};

export type TestStore = ReturnType<typeof createTestStore>;
