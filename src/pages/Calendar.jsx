import React from 'react';
import { Link } from 'react-router-dom';

function Calendar() {
  return (
    <div>
      <h1>Calendar Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/Calendar">Calendar</Link>
          </li>
          <li>
            <Link to="/PatientsRecord">Patient's Records</Link>
          </li>
          <li>
            <Link to="/">Log-out</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Calendar;
