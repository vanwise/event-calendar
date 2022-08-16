import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';
import { CalendarIcon, MainLogoIcon, ProfileIcon } from 'Components/svg';
import { ROUTES } from 'Utils/constants/routes';

const { CALENDAR_PATH, PROFILE_PATH } = ROUTES;
const LINKS = [
  { path: CALENDAR_PATH, Icon: CalendarIcon },
  { path: PROFILE_PATH, Icon: ProfileIcon },
];

function NavigationSidebar() {
  return (
    <Root>
      <LogoWrapper>
        <MainLogoIcon />
      </LogoWrapper>

      <nav>
        <LinksList>
          {LINKS.map(({ path, Icon }) => (
            <li key={path}>
              <NavLinkStylized to={path}>
                {({ isActive }) => (
                  <Icon className="link-icon" isActive={isActive} />
                )}
              </NavLinkStylized>
            </li>
          ))}
        </LinksList>
      </nav>
    </Root>
  );
}

const Root = styled.aside`
  border-right: 2px solid var(--gray);
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 15px 20px;
  padding: 15px 0;
  height: 90px;
  border-bottom: 2px solid var(--gray);

  &:hover {
    svg {
      transform: rotate(360deg);
    }
  }

  svg {
    transition: 0.7s ease-out;
  }
`;

const LinksList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px 0;
`;

const NavLinkStylized = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;

  &:hover {
    &[href] {
      &:not(.active) {
        .link-icon {
          transform: scale(1.1);
        }
      }
    }
  }

  &.active {
    position: relative;
    cursor: default;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 5px;
      height: 100%;
      border-radius: 10px 0 0 10px;
      background: var(--red2);
    }
  }

  .link-icon {
    width: 40px;
    transition: 0.3s ease-out;
  }
`;

export default NavigationSidebar;
