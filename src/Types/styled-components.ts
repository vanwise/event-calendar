import { DefaultTheme, StyledComponentBase } from 'styled-components/macro';

export type StyledComponentsAsProp = Parameters<
  StyledComponentBase<any, DefaultTheme>
>[0]['as'];
