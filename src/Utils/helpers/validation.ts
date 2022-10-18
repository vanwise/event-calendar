import { isPlainObject } from '@reduxjs/toolkit';
import { RegisterOptions } from 'react-hook-form';
import { EMAIL_REGEX } from '../constants/regex';

type PlainValidationsType = 'required' | 'email';
interface ComplexOption {
  text?: string;
  value: any;
}
interface ComplexValidationsType {
  maxLength?: ComplexOption;
  minLength?: ComplexOption;
  match?: ComplexOption;
}
type ValidationsType = PlainValidationsType | ComplexValidationsType;

const requiredValidation = {
  validate: {
    required(value: unknown) {
      if (!value || (typeof value === 'string' && !value.trim())) {
        return 'Field is required';
      }
    },
  },
};

const allOptions = {
  required: requiredValidation,
  email: {
    pattern: {
      value: EMAIL_REGEX,
      message: 'Invalid email format',
    },
    ...requiredValidation,
  },
  maxLength({ value, text }: ComplexOption) {
    return {
      maxLength: {
        value,
        message: text || `Max length is ${value}`,
      },
    };
  },
  minLength({ value, text }: ComplexOption) {
    return {
      minLength: {
        value,
        message: text || `Min length is ${value}`,
      },
    };
  },
  match({ value, text }: ComplexOption) {
    return {
      validate: {
        match: (fieldValue: unknown) => fieldValue === value || text,
      },
    };
  },
};

export function combineValidations(
  source: Partial<RegisterOptions>,
  target: Partial<RegisterOptions>,
) {
  return Object.keys(target).reduce(
    (acc: Partial<RegisterOptions>, key) => {
      const optionsField = key as keyof RegisterOptions;
      const rule = target[optionsField];

      if (isPlainObject(rule)) {
        acc[optionsField] = {
          ...(source[optionsField] || null),
          ...rule,
        };
      } else {
        acc[optionsField] = rule;
      }

      return acc;
    },
    { ...source },
  );
}

export function getValidations(types: ValidationsType[]): RegisterOptions {
  const selectedOptions = types.reduce((acc: RegisterOptions, type) => {
    if (typeof type === 'string') {
      const rules = allOptions[type] as Partial<RegisterOptions>;
      acc = combineValidations(acc, rules);
    } else {
      Object.keys(type).forEach(complexType => {
        const currentComplextType = complexType as keyof ComplexValidationsType;
        const getComplexOption = allOptions[currentComplextType];
        const args = type[currentComplextType];

        if (args) {
          acc = combineValidations(acc, getComplexOption(args));
        }
      });
    }

    return acc;
  }, {});

  return selectedOptions;
}
