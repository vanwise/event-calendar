import { useState } from 'react';
import styled, { CSSProp, keyframes } from 'styled-components/macro';
import WithOutsideClick from 'Components/WithOutsideClick';

interface MainDropdownProps {
  renderDropdown(closeDropdown: () => void): JSX.Element;
  renderTrigger(
    toggleDropdown: () => void,
    isDropdownVisible: boolean,
  ): JSX.Element;
  className?: string;
  dropdownWrapperCSS?: CSSProp;
}

function MainDropdown({
  renderDropdown,
  renderTrigger,
  className,
  dropdownWrapperCSS,
}: MainDropdownProps) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  function closeDropdown() {
    setIsDropdownVisible(false);
  }

  function toggleDropdown() {
    setIsDropdownVisible(prevValue => !prevValue);
  }

  return (
    <WithOutsideClick onOutsideClick={closeDropdown}>
      <Root className={className}>
        {renderTrigger(toggleDropdown, isDropdownVisible)}
        {isDropdownVisible && (
          <DropdownWrapper $CSS={dropdownWrapperCSS}>
            {renderDropdown(closeDropdown)}
          </DropdownWrapper>
        )}
      </Root>
    </WithOutsideClick>
  );
}

const Root = styled.div`
  position: relative;
`;

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
    transform: translateY(10px);
  }
`;

const DropdownWrapper = styled.div<{ $CSS?: CSSProp }>`
  position: absolute;
  top: calc(100% - 5px);
  right: 0;
  background: white;
  border-radius: 10px;
  border: 1px solid var(--gray);
  box-shadow: 0px 5px 20px 5px var(--gray);
  animation: ${fadeInAnimation} 0.3s forwards;
  ${({ $CSS }) => $CSS}
`;

export default MainDropdown;
