import styled from 'styled-components/macro';
import { Outlet } from 'react-router-dom';
import { useNotificationSubscription } from 'Hooks';
import { handlePushNotification } from 'Utils/helpers/notifications';
import {
  NavigationSidebar,
  Notifications,
  ProfileDropdown,
} from './components';

handlePushNotification();

function MainLayout() {
  useNotificationSubscription();

  return (
    <Root>
      <NavigationSidebar />

      <Wrapper>
        <Header>
          <HeaderWrapper>
            <Notifications />
            <ProfileDropdown />
          </HeaderWrapper>
        </Header>

        <Content>
          <Outlet />
        </Content>
      </Wrapper>
    </Root>
  );
}

const Root = styled.div`
  display: grid;
  grid-template: 100% / 100px 1fr;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  flex-grow: 1;
  overflow: hidden;
`;

export default MainLayout;
