import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Calendar from 'react-calendar';
import { GoBackIcon, ScheduleIcon } from '../icons';
import { Link } from 'react-router-dom';
import '../customStyles/customStyles.css';

function ScheduleNewAppointment() {
  const officeHrsArr = [
    '8:00 am',
    '9:00 am',
    '10:00 am',
    '11:00 am',
    '01:00 pm',
    '02:00 pm',
    '03:00 pm',
    '04:00 pm',
    '05:00 pm'
  ];
  const [timeSelected, setTimeSelected] = useState('');

  useEffect(() => {
    console.log(timeSelected);
  }, [timeSelected]);

  return (
    <div>
      <NavBar />

      <div className="grid grid-cols-3 grid-rows-2 gap-10 w-3/4 mx-auto mt-20">
        <div className="col-start-1 col-span-2 items-center row-span-3">
          <h1 className="text-2xl">Please select from the below options:</h1>

          <form action="submit">
            <label className="flex gap-4 text-base justify-between mt-8 items-center">
              Title:
              <input
                type="text"
                placeholder="Juanito"
                className="w-7/12 pl-2 border-2  border-sky-600 rounded-lg py-1"
              />
            </label>

            <label
              htmlFor=""
              className="flex gap-4 text-base justify-between mt-8 items-center"
            >
              Choose the time:
              <select
                input="menu"
                className="w-7/12 pl-2 border-2  border-sky-600 rounded-lg py-1"
                value={timeSelected}
                onChange={(e) => setTimeSelected(e.target.value)}
              >
                {officeHrsArr.map((el) => (
                  <option value={el}>{el}</option>
                ))}
              </select>
            </label>

            <label className="flex gap-4 text-base justify-between mt-8">
              Description:
              <textarea
                type="text"
                placeholder="Juanito"
                className="w-7/12 pl-2 border-2 text-sm h-20 border-sky-600 rounded-lg py-1"
              />
            </label>

            <button
              className="flex justify-center items-center gap-2 bg-gradient-to-tr mx-auto mt-6 rounded-lg from-sky-600 to-sky-900 py-2 px-10 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <span>Schedule</span>
              <ScheduleIcon />
            </button>
          </form>
        </div>

        <div className="col-start-3 col-span-3 row-start-1 row-span-2">
          <Calendar className="w-full" />
          <Link to="../CurrentSchedule">
            <button
              className="flex justify-center items-center gap-2 bg-gradient-to-tr custom-width mt-6 from-sky-600 to-sky-900 py-2 px-10 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <span>Go Back</span>
              <GoBackIcon />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ScheduleNewAppointment;
