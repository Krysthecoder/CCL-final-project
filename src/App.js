import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import CurrentSchedule from './pages/CurrentSchedule';
import ScheduleNewAppointment from './pages/ScheduleNewAppointment';

function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/CurrentSchedule" element={<CurrentSchedule />} />
            <Route
              path="/ScheduleNewAppointment"
              element={<ScheduleNewAppointment />}
            />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
