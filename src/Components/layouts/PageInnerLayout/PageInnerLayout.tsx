import { ReactNode } from 'react';
import styled, { CSSProp } from 'styled-components/macro';

interface PageInnerLayoutProps extends WithChildren {
  title: string;
  headerWrapperCSS?: CSSProp;
  headerRightElement?: ReactNode;
}

function PageInnerLayout({
  title,
  children,
  headerWrapperCSS,
  headerRightElement,
}: PageInnerLayoutProps) {
  return (
    <Root>
      <PageHeader $CSS={headerWrapperCSS}>
        <PageTitle>{title}</PageTitle>
        {headerRightElement}
      </PageHeader>
      {children}
    </Root>
  );
}

const Root = styled.article`
  display: flex;
  flex-direction: column;
  padding: 40px;
  height: 100%;
`;

const PageHeader = styled.header<{ $CSS?: CSSProp }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 30px;

  ${({ $CSS }) => $CSS}
`;

const PageTitle = styled.h1`
  font-size: 50px;
  font-weight: 700;
  line-height: 60px;
`;

export default PageInnerLayout;
