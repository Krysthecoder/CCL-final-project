import React, { useEffect, useState } from 'react';
import { CalendarIcon } from '../icons';
import NavBar from '../components/NavBar/index';
import { utilsData } from '../utils/utilsData';
import { format } from '@formkit/tempo';
import { CustomLinkBtn } from '../components/CustomBtns';
import AppointmentsTable from '../components/AppointmentsTable/Index';

function CurrentSchedule() {
  const [currentAppts, setCurrentAppts] = useState([]);

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
          console.log(data);
        })
      )
      .catch((err) => console.log('error', err));
  }

  useEffect(() => {
    appointmentsGetter();
  }, []);

  return (
    <div>
      <NavBar />

      <div className="flex flex-col w-4/5 justify-center items-center mx-auto mt-6">
        <div className="flex justify-between w-full items-center">
          <h1 className="text-2xl">Your Current Appointments are:</h1>

          <CustomLinkBtn
            path={'../ScheduleNewAppointment'}
            className={
              'flex justify-center items-center gap-2 bg-gradient-to-tr w-4/12 mt-3 mb-4 from-sky-600 to-sky-900 py-2 px-10 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
            }
            text={'Schedule new appointment'}
            icon={<CalendarIcon />}
          />
        </div>
        <AppointmentsTable rowData={currentAppts} />
      </div>
    </div>
  );
}

export default CurrentSchedule;
