import React, { useState } from 'react';

import NavBar from '../components/NavBar';
import {
  GoBackIcon,
  ScheduleIcon,
  UserDeniedIcon,
  WelcomeIcon
} from '../icons';
import { CustomBtnInnerContent, CustomLinkBtn } from '../components/CustomBtns';
import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { createAppoitmentSchema } from '../schemas';
import { CustomInput } from '../components/CustomInput';
import dayjs from 'dayjs';
import { DemoItem, DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CircularProgress } from '@mui/material';

function EditAppointment() {
  const location = useLocation();
  const [createApptStatus, setCreateApptStatus] = useState('initialStatus');
  const [submittingForm, setSubmittingForm] = useState(false);

  const id = location.state.id;

  const initialFormStatus = {
    title: location.state.title,
    startTime: location.state.startTime,
    endTime: location.state.endTime,
    description: location.state.description
  };

  const getCurrentTime = () => dayjs().format('YYYY-MM-DDTHH:mm');

  return (
    <div>
      <NavBar />
      <div className="container mx-auto">
        <div className="flex flex-col justify-center items-center mt-8 mx-auto lg:mt-20 lg:w-6/12">
          <Typography variant="h6">Please edit yor appointment:</Typography>

          <Formik
            initialValues={initialFormStatus}
            validationSchema={createAppoitmentSchema}
            onSubmit={function (values, actions) {
              //
              actions.resetForm();
            }}
          >
            {(props, isSubmitting = submittingForm) => (
              <Form
                className="flex flex-col mx-auto w-10/12 gap-6 mt-6"
                onSubmit={props.handleSubmit}
              >
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-4">
                  <div className="flex flex-col w-full lg:w-6/12 gap-4 mt-2 justify-center">
                    <CustomInput
                      id="title"
                      name="title"
                      label="Enter your title!"
                      type="text"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.title}
                      disabled={isSubmitting}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoItem label="Enter your Start Time:">
                        <TimePicker
                          className="text-sm pl-2 border-2 w-full border-sky-600 rounded-lg py-1"
                          sx={{
                            '& .MuiFormControl-root': {
                              border: '0px solid transparent'
                            },
                            '& .MuiInputBase-root': {
                              color: '#717171'
                            }
                          }}
                          value={dayjs(props.values.startTime)}
                          onChange={(newValue) => {
                            props.values.startTime = dayjs(newValue.$d).format(
                              'hh:mm:ss'
                            );
                          }}
                          disabled={isSubmitting}
                        />
                      </DemoItem>
                    </LocalizationProvider>
                  </div>

                  <div className="flex flex-col w-full lg:w-6/12 gap-4 justify-center">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker
                          className="w-full"
                          sx={{
                            '& .MuiFormControl-root': {
                              border: '0px solid transparent'
                            },
                            '& .MuiInputBase-root': {
                              color: '#717171'
                            }
                          }}
                          label="Select the date"
                          value={dayjs(props.values.date)}
                          onChange={(newValue) => {
                            props.values.date = dayjs(newValue.$d).format(
                              'ddd, DD MMM YYYY'
                            );
                          }}
                          disabled={isSubmitting}
                        />
                      </DemoContainer>
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
                              color: '#717171'
                            }
                          }}
                          value={dayjs(props.values.endTime)}
                          onChange={(newValue) => {
                            props.values.endTime = dayjs(newValue.$d).format(
                              'hh:mm:ss'
                            );
                          }}
                          defaultValue={dayjs(getCurrentTime())}
                          disabled={isSubmitting}
                        />
                      </DemoItem>
                    </LocalizationProvider>
                  </div>
                </div>

                <div className="flex justify-center">
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
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex">
                  <CustomLinkBtn
                    path={'../CurrentSchedule'}
                    className="custom-btn-styles items-center justify-center w-5/12 mx-auto mt-4"
                    text={'Go Back'}
                    icon={<GoBackIcon />}
                    disabled={isSubmitting}
                  />

                  <button
                    type="submit"
                    className="custom-btn-styles items-center justify-center w-5/12 mx-auto mt-4"
                    disabled={isSubmitting}
                  >
                    {createApptStatus === 'initialStatus' ? (
                      <CustomBtnInnerContent
                        text="Submit"
                        icon={<ScheduleIcon />}
                      />
                    ) : null}

                    {createApptStatus === 'loadingStatus' ? (
                      <CustomBtnInnerContent
                        text="Loading"
                        icon={
                          <CircularProgress
                            size={20}
                            sx={{
                              color: 'white'
                            }}
                          />
                        }
                      />
                    ) : null}

                    {createApptStatus === 'failedStatus' ? (
                      <CustomBtnInnerContent
                        text="Submit"
                        icon={<UserDeniedIcon />}
                      />
                    ) : null}

                    {createApptStatus === 'successStatus' ? (
                      <CustomBtnInnerContent
                        text="Appointment Created"
                        icon={<WelcomeIcon />}
                      />
                    ) : null}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default EditAppointment;
