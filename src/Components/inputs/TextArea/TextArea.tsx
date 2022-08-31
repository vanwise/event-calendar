import { css, CSSProp } from 'styled-components/macro';
import { FieldValues } from 'react-hook-form';
import Input from '../Input';
import { InputProps } from '../Input/Input.types';

interface TextAreaProps<FormValues>
  extends Omit<InputProps<FormValues, 'textarea'>, 'inputAs'> {
  textAreaCSS?: CSSProp;
}

function getInputCSS(textAreaCSS?: CSSProp) {
  return css`
    resize: none;
    ${textAreaCSS}
  `;
}

function TextArea<FormValues extends FieldValues>({
  textAreaCSS,
  ...restProps
}: TextAreaProps<FormValues>) {
  return (
    <Input
      rows={5}
      inputAs="textarea"
      inputCSS={getInputCSS(textAreaCSS)}
      {...restProps}
    />
  );
}

export default TextArea;
