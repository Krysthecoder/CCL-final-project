import React, { useState } from 'react';
import img from '../assets/login-doctor-image.jpg';
import { useFormik } from 'formik';
import { utilsData } from '../utils/utilsData';
import { Link, useNavigate } from 'react-router-dom';
import { CircledRightArrow, LoginIcon, UserDeniedIcon } from '../icons';
import { loginSchema } from '../schemas';
import { CircularProgress } from '@mui/material';

function LoginPage() {
  const [signinStatus, setSigningStatus] = useState('initialStatus');
  const [isLoggedIn, setIsLoggedIn] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  async function loginMethod(email, password) {
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
            email: email,
            password: password
          })
        }
      );

      if (response.status === 400) {
        setErrorMsg('Bad Request, please try again later!');
        setSigningStatus('failedStatus');
        btnResetter();
      } else if (response.status === 401) {
        setErrorMsg('Bad Credentials, please try again!');
        setSigningStatus('failedStatus');
        setIsLoggedIn('unauthorized');
        btnResetter();
      } else {
        const json = await response.json();
        if (json.token.length > 0) {
          window.localStorage.setItem('fetchedToken', json.token);
          setSigningStatus('succesStatus');
          setIsLoggedIn('authorized');
          pageRedirecter();
        }
      }
    } catch (error) {
      setErrorMsg('An error occurred:', error);
    }
  }

  const onSubmit = (values, actions) => {
    loginMethod(values.email, values.password);
    actions.resetForm();
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: '',
        password: ''
      },
      validationSchema: loginSchema,
      onSubmit
    });

  function btnResetter() {
    setTimeout(() => {
      setSigningStatus('initialStatus');
    }, 1500);
  }

  function pageRedirecter() {
    setTimeout(() => {
      navigate({
        pathname: '/CurrentSchedule'
      });
    }, 1500);
  }

  return (
    <div className="flex w-5/6 items-center justify-center mt-16 gap-8 mx-auto">
      <img src={img} alt="login-doctor-image?" className="w-1/3 rounded-xl" />
      <div>
        <h1 className="text-5xl text-center">Welcome to Dentora!</h1>
        <h3 className="text-lg text-center mt-6">
          Please enter your credentials!
        </h3>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="flex flex-col w-4/5 mx-auto gap-4 mt-6"
        >
          <div className="flex justify-between ">
            <label>Email</label>
            <input
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
              id="email"
              placeholder="youremail@email.com"
              className={
                errors.email && touched.email
                  ? 'text-sm  pl-2 border-2 w-4/6 border-red-600 rounded-lg py-1'
                  : 'text-sm  pl-2 border-2 w-4/6 border-sky-600 rounded-lg py-1'
              }
            />
          </div>
          {errors.email && touched.email && <p>{errors.email}</p>}
          <div className="flex justify-between">
            <label>Password</label>
            <input
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              id="password"
              placeholder="your password"
              className={
                errors.password && touched.password
                  ? 'text-sm  pl-2 border-2 w-4/6 border-red-600 rounded-lg py-1'
                  : 'text-sm  pl-2 border-2 w-4/6 border-sky-600 rounded-lg py-1'
              }
            />
          </div>
          {errors.password && touched.password && <p>{errors.password}</p>}
          {isLoggedIn === 'unauthorized' && <p>{errorMsg}</p>}
          <div
            className={
              signinStatus !== 'succesStatus'
                ? 'flex justify-between mt-6'
                : 'hidden'
            }
          >
            <Link to={'/SignUp'} className="custom-btn-styles">
              <span>Sign-up</span>
              <CircledRightArrow />
            </Link>
            <button type="submit">
              <span
                className={
                  signinStatus === 'initialStatus'
                    ? 'custom-btn-styles'
                    : 'hidden'
                }
              >
                <span>Log in</span>
                <LoginIcon />
              </span>
              <span
                className={
                  signinStatus === 'loadingStatus'
                    ? 'custom-btn-styles'
                    : 'hidden'
                }
              >
                <span>Loading</span>
                <CircularProgress
                  size={20}
                  sx={{
                    color: 'white'
                  }}
                />
              </span>
              <span
                className={
                  signinStatus === 'failedStatus'
                    ? 'custom-btn-styles'
                    : 'hidden'
                }
              >
                <span>Failed</span>
                <UserDeniedIcon />
              </span>
            </button>
          </div>
          <div className={isLoggedIn === 'authorized' ? 'flex' : 'hidden'}>
            <div
              className="justify-center items-center rounded-lg w-96 mt-4 bg-gradient-to-tr from-sky-600 to-sky-900 py-2 px-10 text-center text-xs font-bold uppercase text-white  transition-all shadow-lg shadow-pink-500/40 "
              type="button"
            >
              <span>Welcome!</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
