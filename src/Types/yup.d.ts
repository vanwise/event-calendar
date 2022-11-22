import { RequiredStringSchema } from 'yup/lib/string';
import { AnyObject } from 'yup/lib/types';

declare module 'yup' {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType,
  > extends yup.BaseSchema<TType, TContext, TOut> {
    trimAndRequired(
      trimMessage?: Message,
      requiredMessage?: Message,
    ): RequiredStringSchema<TType, TContext>;
    withoutSpaces(): StringSchema<TType, TContext, TOut>;
    dateISO(): StringSchema<TType, TContext, TOut>;
    password(requiredMessage?: Message): RequiredStringSchema<TType, TContext>;
    passwordConfirm(
      passwordFiledName: string,
      trimMessage?: Message,
      requiredMessage?: Message,
    ): RequiredStringSchema<TType, TContext>;
  }
}
