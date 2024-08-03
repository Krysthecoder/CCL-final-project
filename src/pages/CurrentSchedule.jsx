import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { CalendarIcon } from '../icons';
import NavBar from '../components/NavBar/index';
import { utilsData } from '../utils/utilsData';
import { format } from '@formkit/tempo';

function CurrentSchedule() {
  const [value, onChange] = useState(new Date());
  const [currentAppts, setCurrentAppts] = useState([]);

  // async function appointmentsGetter(email, password) {
  //   try {
  //     const response = await fetch(
  //       utilsData.apiURL + utilsData.apiGetCurrentAppointments,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'x-token': window.localStorage.getItem('token')
  //         },
  //         body: JSON.stringify()
  //       }
  //     );

  //     if (response.status === 400) {
  //       console.log('please check your credentials');
  //     } else {
  //       const json = await response.json();
  //       setCurrentAppts(json);
  //       console.log('success');
  //     }
  //   } catch (error) {
  //     console.log('An error occurred:', error);
  //   }
  // }
  // async function appointmentsGetter() {
  //   const url = utilsData.apiURL + utilsData.apiGetCurrentAppointments;
  //   const token = window.localStorage.getItem('token');
  //   await fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       'x-access-token': token
  //     }
  //   })
  //     .then((response) =>
  //       response.json().then((data) => {
  //         setCurrentAppts(data.appointments);
  //         console.log(data.appointments);

  //         console.log(currentAppts);
  //       })
  //     )
  //     .catch((err) => console.log('error'));
  // }

  // const [currentAppts, setCurrentAppts] = useState([]);

  // async function appointmentsGetter(email, password) {
  //   try {
  //     const response = await fetch(
  //       utilsData.apiURL + utilsData.apiGetCurrentAppointments,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'x-token': window.localStorage.getItem('token')
  //         },
  //         body: JSON.stringify()
  //       }
  //     );

  //     if (response.status === 400) {
  //       console.log('please check your credentials');
  //     } else {
  //       const json = await response.json();
  //       setCurrentAppts(json);
  //       console.log('success');
  //     }
  //   } catch (error) {
  //     console.log('An error occurred:', error);
  //   }
  // }
  async function appointmentsGetter() {
    const url = utilsData.apiURL + utilsData.apiGetCurrentAppointments;
    const token = window.localStorage.getItem('fetchedToken');
    await fetch(url, {
      method: 'GET',
      headers: {
        'x-access-token': token
      }
    })
      .then((response) =>
        response.json().then((data) => {
          setCurrentAppts(data.appointments);
          console.log(data.appointments, 'the data thin');

          console.log(currentAppts, 'the reliable hook');
        })
      )
      .catch((err) => console.log('error'));
  }

  useEffect(() => {
    appointmentsGetter();
  }, []);

  useEffect(() => {
    console.log(currentAppts, 'the effect thing');
  }, [currentAppts]);

  return (
    <div>
      <NavBar />

      <div className="grid grid-cols-6 grid-rows-3 gap-10 w-3/4 mx-auto mt-10">
        <div className="col-start-1 col-span-4 items-center row-span-3">
          <h1 className="text-2xl">Your Current Appointments are:</h1>
          <table className="w-full mt-7 border-4 border-sky-100">
            <tr className="text-left border-4 border-sky-100">
              <th className="border-x-4 border-sky-100">Title</th>
              <th className="border-x-4 border-sky-100">Start Time</th>
              <th className="border-x-4 border-sky-100">End Time</th>
            </tr>
            {/* <tr>
              <td className="border-4 border-sky-100 text-sm">
                Appointment with Krysthopher
              </td>
              <td className="border-4 border-sky-100 text-sm">8am</td>
              <td className="border-4 border-sky-100 text-sm">9am</td>
            </tr> */}

            {currentAppts.length > 0 ? (
              currentAppts.map((el) => {
                return (
                  <tr>
                    <td className="border-x-4 border-sky-100">{el.title}</td>
                    <td className="border-x-4 border-sky-100">
                      {format(el.startTime, {
                        time: 'short',
                        date: 'short'
                      })}
                    </td>
                    <td className="border-x-4 border-sky-100">
                      {format(el.endTime, {
                        time: 'short',
                        date: 'short'
                      })}
                    </td>
                  </tr>
                );
              })
            ) : (
              <>fail</>
            )}
          </table>
        </div>

        <div className="col-start-5 col-span-3 row-start-1 row-span-2">
          <Link to="../ScheduleNewAppointment">
            <button
              className="flex justify-center items-center gap-2 bg-gradient-to-tr w-full mt-3 mb-4 from-sky-600 to-sky-900 py-2 px-10 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
