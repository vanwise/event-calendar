import styled from 'styled-components/macro';

type BlurredLayoutProps = DivPropsWithoutRef;

function BlurredLayout(props: BlurredLayoutProps) {
  return <Root {...props} />;
}

const Root = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 10px;
  min-height: 30px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.22);
`;

export default BlurredLayout;
