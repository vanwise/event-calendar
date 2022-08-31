import { StylesConfig } from 'react-select';

interface GetSelectStylesArgs {
  isFocused: boolean;
  hasError: boolean;
}

export function getSelectStyles<Option extends SelectOption>({
  isFocused,
  hasError,
}: GetSelectStylesArgs): StylesConfig<Option> {
  const controlFocusedCSS = {
    borderColor: `var(${hasError ? '--red2' : '--transparent'})`,
    boxShadow: `0 0 5px 0 var(${hasError ? '--red2' : '--violet'})`,
    transform: 'scale(1.001)',
  };
  const inputPaddingCSS = {
    padding: '7px 9px',
  };

  return {
    control(_, state) {
      return {
        display: 'flex',
        height: 38,
        borderRadius: 5,
        border: '1px solid',
        borderColor: `var(${(() => {
          if (state.isDisabled) {
            return '--gray';
          } else if (hasError) {
            return '--red2';
          }
          return '--gray6';
        })()})`,
        transition: '0.3s',
        cursor: state.isDisabled ? 'not-allowed' : 'pointer',
        ...(isFocused ? controlFocusedCSS : null),
      };
    },
    valueContainer(provided) {
      return {
        ...provided,
        padding: 0,
      };
    },
    placeholder(provided, state) {
      return {
        ...provided,
        margin: '7px 9px',
        color: `var(${state.isDisabled ? '--gray6' : '--gray8'})`,
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 1,
      };
    },
    singleValue(provided) {
      return {
        ...provided,
        ...inputPaddingCSS,
        color: 'var(--gray7)',
      };
    },
    input(provided) {
      return {
        ...provided,
        margin: 0,
        ...inputPaddingCSS,
        color: 'var(--gray7)',
      };
    },
    dropdownIndicator(provided, state) {
      return {
        ...provided,
        svg: {
          ...(state.isDisabled ? { fill: 'var(--gray)' } : null),
        },
      };
    },
    menu(provided) {
      return {
        ...provided,
        borderColor: `var(${hasError ? '--red2' : '--gray6'})`,
        boxShadow: '0 0 5px 0 var(--violet)',
        overflow: 'hidden',
      };
    },
  };
}
