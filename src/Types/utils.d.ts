type Nullable<T> = T | null;

type FullRequired<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};

type StyledProps<T> = Record<`$${keyof T}`, T[keyof T]>;

type PartialBy<T, F extends keyof T> = Omit<T, F> & Partial<Pick<T, F>>;

type RequiredWithPartial<T, F extends keyof T> = PartialBy<Required<T>, F>;
