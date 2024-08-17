import React, { useState } from 'react';
import { RegisterIcon, HomeIcon, UserDeniedIcon } from '../icons';
import { utilsData } from '../utils/utilsData';
import { Form, Formik } from 'formik';
import { signupSchema } from '../schemas';
import { CustomBtnInnerContent, CustomLinkBtn } from '../components/CustomBtns';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { CustomInput } from '../components/CustomInput';

export default function SignUp() {
  const navigate = useNavigate();
  const [signupStatus, setSignupStatus] = useState('initialStatus');
  const [submittingForm, setSubmittingForm] = useState(false);

  const createUser = async ({ firstName, lastName, email, password }) => {
    try {
      setSignupStatus('loadingStatus');
      const response = await fetch(
        utilsData.apiURL + utilsData.apiSignUpRoute,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password
          })
        }
      );

      if (response.status === 400) {
        setSignupStatus('failedStatus');
        console.log('Bad Request, please try again later');
        statusReset();
      } else {
        const json = await response.json();
        if (json.token.length > 0) {
          window.localStorage.setItem('fetchedToken', json.token);
        }
        if (json.user._id.length > 0) {
          localStorage.setItem('userId', json.user._id);
        }
        pageRedirecter();
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };

  const statusReset = () => {
    setTimeout(() => {
      setSignupStatus('initialStatus');
      setSubmittingForm(false);
    }, 1500);
  };

  const pageRedirecter = () => {
    setTimeout(() => {
      navigate({
        pathname: '/CurrentSchedule'
      });
    }, 1500);
  };

  const initialFormStatus = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  return (
    <div className="w-11/12 md:w-8/12 mt-10 md:mt-32 flex justify-center items-center flex-col mx-auto">
      <h1 className=" text-4xl md:text-5xl text-sky-700 font-bold">
        Welcome to Dentora
      </h1>
      <h3 className="text-lg md:text-2xl mt-6 ">Please register a new user</h3>

      <Formik
        initialValues={initialFormStatus}
        validationSchema={signupSchema}
        onSubmit={function (values, actions) {
          setSubmittingForm(true);
          createUser(values);
          actions.resetForm();
        }}
      >
        {(props, isSubmitting = submittingForm) => (
          <Form className="flex flex-col w-10/12 gap-4 mt-6 md:mt-8 lg:w-8/12">
            <CustomInput
              id="firstName"
              name="firstName"
              label="Enter your first name."
              type="firstName"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.firstName}
              disabled={isSubmitting}
            />
            <CustomInput
              id="lastName"
              name="lastName"
              label="Enter your last name."
              type="lastName"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.lastName}
              disabled={isSubmitting}
            />
            <CustomInput
              id="email"
              name="email"
              label="Enter your email."
              type="email"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.email}
              disabled={isSubmitting}
            />
            <CustomInput
              id="password"
              name="password"
              label="Enter your password."
              type="password"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.password}
              disabled={isSubmitting}
            />
            <CustomInput
              id="confirmPassword"
              name="confirmPassword"
              label="Please confirm your password."
              type="password"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.confirmPassword}
              disabled={isSubmitting}
            />

            <div className="flex justify-between mt-6">
              <CustomLinkBtn
                path={'/'}
                className={
                  'custom-btn-styles w-5/12 md:w-auto lg:w-5/12 lg:py-4'
                }
                text="Go-Back"
                icon={<HomeIcon />}
              />

              <button
                type="submit"
                className="custom-btn-styles w-5/12 md:w-auto lg:w-6/12 lg:py-4"
              >
                {signupStatus === 'initialStatus' ? (
                  <CustomBtnInnerContent
                    text="Sign-Up"
                    icon={<RegisterIcon />}
                  />
                ) : null}

                {signupStatus === 'loadingStatus' ? (
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

                {signupStatus === 'failedStatus' ? (
                  <CustomBtnInnerContent
                    text="Failed"
                    icon={<UserDeniedIcon />}
                  />
                ) : null}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
