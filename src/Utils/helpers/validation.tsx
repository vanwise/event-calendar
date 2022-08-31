import { RegisterOptions } from 'react-hook-form';

type PlainValidationsType = 'required';
interface ComplexValidationsType {
  maxLength?: number;
  minLength?: number;
}
type ValidationsType = PlainValidationsType | ComplexValidationsType;

const allOptions = {
  required: 'Field is required',
  maxLength(value = 0) {
    return {
      value,
      message: `Max length is ${value}`,
    };
  },
  minLength(value = 0) {
    return {
      value,
      message: `Min length is ${value}`,
    };
  },
};

export function getValidations(types: ValidationsType[]): RegisterOptions {
  const selectedOptions = types.reduce((acc: RegisterOptions, type) => {
    if (typeof type === 'string') {
      acc[type] = allOptions[type];
    } else {
      Object.keys(type).forEach(complexType => {
        const currentComplextType = complexType as keyof ComplexValidationsType;
        const getComplexOption = allOptions[currentComplextType];

        acc[currentComplextType] = getComplexOption(type[currentComplextType]);
      });
    }

    return acc;
  }, {});

  return selectedOptions;
}
