import { useEffect } from 'react';
import styled, { CSSProp } from 'styled-components/macro';
import { CloseButton } from 'Components/buttons';

export interface ModalProps extends WithChildren {
  title: string;
  /** @param onClose callback must be wrapped in useCallback */
  onClose(): void;
  isVisible?: boolean;
  isLoading?: boolean;
  contentCSS?: CSSProp;
}

function Modal({
  isVisible,
  title,
  onClose,
  children,
  isLoading,
  contentCSS,
}: ModalProps) {
  const handleClose = isLoading ? undefined : onClose;

  useEffect(() => {
    function handleKeyDown({ key }: KeyboardEvent) {
      if (key === 'Escape') {
        handleClose?.();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  if (!isVisible) {
    return null;
  }

  return (
    <Root role="dialog" onClick={handleClose}>
      <Wrapper onClick={e => e.stopPropagation()}>
        <Header>
          <Title>{title}</Title>
          <CloseButton onClick={handleClose} title="Close modal" />
        </Header>

        <ContentWrapper $CSS={contentCSS}>{children}</ContentWrapper>
      </Wrapper>
    </Root>
  );
}

const Root = styled.article`
  position: fixed;
  z-index: 101;
  top: 0;
  left: 0;
  display: flex;
  padding: 10px;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: var(--gray-opacity);
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 100%;
  max-width: 800px;
  margin: auto;
  border-radius: 10px;
  border: 1px solid var(--violet);
  background: white;
  box-shadow: 0 0 2px 0 var(--violet);
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 20px;
  border-bottom: 1px solid var(--gray6);
`;

const Title = styled.h2`
  font-size: 30px;
`;

const ContentWrapper = styled.div<{ $CSS: ModalProps['contentCSS'] }>`
  padding: 20px 0 0;

  ${({ $CSS }) => $CSS}
`;

export default Modal;
