import { useCallback } from 'react';
import {
  FieldValues,
  Path,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  UseFormProps,
} from 'react-hook-form';
import { FormSubmit } from 'Types/libs';

function useHookForm<
  Values extends FieldValues = FieldValues,
  SubmitResult = any,
>(formProps?: UseFormProps<Values>) {
  const { handleSubmit: onSubmit, ...formMethods } = useForm(formProps);

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
