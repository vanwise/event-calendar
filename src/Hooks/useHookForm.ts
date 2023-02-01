import { useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FieldValues,
  Path,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form';
import { AnyObjectSchema } from 'yup';
import { FormSubmit } from 'Types/libs';

export interface UseHookFormProps<Values extends FieldValues = FieldValues>
  extends UseFormProps<Values> {
  validationSchema?: AnyObjectSchema;
}

function useHookForm<
  Values extends FieldValues = FieldValues,
  SubmitResult = any,
>({
  validationSchema,
  ...restFormProps
}: UseHookFormProps<Values> = {}): UseFormReturn<Values> {
  const resolver = validationSchema && yupResolver(validationSchema);

  const { handleSubmit: onSubmit, ...formMethods } = useForm<Values>({
    resolver,
    ...restFormProps,
  });

  const handleSubmit = useCallback(
    (
      onValid: FormSubmit<Values, SubmitResult>,
      onInvalid?: SubmitErrorHandler<Values>,
    ) => {
      const submit: SubmitHandler<Values> = (...args) => {
        onValid(...args)?.catch(({ data }) => {
          const formErrors = data?.messages;

          if (formErrors) {
            Object.keys(formErrors).forEach(key => {
              const fieldKey = key as Path<Values>;
              formMethods.setError(fieldKey, { message: formErrors[fieldKey] });
            });
          }
        });
      };

      return onSubmit(submit, onInvalid);
    },
    [onSubmit, formMethods],
  );

  return { handleSubmit, ...formMethods };
}

export default useHookForm;
