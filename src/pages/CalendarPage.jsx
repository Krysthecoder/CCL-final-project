import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarPage() {
  const [value, onChange] = useState(new Date());

  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <div>
      <h1>Calendar Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Log-out</Link>
          </li>
        </ul>
      </nav>

      <div>
        <div>
          <h1>Schedule a new Appointment</h1>
        </div>
        <div>
          <Calendar onChange={onChange} value={value} />
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
