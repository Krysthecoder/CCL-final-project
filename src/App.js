import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import Calendar from './pages/Calendar';
import PatientsRecord from './pages/PatientsRecord';

function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Calendar" element={<Calendar />} />
            <Route path="/PatientsRecord" element={<PatientsRecord />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
