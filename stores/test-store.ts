import { Item } from "@/lib/types";
import { sanityzeText, shuffle } from "@/lib/utils";
import { createStore } from "zustand";

export interface TestInput {
  answer: string;
}

export interface TestProps {
  initialItems: Item[];
  mode: boolean;
}

export type TestItemType = "input" | "select";

export interface TestItemAnswer {
  id: string;
  text: string;
  answer: string;
  given: string;
  correct: boolean;
}

export type TestItemBase = {
  id: string;
  text: string;
  answer: string;
  textTtsUrl?: string;
  answerTtsUrl?: string;
};

export type InputTestItem = {
  type: "input";
} & TestItemBase;

export type SelectTestItem = {
  type: "select";
  options: string[];
} & TestItemBase;

export type TestItem = InputTestItem | SelectTestItem;

export interface TestState extends TestProps {
  mode: boolean;
  state: "idle" | "success" | "error" | "complete";
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
    mode: false,
  };

  return createStore<TestState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    currentIndex: 0,
    state: "idle",
    items: [],
    answers: [],
    init: () =>
      set((state) => {
        const options = shuffle(state.initialItems.map((i) => i.text));

        return {
          answers: [],
          currentIndex: 0,
          state: "idle",
          items: shuffle(state.initialItems).map((itm) => {
            if (state.mode) {
              const inputItem: InputTestItem = {
                id: itm.id,
                answer: itm.text,
                text: itm.definition,
                answerTtsUrl: itm.textTtsUrl,
                textTtsUrl: itm.definitionTtsUrl,
                type: "input",
              };

              return inputItem;
            } else {
              const rnd = Math.round(Math.random() * (options.length - 3));

              const selectItem: SelectTestItem = {
                id: itm.id,
                answer: itm.text,
                text: itm.definition,
                answerTtsUrl: itm.textTtsUrl,
                textTtsUrl: itm.definitionTtsUrl,
                options: shuffle([
                  itm.text,
                  ...options.filter((o) => itm.text !== o).slice(rnd, rnd + 3),
                ]),
                type: "select",
              };

              return selectItem;
            }
          }),
        };
      }),
    submit: (input: TestInput) =>
      set((state) => {
        const currentItem = state.items[state.currentIndex];

        const sanitizedGivenAnswer = sanityzeText(input.answer);
        const sanitizedAnswer = sanityzeText(currentItem.answer);

        const correct = sanitizedAnswer === sanitizedGivenAnswer;

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
      set((state) => {
        if (state.currentIndex < state.items.length - 1) {
          return { currentIndex: ++state.currentIndex, state: "idle" };
        } else {
          return { state: "complete" };
        }
      }),
  }));
};

export type TestStore = ReturnType<typeof createTestStore>;
