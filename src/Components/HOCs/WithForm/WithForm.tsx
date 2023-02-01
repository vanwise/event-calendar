import { ReactElement } from 'react';
import styled, { CSSProp } from 'styled-components/macro';
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { useHookForm } from 'Hooks';
import { UseHookFormProps } from 'Hooks/useHookForm';

interface WithFormProps<Values extends FieldValues = FieldValues> {
  formCSS?: CSSProp;
  onSubmit: SubmitHandler<Values>;
  children(
    formMethods: Omit<UseFormReturn<Values>, 'handleSubmit'>,
  ): ReactElement;
  hookFormProps?: UseHookFormProps<Values>;
}

function WithForm<Values extends FieldValues = FieldValues>({
  formCSS,
  onSubmit,
  children,
  hookFormProps,
}: WithFormProps<Values>) {
  const { handleSubmit, ...restFormMethods } =
    useHookForm<Values>(hookFormProps);

  return (
    <Form role="form" $CSS={formCSS} onSubmit={handleSubmit(onSubmit)}>
      {children(restFormMethods)}
    </Form>
  );
}

const Form = styled.form<{ $CSS?: CSSProp }>`
  ${({ $CSS }) => $CSS}
`;

export default WithForm;
