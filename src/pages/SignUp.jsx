import React, { useState } from 'react';
import { RegisterIcon, HomeIcon, UserDeniedIcon } from '../icons';
import { utilsData } from '../utils/utilsData';
import { useFormik } from 'formik';
import { signupSchema } from '../schemas';
import { CustomBtnInnerContent, CustomLinkBtn } from '../components/CustomBtns';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

export default function SignUp() {
  const navigate = useNavigate();
  const [signupStatus, setSignupStatus] = useState('initialStatus');

  async function createUser(email, password) {
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
            email: email,
            password: password
          })
        }
      );

      if (response.status === 400) {
        setSignupStatus('failedStatus');
        console.log('Bad Request, please try again later');
        statusReset();
      } else {
        const json = await response.json();
        window.localStorage.setItem('fetchedToken', json.token);
        console.log('success');

        pageRedirecter();
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  }

  function statusReset() {
    setTimeout(() => {
      setSignupStatus('initialStatus');
    }, 1500);
  }

  function pageRedirecter() {
    setTimeout(() => {
      navigate({
        pathname: '/CurrentSchedule'
      });
    }, 1500);
  }

  const onSubmit = (values, actions) => {
    createUser(values.email, values.password);
    actions.resetForm();
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      validationSchema: signupSchema,
      onSubmit
    });

  return (
    <div className="w-3/5 mt-32 flex justify-center items-center flex-col mx-auto">
      <h1 className="text-5xl text-sky-700 font-bold">Welcome to Dentora</h1>
      <h3 className="text-2xl mt-6">Please register a new user</h3>

      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="flex flex-col w-4/6 mx-auto gap-4 mt-6"
      >
        <div className="flex justify-between">
          <label>Email:</label>
          <input
            type="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
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
          <label>Password:</label>
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

        <div className="flex justify-between">
          <label>Confirm Password:</label>
          <input
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            className={
              errors.confirmPassword && touched.confirmPassword
                ? 'text-sm  pl-2 border-2 w-4/6 border-red-600 rounded-lg py-1'
                : 'text-sm  pl-2 border-2 w-4/6 border-sky-600 rounded-lg py-1'
            }
          />
        </div>
        {errors.confirmPassword && touched.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )}

        <div className="flex justify-between mt-6 w-4/5 mx-auto">
          <CustomLinkBtn
            path={'/'}
            className={'custom-btn-styles'}
            text="Go-Back"
            icon={<HomeIcon />}
          />

          <button type="submit">
            <span
              className={
                signupStatus === 'initialStatus'
                  ? 'custom-btn-styles'
                  : 'hidden'
              }
            >
              <CustomBtnInnerContent text="Sign-Up" icon={<RegisterIcon />} />
            </span>

            <span
              className={
                signupStatus === 'loadingStatus'
                  ? 'custom-btn-styles'
                  : 'hidden'
              }
            >
              <CustomBtnInnerContent
                text={'Loading'}
                icon={
                  <CircularProgress
                    size={20}
                    sx={{
                      color: 'white'
                    }}
                  />
                }
              />
            </span>

            <span
              className={
                signupStatus === 'failedStatus' ? 'custom-btn-styles' : 'hidden'
              }
            >
              <CustomBtnInnerContent
                text={'Failed'}
                icon={<UserDeniedIcon />}
              />
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
