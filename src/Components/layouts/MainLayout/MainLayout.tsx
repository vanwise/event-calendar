import { ReactNode } from 'react';
import styled from 'styled-components/macro';
import {
  NavigationSidebar,
  Notifications,
  ProfileDropdown,
} from './components';

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <Root>
      <NavigationSidebar />

      <div>
        <Header>
          <HeaderWrapper>
            <Notifications />
            <ProfileDropdown />
          </HeaderWrapper>
        </Header>

        <Content>{children}</Content>
      </div>
    </Root>
  );
}

const Root = styled.div`
  display: grid;
  grid-template: 1fr / 100px 1fr;
  height: 100%;
`;

const Header = styled.header`
  display: flex;
  padding: 15px 40px 0;
  height: 90px;
`;

const HeaderWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 0 15px;
  border-bottom: 2px solid var(--gray);
`;

const Content = styled.main`
  display: flex;
`;

export default MainLayout;
