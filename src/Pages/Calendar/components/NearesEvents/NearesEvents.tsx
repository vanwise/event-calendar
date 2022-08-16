import styled from 'styled-components/macro';

function NearesEvents() {
  const events = null;

  if (!events) {
    return <EmptyText>No nearest events yet</EmptyText>;
  }

  return <Root></Root>;
}

const Root = styled.div``;

const EmptyText = styled.p`
  max-width: 100px;
  margin: 0 auto;
  padding: 188px 0 0;
  font-size: 20px;
  font-style: italic;
`;

export default NearesEvents;
