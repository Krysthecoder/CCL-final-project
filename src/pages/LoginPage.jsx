import React, { useState } from 'react';
import img from '../assets/login-doctor-image.jpg';
import { Form, Formik } from 'formik';
import { utilsData } from '../utils/utilsData';
import { useNavigate } from 'react-router-dom';
import {
  CircledUptArrow,
  LoginIcon,
  UserDeniedIcon,
  WelcomeIcon
} from '../icons';
import { loginSchema } from '../schemas';
import { CircularProgress } from '@mui/material';
import ButtonWithIcon from '../components/ButtonWithIcon';
import { CustomBtnInnerContent } from '../components/CustomBtns';
import CustomInput from '../components/CustomInput';
import { useFormStatusController } from '../helpers';

function LoginPage() {
  const {
    fetchingStatus,
    submittingForm,
    loadingStatus,
    failedStatus,
    successStatus
  } = useFormStatusController();
  const { apiURL, apiSignInRoute } = utilsData;

  const [isLoggedIn, setIsLoggedIn] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const loginMethod = async ({ email, password }) => {
    try {
      loadingStatus();
      const response = await fetch(`${apiURL}${apiSignInRoute}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      if (response.status === 400) {
        setErrorMsg('Bad Request, please try again later!');
        failedStatus();
        setIsLoggedIn('unauthorized');
        throw new Error(`Error loging into account: ${response.error}`);
      } else if (response.status === 401) {
        setErrorMsg('Bad Credentials, please try again!');
        failedStatus();
        setIsLoggedIn('unauthorized');
        console.log('error');
      } else if (response.status === 404) {
        setErrorMsg('Bad Credentials, please try again!');
        failedStatus();
        setIsLoggedIn('unauthorized');
        throw new Error(`Error loging into account: ${response.error}`);
      } else {
        const json = await response.json();
        if (json.user) {
          window.localStorage.setItem('userName', json.user.firstName);
        }
        if (json.token.length > 0) {
          window.localStorage.setItem('fetchedToken', json.token);
          successStatus();
          console.log('success');

          setIsLoggedIn('authorized');
          pageRedirecter();
        }
        if (json.user._id.length > 0) {
          localStorage.setItem('userId', json.user._id);
        }
      }
    } catch (error) {
      setErrorMsg('An error occurred:', error);
    }
  };

  const pageRedirecter = () => {
    setTimeout(() => {
      navigate({
        pathname: '/CurrentSchedule'
      });
    }, 1500);
  };

  const initialFormStatus = {
    email: '',
    password: ''
  };

  return (
    <div
      className="
    flex flex-col w-11/12
    xl:w-5/6 xl:flex-row
    items-center justify-center mt-16 gap-14 mx-auto"
    >
      <img
        src={img}
        alt="login-doctor-image"
        className="
          w-5/12 rounded-2xl
          md:w-4/12
          xl:w-1/3 xl:rounded-xl"
      />
      <div>
        <h1 className="text-3xl md:text-5xl text-center">Welcome to Dentora</h1>
        <h3 className="text-lg text-center mt-6">
          Please enter your credentials
        </h3>

        <Formik
          initialValues={initialFormStatus}
          validationSchema={loginSchema}
          onSubmit={function (values, actions) {
            loginMethod(values);
            actions.resetForm();
          }}
        >
          {(props, isSubmitting = submittingForm) => (
            <Form
              className="flex flex-col mx-auto gap-4 mt-6"
              onSubmit={props.handleSubmit}
            >
              <CustomInput
                id="email"
                name="email"
                label="Enter your email"
                type="textemail"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.email}
                disabled={isSubmitting}
              />
              <CustomInput
                id="password"
                name="password"
                label="Enter your password"
                type="password"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
                disabled={isSubmitting}
              />
              {isLoggedIn === 'unauthorized' && (
                <p className="flex justify-center text-sm mt-3 text-red-700">
                  {errorMsg}
                </p>
              )}

              <div className="flex justify-between mt-6">
                <ButtonWithIcon
                  linkType={true}
                  linkRoute={'/SignUp'}
                  linkClassName={'custom-btn-styles'}
                  IconComp={<CircledUptArrow />}
                  btnCaption="Sign-up"
                />

                {isLoggedIn !== 'authorized' ? (
                  <button
                    type="submit"
                    className="custom-btn-styles"
                    disabled={isSubmitting}
                  >
                    {fetchingStatus === 'initialStatus' ? (
                      <CustomBtnInnerContent
                        text="Submit"
                        icon={<LoginIcon />}
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

                    {fetchingStatus === 'failedStatus' ? (
                      <CustomBtnInnerContent
                        text="Failed"
                        icon={<UserDeniedIcon />}
                      />
                    ) : null}
                  </button>
                ) : null}

                {isLoggedIn === 'authorized' ? (
                  <div className="custom-btn-styles">
                    <CustomBtnInnerContent
                      text="Welcome Back"
                      icon={<WelcomeIcon />}
                    />
                  </div>
                ) : null}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginPage;
