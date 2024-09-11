import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Typography from '@mui/material/Typography';
import { GoBackIcon, ScheduleIcon } from '../icons';
import ButtonWithIcon from '../components/ButtonWithIcon';
import { Form, Formik } from 'formik';
import { createAppoitmentSchema } from '../schemas';
import { utilsData } from '../utils/utilsData';
import CustomInput from '../components/CustomInput';
import dayjs from 'dayjs';
import { DemoItem, DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import SnackbarComponent from '../components/SnackbarComponent';
import useLocalStorage from '../CustomHooks';
import { duration } from '@mui/material';

function ScheduleNewAppointment() {
  dayjs.extend(customParseFormat);
  const { apiURL, apiAppointments } = utilsData;
  const { getItem } = useLocalStorage();
  const token = getItem('fetchedToken');
  const user = getItem('userId');

  const [submittingForm, setSubmittingForm] = useState(false);
  const [customSnackbarStatus, setCustomSnackbarStatus] = useState({
    isOpen: false,
    snackbarCaption: '',
    duration: 1000
  });

  useEffect(() => {}, [customSnackbarStatus]);

  const appointmentCreator = async ({
    title,
    date,
    startTime,
    endTime,
    description
  }) => {
    startTime = `${date} ${startTime} GMT`;
    endTime = `${date} ${endTime} GMT`;

    try {
      setSubmittingForm(true);
      const response = await fetch(`${apiURL}${apiAppointments}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify({
          title,
          user: user,
          startTime,
          endTime,
          description,
          createdBy: user
        })
      });

      if (response.status === 404) {
        console.log('response status: ', response.status);
        setSubmittingForm(false);
        setCustomSnackbarStatus({
          isOpen: true,
          snackbarCaption: 'Error creating Appointment, please try again.',
          duration: 3000
        });
        throw new Error(`Error creating appointment: ${response.error}`);
      }

      setCustomSnackbarStatus({
        isOpen: true,
        snackbarCaption: 'Appointment Created.',
        duration: 1500
      });
      setSubmittingForm(false);
      return;
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const getCurrentTime = () => dayjs().format('YYYY-MM-DDTHH:mm');

  const initialFormStatus = {
    title: 'Enter your title',
    date: dayjs(getCurrentTime()),
    startTime: dayjs(getCurrentTime()),
    endTime: dayjs(getCurrentTime()),
    description: 'This is a dev test'
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto">
        <div className="flex flex-col justify-center items-center mt-8 mx-auto lg:mt-20 lg:w-6/12">
          <Typography variant="h6">
            Please select from the below options:
          </Typography>

          <SnackbarComponent
            isOpen={customSnackbarStatus.isOpen}
            snackbarCaption={customSnackbarStatus.snackbarCaption}
            duration={customSnackbarStatus.duration}
          />

          <Formik
            initialValues={initialFormStatus}
            validationSchema={createAppoitmentSchema}
            onSubmit={function (values, actions) {
              appointmentCreator(values);
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
                              'HH:mm:ss'
                            );
                          }}
                          defaultValue={props.startTime}
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
                              'HH:mm:ss'
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
                  <ButtonWithIcon
                    linkType={true}
                    linkRoute={'../CurrentSchedule'}
                    linkClassName="custom-btn-styles items-center justify-center w-5/12 mx-auto mt-4"
                    IconComp={<GoBackIcon />}
                    btnCaption={'Go Back'}
                    disabled={isSubmitting}
                  />

                  <ButtonWithIcon
                    btnClassName={
                      'custom-btn-styles items-center justify-center w-5/12 mx-auto mt-4'
                    }
                    disabled={isSubmitting}
                    IconComp={<ScheduleIcon />}
                    btnCaption="Submit"
                    type="submit"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default ScheduleNewAppointment;
