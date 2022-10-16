import { css } from 'styled-components/macro';

export const BUTTON_THEMES = {
  violet: css`
    color: white;

    &:disabled {
      color: var(--gray8);

      &::before {
        background: var(--gray);
      }
    }

    &::before {
      background: var(--violet);
    }

    &::after {
      border: 1px solid var(--violet);
      background: var(--red);
    }
  `,
  light: css`
    color: var(--violet);

    &:disabled {
      color: var(--gray8);

      &::before {
        background: var(--gray);
      }
    }

    &::before {
      background: var(--violet2);
    }

    &::after {
      background: var(--red2);
    }
  `,
};

export const BUTTON_LOADER_COLOR = {
  violet: 'white',
  light: 'var(--violet)',
};
