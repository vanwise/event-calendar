import { ReactNode } from 'react';
import styled, { CSSProp } from 'styled-components/macro';
import { yupResolver } from '@hookform/resolvers/yup';
import { UseFormReturn } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AnyObjectSchema } from 'yup';
import { Button } from 'Components/buttons';
import { useHookForm } from 'Hooks';
import { AccessToken } from 'Store/features/auth/auth.slice';
import { FormSubmit } from 'Types/libs';

export type AuthFormMethods<FormValues> = Omit<
  UseFormReturn<FormValues>,
  'handleSubmit' | 'setError'
>;

interface RouteData {
  url: string;
  text: string;
  title: string;
  linkText: string;
}
interface AuthFormProps<FormValues> {
  formCSS?: CSSProp;
  onSubmit: FormSubmit<FormValues, AccessToken | void>;
  routeData: RouteData;
  isLoading: boolean;
  renderInputs(formMethods: AuthFormMethods<FormValues>): ReactNode;
  validationSchema?: AnyObjectSchema;
  inputsWrapperCSS?: CSSProp;
}

function AuthForm<FormValues>({
  formCSS,
  onSubmit,
  routeData,
  isLoading,
  renderInputs,
  validationSchema,
  inputsWrapperCSS,
}: AuthFormProps<FormValues>) {
  const resolver = validationSchema && yupResolver(validationSchema);

  const { handleSubmit, ...formMethods } = useHookForm<FormValues>({
    resolver,
  });

  return (
    <Root>
      <Title>{routeData.title}</Title>

      <Form $CSS={formCSS} onSubmit={handleSubmit(onSubmit)}>
        <InputsWrapper $CSS={inputsWrapperCSS}>
          {renderInputs(formMethods)}
        </InputsWrapper>
        <SubmitButton isLoading={isLoading} type="submit">
          Submit
        </SubmitButton>
      </Form>

      <LinkWrapper>
        <Text>{routeData.text}</Text>
        <LinkStylized to={routeData.url}>{routeData.linkText}!</LinkStylized>
      </LinkWrapper>
    </Root>
  );
}

const Root = styled.section`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 30px;
  margin: 0 0 20px;
`;

const Form = styled.form<{ $CSS?: CSSProp }>`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin: 0 0 30px;

  ${({ $CSS }) => $CSS}
`;

const InputsWrapper = styled.div<{ $CSS?: CSSProp }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 0 50px;

  ${({ $CSS }) => $CSS}
`;

const SubmitButton = styled(Button)`
  margin: auto auto 0;
  width: 70%;
`;

const LinkWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin: 0 auto;
`;

const Text = styled.p`
  font-size: 14px;
`;

const LinkStylized = styled(Link)`
  text-decoration: underline;
  transition: 0.3s ease-out;

  &:hover {
    opacity: 0.7;
  }
`;

export default AuthForm;
