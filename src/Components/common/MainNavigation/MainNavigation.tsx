import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';
import { ClockIcon, ProfileIcon } from 'Components/svg';
import { ROOT_ROUTES } from 'Utils/constants/routes';

type MainNavigationProps = WithClassName;

const { CALENDAR, PROFILE } = ROOT_ROUTES;
const LINKS = [
  { path: CALENDAR, Icon: ClockIcon },
  { path: PROFILE, Icon: ProfileIcon },
];

function MainNavigation({ className }: MainNavigationProps) {
  return (
    <nav className={className}>
      <LinksList>
        {LINKS.map(({ path, Icon }) => {
          const pageName = path.split('/').at(-1)?.toUpperCase();

          return (
            <li key={path}>
              <NavLinkStylized to={path} title={`${pageName} page link`}>
                {({ isActive }) => (
                  <Icon className="link-icon" isActive={isActive} />
                )}
              </NavLinkStylized>
            </li>
          );
        })}
      </LinksList>
    </nav>
  );
}

const LinksList = styled.menu`
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

export default MainNavigation;
