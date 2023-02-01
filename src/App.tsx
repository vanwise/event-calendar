import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import Routes from 'Routes';
import { appHistory } from 'Routes/history';
import 'Assets/styles/index.css';

function App() {
  return (
    <HistoryRouter history={appHistory}>
      <Routes />
    </HistoryRouter>
  );
}

export default App;
