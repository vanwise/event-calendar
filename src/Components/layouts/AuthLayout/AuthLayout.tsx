import styled from 'styled-components/macro';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <Root>
      <Wrapper>
        <Outlet />
      </Wrapper>
    </Root>
  );
}

const Root = styled.main`
  display: flex;
  padding: 20px;
  height: 100%;
  overflow: auto;
`;

const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 40px;
  max-width: 600px;
  border-radius: 10px;
  background: var(--violet2);
  box-shadow: 0 0 5px 0 var(--violet);
`;

export default AuthLayout;
