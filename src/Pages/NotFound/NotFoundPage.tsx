import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { ROOT_ROUTES } from 'Utils/constants/routes';

function NotFoundPage() {
  return (
    <Root>
      <Title>Page not found</Title>
      <HomeLink to={ROOT_ROUTES.HOME}>Go to Home page</HomeLink>
    </Root>
  );
}

const Root = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  height: 100%;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0 0 20px;
  font-size: 60px;
  font-weight: 700;
`;

const HomeLink = styled(Link)`
  font-size: 18px;
  color: var(--violet);
  transition: 0.3s ease-out;
  text-decoration: underline;

  &:hover {
    opacity: 0.7;
  }
`;

export default NotFoundPage;
