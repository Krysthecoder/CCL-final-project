import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { LogoutIcon, CalendarIcon } from '../icons';

function CurrentSchedule() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <nav className="w-full flex justify-between h-20 bg-gradient-to-tr from-sky-600 to-sky-900 px-16 items-center">
        <div>
          <h1 className="text-5xl text-stone-300 font-semibold">Dentora</h1>
          <p className="text-xs font-semibold text-stone-800 pl-1">
            Fixing the chimuelo.
          </p>
        </div>
        <ul>
          <li>
            <Link to="/" className=" text-stone-300">
              <LogoutIcon title="Logout" />
            </Link>
          </li>
        </ul>
      </nav>

      <div className="grid grid-cols-6 grid-rows-3 gap-10 w-3/4 mx-auto mt-10">
        <div className="col-start-1 col-span-4 items-center row-span-3">
          <h1 className="text-2xl">Your Current Appointments are:</h1>
          <table className="w-full mt-7 border-4 border-sky-100">
            <tr className="text-left border-4 border-sky-100">
              <th className="border-x-4 border-sky-100">Title</th>
              <th className="border-x-4 border-sky-100">Start Time</th>
              <th className="border-x-4 border-sky-100">End Time</th>
            </tr>
            <tr>
              <td className="border-4 border-sky-100 text-sm">
                Appointment with Krysthopher
              </td>
              <td className="border-4 border-sky-100 text-sm">8am</td>
              <td className="border-4 border-sky-100 text-sm">9am</td>
            </tr>
          </table>
        </div>
        <div className="col-start-5 col-span-3 row-start-1 row-span-2">
          <Link to="../ScheduleNewAppointment">
            <button
              class="flex justify-center items-center gap-2 bg-gradient-to-tr w-full mt-3 mb-4 from-sky-600 to-sky-900 py-2 px-10 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <span>Schedule new appointment</span>
              <span>{<CalendarIcon />}</span>
            </button>
          </Link>
          <Calendar onChange={onChange} value={value} />
        </div>
      </div>
    </div>
  );
}

export default CurrentSchedule;
