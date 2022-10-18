import { ReactNode } from 'react';
import styled, { CSSProp } from 'styled-components/macro';
import { UseFormProps, UseFormReset, UseFormReturn } from 'react-hook-form';
import { Button } from 'Components/buttons';
import { useHookForm } from 'Hooks';

interface SectionFormProps<FormValues> extends WithClassName {
  title: string;
  onSubmit(
    values: FormValues,
    resetForm: UseFormReset<FormValues>,
  ): Promise<any>;
  titleCSS?: CSSProp;
  formProps?: UseFormProps<FormValues>;
  buttonText: string;
  isLoading?: boolean;
  renderFields(
    formMethods: Omit<UseFormReturn<FormValues>, 'handleSubmit'>,
  ): ReactNode;
}

function SectionForm<FormValues>({
  title,
  onSubmit,
  titleCSS,
  className,
  formProps,
  isLoading,
  buttonText,
  renderFields,
}: SectionFormProps<FormValues>) {
  const { handleSubmit, ...formMethods } = useHookForm<FormValues>(formProps);

  function handleFormSubmit(values: FormValues) {
    return onSubmit(values, formMethods.reset);
  }

  return (
    <section className={className}>
      <Title $CSS={titleCSS}>{title}</Title>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {renderFields(formMethods)}
        <Button
          type="submit"
          disabled={!formMethods.formState.isDirty}
          isLoading={isLoading}>
          {buttonText}
        </Button>
      </form>
    </section>
  );
}

const Title = styled.h2<{ $CSS?: CSSProp }>`
  margin: 0 0 20px;
  font-size: 30px;

  ${({ $CSS }) => $CSS}
`;

export default SectionForm;
