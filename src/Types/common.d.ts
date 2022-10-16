interface WithClassName {
  className?: string;
}
interface WithChildren {
  children?: React.ReactNode;
}

type SvgProps = React.ComponentPropsWithoutRef<'svg'>;
type ButtonPropsWithoutRef = React.ComponentPropsWithoutRef<'button'>;
type H1PropsWithoutRef = React.ComponentPropsWithoutRef<'h1'>;
type SpanPropsWithoutRef = React.ComponentPropsWithoutRef<'span'>;
type InputPropsWithoutRef = React.ComponentPropsWithoutRef<'input'>;
type TextAreaPropsWithoutRef = React.ComponentPropsWithoutRef<'textarea'>;
type DivPropsWithoutRef = React.ComponentPropsWithoutRef<'div'>;

interface SelectOption<V = string, L = string> {
  label: L;
  value: V;
}
