import { ReactNode } from 'react';
import styled from 'styled-components/macro';
import { ErrorMessage } from '@hookform/error-message';
import { FieldValues } from 'react-hook-form';
import { TextWithLineClamp } from 'Components/text';
import { FormInputProps } from 'Types/libs';

export type InputLayoutProps<FormValues> = Pick<
  FormInputProps<FormValues>,
  'name' | 'errors'
> &
  WithClassName & {
    label?: string;
    isDisabled?: boolean;
    renderInput(hasError: boolean): ReactNode;
    isWrapperAsDiv?: boolean;
  };

function InputLayout<FormValues extends FieldValues>({
  name,
  label,
  errors,
  className,
  isDisabled,
  renderInput,
  isWrapperAsDiv,
}: InputLayoutProps<FormValues>) {
  const hasError = Boolean(errors?.[name]);
  const as = label && !isWrapperAsDiv ? undefined : 'div';

  return (
    <Root as={as} className={className}>
      {label && <Text>{label}</Text>}

      <ErrorWrapper as={as} className={className}>
        {renderInput(hasError)}

        <ErrorMessage
          name={name as any}
          errors={errors}
          render={({ message }) =>
            !isDisabled &&
            message && (
              <OneLineText className={className} title={message}>
                {message}
              </OneLineText>
            )
          }
        />
      </ErrorWrapper>
    </Root>
  );
}

const Root = styled.label`
  display: flex;
  flex-direction: column;
`;

const Text = styled.span`
  display: block;
  font-size: 16px;
  margin: 0 0 8px;
`;

const ErrorWrapper = styled.span`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const OneLineText = styled(TextWithLineClamp)`
  position: absolute;
  top: -9px;
  right: 5px;
  padding: 0 10px;
  max-width: calc(100% - 10px);
  font-size: 12px;
  border: 1px solid var(--red2);
  border-radius: 10px;
  background: white;
  color: red;
`;

export default InputLayout;
