import React from 'react';
import { RegisterIcon, HomeIcon, UserDeniedIcon, WelcomeIcon } from '../icons';
import { utilsData } from '../utils/utilsData';
import { Form, Formik } from 'formik';
import { signupSchema } from '../schemas';
import { CustomBtnInnerContent, CustomLinkBtn } from '../components/CustomBtns';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { CustomInput } from '../components/CustomInput';
import { useFormStatusController } from '../helpers';

export default function SignUp() {
  const navigate = useNavigate();
  const { apiURL, apiSignUpRoute } = utilsData;
  const {
    fetchingStatus,
    submittingForm,
    loadingStatus,
    failedStatus,
    successStatus
  } = useFormStatusController();

  const createUser = async ({ firstName, lastName, email, password }) => {
    try {
      loadingStatus();
      const response = await fetch(`${apiURL}${apiSignUpRoute}`, {
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
      });

      if (response.status === 400) {
        failedStatus();
        throw new Error('Bad Request, please try again later');
      }

      successStatus();
      const json = await response.json();
      if (json.user) {
        localStorage.setItem('userId', json.user._id);
        localStorage.setItem('userName', json.user.firstName);
      }
      if (json.token) {
        localStorage.setItem('fetchedToken', json.token);
      }
      navigate({
        pathname: '/CurrentSchedule'
      });
    } catch (error) {
      console.error('An error occurred:', error);
    }
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
                {fetchingStatus === 'initialStatus' ? (
                  <CustomBtnInnerContent
                    text="Sign-Up"
                    icon={<RegisterIcon />}
                  />
                ) : null}

                {fetchingStatus === 'loadingStatus' ? (
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

                {fetchingStatus === 'successStatus' ? (
                  <CustomBtnInnerContent
                    text="Welcome"
                    icon={<WelcomeIcon />}
                  />
                ) : null}

                {fetchingStatus === 'failedStatus' ? (
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
