import React, { useEffect, useState } from 'react';
import { CalendarIcon } from '../icons';
import NavBar from '../components/NavBar/index';
import { utilsData } from '../utils/utilsData';
import AppointmentsTable from '../components/AppointmentsTable/Index';
import ButtonWithIcon from '../components/ButtonWithIcon';

function CurrentSchedule() {
  const [currentAppts, setCurrentAppts] = useState([]);
  const { apiURL, apiAppointments } = utilsData;

  const appointmentsGetter = async () => {
    const token = window.localStorage.getItem('fetchedToken');
    await fetch(`${apiURL}${apiAppointments}`, {
      method: 'GET',
      headers: {
        'x-access-token': token
      }
    })
      .then((response) =>
        response.json().then((data) => {
          setCurrentAppts(data.appointments);
        })
      )
      .catch((err) => console.log('error', err));
  };

  useEffect(() => {
    appointmentsGetter();
  });

  return (
    <div>
      <NavBar />

      <div className="flex flex-col w-4/5 justify-center items-center mx-auto mt-6">
        <div className="flex flex-col md:flex-row justify-between w-full items-center">
          <h1 className="text-2xl">Your Current Appointments are:</h1>

          <ButtonWithIcon
            linkType={true}
            linkRoute={'../ScheduleNewAppointment'}
            linkClassName={
              'flex justify-center items-center gap-2 bg-gradient-to-tr w-4/12 mt-3 mb-4 from-sky-600 to-sky-900 py-2 px-10 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
            }
            IconComp={<CalendarIcon />}
            btnCaption={'Schedule new appointment'}
          />
        </div>
        <AppointmentsTable rowData={currentAppts} />
      </div>
    </div>
  );
}

export default CurrentSchedule;
