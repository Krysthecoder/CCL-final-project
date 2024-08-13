import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Calendar from 'react-calendar';
import { GoBackIcon, ScheduleIcon } from '../icons';
import { CustomBtnInnerContent, CustomLinkBtn } from '../components/CustomBtns';
import { Form, Formik } from 'formik';
import { CustomInput } from '../components/CustomInput';
import { createAppoitmentSchema } from '../schemas';
import { utilsData } from '../utils/utilsData';
import 'react-calendar/dist/Calendar.css';

import Typography from '@mui/material/Typography';

import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers';

function ScheduleNewAppointment() {
  const [value, onChange] = useState(new Date());

  const token = localStorage.getItem('fetchedToken');

  async function appointmentCreator({ title, startTime, endTime }) {
    try {
      const response = await fetch(
        utilsData.apiURL + utilsData.apiCreatNewAppointment,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          },
          body: JSON.stringify({
            title,
            user: localStorage.getItem('userId'),
            startTime,
            endTime,
            createdBy: localStorage.getItem('userId')
          })
        }
      );

      if (response.status === 400) {
        console.log('error', response.error);
        return;
      }

      if (response.status === 401) {
        console.log('error');
        return;
      }

      if (response.status === 404) {
        console.log('error');
        return;
      }

      const json = await response.json();
      console.log(json);
      console.log('success');
    } catch (error) {
      console.log('An error occurred:', error);
    }
  }

  const getCurrentTime = () => dayjs().format('YYYY-MM-DDTHH:mm');

  const initialFormStatus = {
    title: '',
    startTime: dayjs(getCurrentTime()),
    endTime: dayjs(getCurrentTime()),
    description: ''
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto">
        <div className="flex justify-between gap-10 mt-20">
          <div className="basis-1/2 flex flex-col justify-center items-center">
            <Typography variant="h6">
              Please select from the below options:
            </Typography>

            <Formik
              initialValues={initialFormStatus}
              validationSchema={createAppoitmentSchema}
              onSubmit={function (values, actions) {
                console.log(values);
                appointmentCreator(values);
                actions.resetForm();
              }}
            >
              {(props) => (
                <Form
                  className="flex flex-col mx-auto gap-4 mt-6"
                  onSubmit={props.handleSubmit}
                >
                  <CustomInput
                    id="title"
                    name="title"
                    label="Enter your title!"
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.title}
                  />

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoItem label="Enter your Start Time:">
                      <TimePicker
                        className="text-sm  pl-2 border-2 w-full  border-sky-600 rounded-lg py-1"
                        sx={{
                          '& .MuiFormControl-root': {
                            border: '0px solid transparent'
                          },
                          '& .MuiInputBase-root': {
                            width: '500px',
                            color: '#717171'
                          }
                        }}
                        value={dayjs(props.values.startTime)}
                        onChange={(newValue) => {
                          props.values.startTime = dayjs(newValue.$d).format(
                            'ddd, DD MMM YYYY hh:mm:ss'
                          );
                        }}
                        defaultValue={dayjs(getCurrentTime())}
                      />
                    </DemoItem>
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoItem label="Enter your End Time:">
                      <TimePicker
                        className="text-sm  pl-2 border-2 w-full  border-sky-600 rounded-lg py-1"
                        sx={{
                          '& .MuiFormControl-root': {
                            border: '0px solid transparent'
                          },
                          '& .MuiInputBase-root': {
                            width: '500px',
                            color: '#717171'
                          }
                        }}
                        value={dayjs(props.values.endTime)}
                        onChange={(newValue) => {
                          props.values.endTime = dayjs(newValue.$d).format(
                            'ddd, MMM DD YYYY hh:mm:ss A'
                          );
                        }}
                        defaultValue={dayjs(getCurrentTime())}
                      />
                    </DemoItem>
                  </LocalizationProvider>

                  <CustomInput
                    id="description"
                    name="description"
                    label="Enter your description!"
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.description}
                    multiline
                    rows={4}
                  />

                  <button
                    type="submit"
                    className="custom-btn-styles items-center justify-center w-6/12 mx-auto mt-4"
                  >
                    <CustomBtnInnerContent
                      text="Submit"
                      icon={<ScheduleIcon />}
                    />
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          <div className="basis-1/2">
            <CustomLinkBtn
              path={'../CurrentSchedule'}
              className={
                'flex justify-center items-center gap-2 bg-gradient-to-tr w-[350px] mb-6 from-sky-600 to-sky-900 py-2 px-10 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
              }
              text={'Go Back'}
              icon={<GoBackIcon />}
            />

            <Calendar onChange={onChange} value={value} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleNewAppointment;
