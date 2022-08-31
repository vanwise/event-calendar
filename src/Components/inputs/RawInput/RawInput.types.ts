import { CSSProp } from 'styled-components/macro';

export type RawInputTag = 'input' | 'textarea';

interface HTMLElementByInputTag {
  input: HTMLInputElement;
  textarea: HTMLTextAreaElement;
}

export type RawInputProps<As extends RawInputTag = 'input'> =
  React.ComponentPropsWithoutRef<As> & {
    as?: As;
    inputCSS?: CSSProp;
    hasError?: boolean;
  };

export type RawInputRef<As extends RawInputTag = 'input'> = React.Ref<
  HTMLElementByInputTag[As]
>;
