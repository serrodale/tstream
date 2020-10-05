export type AsyncValue<T> = Promise<T> | T;
export type AsyncValues<T> = Promise<T[]> | T[];