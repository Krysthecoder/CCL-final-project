import React from 'react';
import NavBar from '../components/NavBar';
import Calendar from 'react-calendar';
import { GoBackIcon, ScheduleIcon } from '../icons';
import '../customStyles/customStyles.css';
import 'react-calendar/dist/Calendar.css';
import { CustomBtnInnerContent, CustomLinkBtn } from '../components/CustomBtns';
import { Form, Formik } from 'formik';
import { CustomInput, CustomAreaInput } from '../components/CustomInput';
import { createAppoitmentSchema } from '../schemas';
import { CustomSelect } from '../components/CustomSelect';

function ScheduleNewAppointment() {
  const timeSchedule = [
    { value: '09:00:00', label: '9:00 am' },
    { value: '09:30:00', label: '9:30 am' },
    { value: '10:00:00', label: '10:00 am' },
    { value: '10:30:00', label: '10:30 am' },
    { value: '11:00:00', label: '11:00 am' },
    { value: '11:30:00', label: '11:30 am' },
    { value: '12:00:00', label: '12:00 pm' },
    { value: '12:30:00', label: '12:30 pm' },
    { value: '13:00:00', label: '1:00 pm' },
    { value: '13:30:00', label: '1:30 pm' },
    { value: '14:00:00', label: '2:00 pm' },
    { value: '14:30:00', label: '2:30 pm' },
    { value: '15:00:00', label: '3:00 pm' },
    { value: '15:30:00', label: '3:30 pm' },
    { value: '16:00:00', label: '4:00 pm' },
    { value: '16:30:00', label: '4:30 pm' },
    { value: '17:00:00', label: '5:00 pm' }
  ];

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
                  {timeSchedule.map((el) => {
                    return <option value={el.value}>{el.label}</option>;
                  })}
                </CustomSelect>

                <CustomSelect
                  label="Start Time"
                  name="endTime"
                  placeHolder="Please select the end time"
                >
                  <option value="">Please select the start time </option>
                  {timeSchedule.map((el) => {
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
