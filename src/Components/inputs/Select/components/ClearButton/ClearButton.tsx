import styled from 'styled-components/macro';
import { ClearIndicatorProps } from 'react-select';
import { CrossIcon } from 'Components/svg';

type ClearButtonProps<Option> = ClearIndicatorProps<Option>;

function ClearButton<Option>({ innerProps }: ClearButtonProps<Option>) {
  return (
    <div {...innerProps}>
      <Icon />
    </div>
  );
}

const Icon = styled(CrossIcon)`
  width: 10px;
  margin: 13px;
  fill: var(--red2);

  &:hover {
    opacity: 0.7;
  }
`;

export default ClearButton;
