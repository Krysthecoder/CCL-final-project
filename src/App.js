import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import CalendarPage from './pages/CalendarPage';

function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/CalendarPage" element={<CalendarPage />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
