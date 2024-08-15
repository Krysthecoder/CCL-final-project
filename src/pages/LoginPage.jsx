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
import { CustomBtnInnerContent, CustomLinkBtn } from '../components/CustomBtns';
import { CustomInput } from '../components/CustomInput';

function LoginPage() {
  const [signinStatus, setSigningStatus] = useState('initialStatus');
  const [isLoggedIn, setIsLoggedIn] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const [submittingForm, setSubmittingForm] = useState(false);

  const loginMethod = async ({ email, password }) => {
    try {
      setSigningStatus('loadingStatus');
      const response = await fetch(
        utilsData.apiURL + utilsData.apiSignInRoute,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      if (response.status === 400) {
        setErrorMsg('Bad Request, please try again later!');
        setSigningStatus('failedStatus');
        setIsLoggedIn('unauthorized');
        btnResetter();
        console.log('error');
      } else if (response.status === 401) {
        setErrorMsg('Bad Credentials, please try again!');
        setSigningStatus('failedStatus');
        setIsLoggedIn('unauthorized');
        btnResetter();
        console.log('error');
      } else if (response.status === 404) {
        setErrorMsg('Bad Credentials, please try again!');
        setSigningStatus('failedStatus');
        setIsLoggedIn('unauthorized');
        btnResetter();
        console.log('error');
      } else {
        const json = await response.json();
        if (json.token.length > 0) {
          window.localStorage.setItem('fetchedToken', json.token);
          setSigningStatus('succesStatus');
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

  const btnResetter = () => {
    setTimeout(() => {
      setSigningStatus('initialStatus');
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
        alt="login-doctor-image?"
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
            setSubmittingForm(true);
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
                <CustomLinkBtn
                  path={'/SignUp'}
                  className={'custom-btn-styles'}
                  text="Sign-up"
                  icon={<CircledUptArrow />}
                />

                {isLoggedIn !== 'authorized' ? (
                  <button
                    type="submit"
                    className="custom-btn-styles"
                    disabled={isSubmitting}
                  >
                    {signinStatus === 'initialStatus' ? (
                      <CustomBtnInnerContent
                        text="Submit"
                        icon={<LoginIcon />}
                      />
                    ) : null}

                    {signinStatus === 'loadingStatus' ? (
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

                    {signinStatus === 'failedStatus' ? (
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
