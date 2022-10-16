import { ReactNode, useCallback, useEffect, useState } from 'react';
import styled, { CSSProp } from 'styled-components/macro';
import { IconButton } from 'Components/buttons';
import { ModalHookProps } from 'Types/libs';
import { modalAnimations } from './Modal.utils';

export interface ModalProps extends ModalHookProps, WithChildren {
  title: string;
  titleCSS?: CSSProp;
  isLoading?: boolean;
  contentCSS?: CSSProp;
  wrapperCSS?: CSSProp;
  headerButtonsCSS?: CSSProp;
  withoutClosingOnEsc?: boolean;
  isCloseButtonHidden?: boolean;
  headerButtonsContent?: ReactNode;
}
interface WrapperProps {
  $CSS: ModalProps['wrapperCSS'];
  $hasClosingAnimation: boolean;
}

const animationDurationInMs = 300;

function Modal({
  title,
  onClose,
  children,
  titleCSS,
  isVisible,
  isLoading,
  contentCSS,
  wrapperCSS,
  headerButtonsCSS,
  isCloseButtonHidden,
  withoutClosingOnEsc,
  headerButtonsContent,
}: ModalProps) {
  const [hasClosingAnimation, setHasClosingAnimation] = useState(false);

  const showAnimationAndClose = useCallback(() => {
    setHasClosingAnimation(true);
    setTimeout(() => {
      onClose();
      setHasClosingAnimation(false);
    }, animationDurationInMs);
  }, [onClose]);

  const handleClose = isLoading ? undefined : showAnimationAndClose;

  useEffect(() => {
    if (withoutClosingOnEsc) return;

    function handleKeyDown({ key }: KeyboardEvent) {
      if (key === 'Escape') {
        handleClose?.();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleClose, withoutClosingOnEsc]);

  useEffect(() => {
    if (isVisible) {
      setHasClosingAnimation(false);
    }
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <Root
      role="dialog"
      onClick={handleClose}
      $hasClosingAnimation={hasClosingAnimation}>
      <Backdrop $hasClosingAnimation={hasClosingAnimation} />
      <Wrapper
        $CSS={wrapperCSS}
        onClick={e => e.stopPropagation()}
        $hasClosingAnimation={hasClosingAnimation}>
        <Header>
          <Title $CSS={titleCSS}>{title}</Title>
          <HeaderButtons $CSS={headerButtonsCSS}>
            {headerButtonsContent}

            {!isCloseButtonHidden && (
              <IconButton
                icon="cross"
                title="Close modal"
                onClick={handleClose}
              />
            )}
          </HeaderButtons>
        </Header>

        <ContentWrapper $CSS={contentCSS}>{children}</ContentWrapper>
      </Wrapper>
    </Root>
  );
}

const { backdropFadeIn, backdropFadeOut, wrapperFadeIn, wrapperFadeOut } =
  modalAnimations;

const Root = styled.article<{ $hasClosingAnimation: boolean }>`
  position: fixed;
  z-index: 101;
  top: 0;
  left: 0;
  display: flex;
  padding: 10px;
  width: 100%;
  height: 100%;
  overflow: auto;
  ${({ $hasClosingAnimation }) =>
    $hasClosingAnimation && 'pointer-events: none;'}
`;

const Backdrop = styled.div<{ $hasClosingAnimation: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  background: var(--gray-opacity);
  animation: ${({ $hasClosingAnimation }) =>
      $hasClosingAnimation ? backdropFadeOut : backdropFadeIn}
    ${animationDurationInMs}ms;
`;

const Wrapper = styled.div<WrapperProps>`
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
  animation: ${({ $hasClosingAnimation }) =>
      $hasClosingAnimation ? wrapperFadeOut : wrapperFadeIn}
    ${animationDurationInMs}ms;

  ${({ $CSS }) => $CSS}
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 20px;
  border-bottom: 1px solid var(--gray6);
`;

const Title = styled.h2<{ $CSS: ModalProps['titleCSS'] }>`
  font-size: 30px;

  ${({ $CSS }) => $CSS}
`;

const HeaderButtons = styled.div<{ $CSS: ModalProps['headerButtonsCSS'] }>`
  display: flex;

  ${({ $CSS }) => $CSS}
`;

const ContentWrapper = styled.div<{ $CSS: ModalProps['contentCSS'] }>`
  padding: 20px 0 0;

  ${({ $CSS }) => $CSS}
`;

export default Modal;
