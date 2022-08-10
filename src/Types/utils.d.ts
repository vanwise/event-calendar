type Nullable<T> = T | null;

type FullRequired<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};
