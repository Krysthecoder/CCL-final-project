import React from 'react';
import NavBar from '../components/NavBar';
import Calendar from 'react-calendar';
import { GoBackIcon, ScheduleIcon } from '../icons';
import { CustomBtnInnerContent, CustomLinkBtn } from '../components/CustomBtns';
import { Form, Formik } from 'formik';
import { CustomInput, CustomAreaInput } from '../components/CustomInput';
import { createAppoitmentSchema } from '../schemas';
import { CustomSelect } from '../components/CustomSelect';
import { officeHours, utilsData } from '../utils/utilsData';
import 'react-calendar/dist/Calendar.css';

function ScheduleNewAppointment() {
  // async function appointmentsGetter() {
  //   const url = utilsData.apiURL + utilsData.apiGetCurrentAppointments;
  //   const token = window.localStorage.getItem('fetchedToken');
  //   await fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       'x-access-token': token
  //     },
  //     body: JSON.stringify({
  //       // title: ,
  //       // user: ,
  //       // startTime: ,
  //       // endTime: ,
  //       // createdBy:
  //     })
  //   })
  //     .then((response) =>
  //       response.json().then((data) => {
  //         //setCurrentAppts(data.appointments);
  //       })
  //     )
  //     .catch((err) => console.log('error', err));
  // }

  return (
    <div>
      <NavBar />

      <div className="grid grid-cols-3 grid-rows-2 gap-10 w-3/4 mx-auto mt-20">
        <div className="col-start-1 col-span-2 items-center row-span-3">
          <h1 className="text-2xl ">Please select from the below options:</h1>

          <Formik
            initialValues={{
              title: '',
              startTime: '',
              endTime: '',
              description: ''
            }}
            validationSchema={createAppoitmentSchema}
          >
            {(props) => (
              <Form className="flex flex-col w-4/5 mx-auto gap-4 mt-6">
                <CustomInput
                  label="Title"
                  name="title"
                  type="text"
                  placeHolder="Enter your title!"
                />

                <CustomSelect
                  label="Start Time"
                  name="startTime"
                  placeHolder="Please select the start time"
                >
                  <option value="">Please select the start time </option>
                  {officeHours.map((el) => {
                    return <option value={el.value}>{el.label}</option>;
                  })}
                </CustomSelect>

                <CustomSelect
                  label="Start Time"
                  name="endTime"
                  placeHolder="Please select the end time"
                >
                  <option value="">Please select the start time </option>
                  {officeHours.map((el) => {
                    return <option value={el.value}>{el.label}</option>;
                  })}
                </CustomSelect>

                <CustomAreaInput
                  label="Description"
                  name="description"
                  type="text"
                  placeHolder="Enter a brief description"
                />

                <button type="submit">
                  <span className="custom-btn-styles">
                    <CustomBtnInnerContent
                      text={'Schedule'}
                      icon={<ScheduleIcon />}
                    />
                  </span>
                </button>
              </Form>
            )}
          </Formik>
        </div>

        <div className="col-start-3 col-span-3 row-start-1 row-span-2">
          <CustomLinkBtn
            path={'../CurrentSchedule'}
            className={
              'flex justify-center items-center gap-2 bg-gradient-to-tr custom-width mb-6 from-sky-600 to-sky-900 py-2 px-10 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
            }
            text={'Go Back'}
            icon={<GoBackIcon />}
          />

          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default ScheduleNewAppointment;
