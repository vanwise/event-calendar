import styled from 'styled-components/macro';
import { Outlet } from 'react-router-dom';
import {
  MainNavigation,
  Notifications,
  ProfileDropdown,
} from 'Components/common';
import { MainLogoIcon } from 'Components/svg';
import { useNotificationSubscription } from 'Hooks';
import { handlePushNotification } from 'Utils/helpers/notifications';

handlePushNotification();

function MainLayout() {
  useNotificationSubscription();

  return (
    <Root>
      <NavigationSidebar>
        <LogoWrapper>
          <MainLogoIcon />
        </LogoWrapper>

        <MainNavigation />
      </NavigationSidebar>

      <Wrapper>
        <Header>
          <HeaderWrapper>
            <NotificationsStylized />
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

const NavigationSidebar = styled.aside`
  border-right: 2px solid var(--gray);
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 15px 40px;
  padding: 20px 0;
  height: 90px;
  border-bottom: 2px solid var(--gray);
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

const NotificationsStylized = styled(Notifications)`
  margin: 0 15px 0 0;
`;

const Content = styled.main`
  flex-grow: 1;
  overflow: hidden;
`;

export default MainLayout;
