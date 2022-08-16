import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes as Switch,
} from 'react-router-dom';
import { MainLayout } from 'Components/layouts';
import { CalendarPage, ProfilePage } from 'Pages';
import { ROUTES } from 'Utils/constants/routes';

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
