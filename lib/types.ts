export interface Item {
  id: string;
  text: string;
  definition: string;
  image?: string;
  textTtsUrl?: string;
  definitionTtsUrl?: string;
}

export interface ItemCreateDto {
  text: string;
  definition: string;
  image?: string;
  textTtsUrl?: string;
  definitionTtsUrl?: string;
}

export interface Set {
  id: string;
  title: string;
  items: Item[];
}

export interface SetGetDto {
  id: number;
  title: string;
}

export interface SetCreateDto {
  title: string;
  items: Item[];
}

export interface Result<T, E> {
  success: boolean;
  data: T | null;
  error: E | null;
}

export const errorResult = <T>(
  name: string,
  message: string
): Result<T, Error> => {
  return { data: null, success: false, error: { name, message } };
};

export const successResult = <T>(data: T) => {
  return { data: data, success: true, error: null };
};
