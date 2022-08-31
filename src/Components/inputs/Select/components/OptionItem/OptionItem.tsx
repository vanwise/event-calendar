import styled from 'styled-components/macro';
import { components, OptionProps } from 'react-select';

type OptionItemProps = OptionProps<any>;

function OptionItem(props: OptionItemProps) {
  return <Root {...props} />;
}

const Root = styled(components.Option)`
  background: var(
    ${({ isFocused, isSelected }) => {
      if (isSelected) {
        return '--violet';
      } else if (isFocused) {
        return '--violet2';
      }

      return '--white';
    }}
  ) !important;

  ${({ isDisabled, isSelected }) =>
    !isDisabled && !isSelected && 'cursor: pointer !important;'}
`;

export default OptionItem;
