import * as yup from 'yup';
import { Maybe, Message } from 'yup/lib/types';
import { DATE_ISO_REGEX } from 'Utils/constants/regex';

function hasYupStringMatch(
  regex: Parameters<string['match']>[0],
  string: Maybe<string>,
) {
  if (!string) return true;
  return Boolean(string?.match(regex)?.length);
}

yup.setLocale({
  mixed: {
    required: 'Field is required',
  },
  string: {
    min({ min }) {
      return `Min length is ${min}`;
    },
    max({ max }) {
      return `Max length is ${max}`;
    },
  },
});

yup.addMethod(
  yup.StringSchema,
  'trimAndRequired',
  function (trimMessage: Message, requiredMessage: Message) {
    return this.trim(trimMessage).required(requiredMessage);
  },
);

yup.addMethod(yup.StringSchema, 'withoutSpaces', function () {
  return this.test('withoutSpaces', 'Without spaces', value =>
    hasYupStringMatch(/ /, value),
  );
});

yup.addMethod(
  yup.StringSchema,
  'password',
  function (requiredMessage: Message) {
    return this.required(requiredMessage).withoutSpaces().min(4).max(16);
  },
);

yup.addMethod(
  yup.StringSchema,
  'passwordConfirm',
  function (passwordFiledName: string, requiredMessage: Message) {
    return this.required(requiredMessage)
      .withoutSpaces()
      .test('passwordConfirm', 'Passwords not same', (value, context) => {
        const passwordValue = context.parent[passwordFiledName];
        return hasYupStringMatch(passwordValue, value);
      });
  },
);

yup.addMethod(yup.StringSchema, 'dateISO', function () {
  return this.test('dateISO', 'Must be an ISO date', value =>
    hasYupStringMatch(DATE_ISO_REGEX, value),
  );
});

export default yup;
