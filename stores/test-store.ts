import { Item } from "@/lib/types";

export interface TestProps {
  initialItems: Item[];
  currentIndex: number;
  submit: () => void;
}
