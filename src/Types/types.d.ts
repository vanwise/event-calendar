type Nullable<T> = T | null;

type FullRequired<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};

interface WithClassName {
  className?: string;
}

type SvgProps = React.SVGProps<SVGSVGElement>;
