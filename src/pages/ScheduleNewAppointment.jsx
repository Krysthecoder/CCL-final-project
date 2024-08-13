import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Calendar from 'react-calendar';
import { dateFixerFn } from '../helpers';
import { GoBackIcon, ScheduleIcon } from '../icons';
import {
  CustomBtnInnerContent,
  CustomLinkBtn,
  CustomSbtBtn
} from '../components/CustomBtns';
import { Form, Formik, useFormik } from 'formik';
import { CustomInput, CustomAreaInput } from '../components/CustomInput';
import { createAppoitmentSchema } from '../schemas';
import { CustomSelect } from '../components/CustomSelect';
import { officeHours, utilsData } from '../utils/utilsData';
import 'react-calendar/dist/Calendar.css';

import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';

function ScheduleNewAppointment() {
  const [value, onChange] = useState(new Date());

  const token = localStorage.getItem('fetchedToken');

  async function appointmentCreator(title, startTime, endTime) {
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
            title: title,
            user: localStorage.getItem('userId'),
            startTime: startTime,
            endTime: endTime,
            createdBy: localStorage.getItem('userId')
          })
        }
      );

      if (response.status === 400) {
      } else if (response.status === 401) {
      } else if (response.status === 404) {
      } else {
        const json = await response.json();
        console.log(json);
        console.log('success');
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  }

  // const onSubmit = (values, actions) => {
  //   console.log('test');
  //   console.log(values);
  //   // appointmentCreator(
  //   //   values.title,
  //   //   dateFixerFn(value, values.startTime),
  //   //   dateFixerFn(value, values.endTime)
  //   // );
  //   //console.log(values.title);
  //   //actions.resetForm();
  // };

  // const initialFormStatus = {
  //   title: '',
  //   // startTime: '',
  //   // endTime: '',
  //   description: ''
  // };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto">
        <div className="flex justify-between gap-10 mt-20">
          <div className="basis-1/2 flex flex-col justify-center items-center">
            <Typography variant="h6">
              Please select from the below options:
            </Typography>
            {/* <form
              onSubmit={handleSubmit}
              autoComplete="off"
              className="flex flex-col mx-auto gap-4 mt-4"
            >
              <TextField
                id="outlined-basic"
                sx={{
                  '&  .MuiOutlinedInput-root': {
                    width: '500px'
                  }
                }}
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                variant="outlined"
                label="Enter a title"
              />

              <TextField
                id="outlined-basic"
                sx={{
                  '&  .MuiOutlinedInput-root': {
                    width: '500px'
                  }
                }}
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
                variant="outlined"
                label="Enter a description"
              />
            </form> */}

            <Formik
              initialValues={{ title: '' }}
              validationSchema={createAppoitmentSchema}
              onSubmit={(values, actions) => {
                console.log(values);
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
                  <CustomSelect
                    label="Please select the start time"
                    name="startTime"
                  />
                  <CustomSelect
                    label="Please select the end time"
                    name="endTime"
                  />

                  {/* <CustomInput
                  label="Description"
                  name="description"
                  type="text"
                  placeholder="Enter a brief description"
                  multiline
                  rows={4}
                /> */}
                  {props.errors.title && (
                    <div id="feedback">{props.errors.title}</div>
                  )}
                  <button type="submit">Hola</button>
                  {/* <CustomSbtBtn
                  text="hola"
                  icon={<ScheduleIcon />}
                  className="w-6/12 mx-auto mt-4"
                  type="submit"
                /> */}
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
