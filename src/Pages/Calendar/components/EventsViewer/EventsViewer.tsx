import styled from 'styled-components/macro';
import { HiddenTitle } from 'Components/text';
import EventsTimeBar from '../EventsTimeBar';
import { EventDetails } from './components';

function EventsViewer() {
  return (
    <Root>
      <HiddenTitle level={2}>Events viewer</HiddenTitle>
      <EventsTimeBar />
      <EventDetails />
    </Root>
  );
}

const Root = styled.article`
  display: grid;
  grid-template-columns: 1fr minmax(auto, 300px);
  grid-gap: 0 25px;
  overflow: hidden;
`;

export default EventsViewer;
