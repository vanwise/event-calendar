import { useCallback, useState } from 'react';
import styled, { CSSProp, keyframes } from 'styled-components/macro';
import { WithOutsideClick } from 'Components/HOCs';

interface MainDropdownProps extends WithClassName {
  renderDropdown(closeDropdown: () => void): JSX.Element;
  renderTrigger(
    toggleDropdown: () => void,
    isDropdownVisible: boolean,
  ): JSX.Element;
  dropdownWrapperCSS?: CSSProp;
  onClose?(): void;
}

function MainDropdown({
  renderDropdown,
  renderTrigger,
  className,
  dropdownWrapperCSS,
  onClose,
}: MainDropdownProps) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [wrapperTopPosition, setWrapperTopPosition] = useState(0);

  const measuredRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      const topPosition = node.getBoundingClientRect().top;
      setWrapperTopPosition(topPosition);
    }
  }, []);

  function closeDropdown() {
    setIsDropdownVisible(false);
    onClose?.();
  }

  function toggleDropdown() {
    setIsDropdownVisible(prevValue => !prevValue);
  }

  return (
    <WithOutsideClick onOutsideClick={closeDropdown}>
      <Root className={className}>
        {renderTrigger(toggleDropdown, isDropdownVisible)}
        {isDropdownVisible && (
          <DropdownWrapper
            ref={measuredRef}
            $CSS={dropdownWrapperCSS}
            $topPosition={wrapperTopPosition}>
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

const DropdownWrapper = styled.div<{ $CSS?: CSSProp; $topPosition: number }>`
  position: absolute;
  z-index: 10;
  top: calc(100% - 5px);
  right: 0;
  background: white;
  border-radius: 10px;
  border: 1px solid var(--gray);
  box-shadow: 0 5px 20px 5px var(--gray-opacity);
  animation: ${fadeInAnimation} 0.3s forwards;
  overflow: auto;
  ${({ $CSS }) => $CSS}
  max-height: calc(100vh - ${({ $topPosition }) => `${$topPosition - 10}px`});
`;

export default MainDropdown;
