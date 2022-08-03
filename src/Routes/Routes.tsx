import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate,
} from 'react-router-dom';
import { ROUTES } from 'Utils/constants/routes';
import { CalendarPage, ProfilePage } from 'Pages';
import { MainLayout } from 'Components/layouts';

const { CALENDAR_PATH, PROFILE_PATH } = ROUTES;

function Routes() {
  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route path="/" element={<Navigate to={CALENDAR_PATH} />} />
          <Route path={CALENDAR_PATH} element={<CalendarPage />} />
          <Route path={PROFILE_PATH} element={<ProfilePage />} />
        </Switch>
      </MainLayout>
    </Router>
  );
}

export default Routes;
