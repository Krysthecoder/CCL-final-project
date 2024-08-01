import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import CurrentSchedule from './pages/CurrentSchedule';
import ScheduleNewAppointment from './pages/ScheduleNewAppointment';
import ProtectedRoutes from './pages/ProtectedRoutes';

function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/SignUp" element={<SignUp />} />

            <Route element={<ProtectedRoutes />}>
              <Route
                exact
                path="/CurrentSchedule"
                element={<CurrentSchedule />}
              />
              <Route
                path="/ScheduleNewAppointment"
                element={<ScheduleNewAppointment />}
              />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
