import React, { useState } from 'react';
import img from '../assets/login-doctor-image.jpg';
import { Form, Formik } from 'formik';
import { utilsData } from '../utils/utilsData';
import { useNavigate } from 'react-router-dom';
import { CircledUptArrow, LoginIcon } from '../icons';
import { loginSchema } from '../schemas';
import ButtonWithIcon from '../components/ButtonWithIcon';
import { CustomBtnInnerContent } from '../components/CustomBtns';
import CustomInput from '../components/CustomInput';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import { CloseIcon } from '../icons';

function LoginPage() {
  const { apiURL, apiSignInRoute } = utilsData;
  const [isLoggedIn, setIsLoggedIn] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [snackbarState, setSnackbarState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'right'
  });
  const [submittingForm, setSubmittingForm] = useState(false);
  const { vertical, horizontal, open } = snackbarState;
  const navigate = useNavigate();

  const loginMethod = async ({ email, password }) => {
    try {
      setSubmittingForm(true);
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
        setIsLoggedIn('unauthorized');
        setSubmittingForm(false);
        throw new Error(`Error loging into account: ${response.error}`);
      } else if (response.status === 401) {
        setErrorMsg('Bad Credentials, please try again!');
        setIsLoggedIn('unauthorized');
        setSubmittingForm(false);
        console.log('error');
      } else if (response.status === 404) {
        setErrorMsg('Bad Credentials, please try again!');
        setIsLoggedIn('unauthorized');
        setSubmittingForm(false);
        throw new Error(`Error loging into account: ${response.error}`);
      } else {
        const json = await response.json();
        if (json.user) {
          window.localStorage.setItem('userName', json.user.firstName);
        }
        if (json.token.length > 0) {
          window.localStorage.setItem('fetchedToken', json.token);
          console.log('success');

          setIsLoggedIn('authorized');
          navigate({
            pathname: '/CurrentSchedule'
          });
        }
        if (json.user._id.length > 0) {
          localStorage.setItem('userId', json.user._id);
        }
      }
    } catch (error) {
      setErrorMsg('An error occurred:', error);
    }
  };

  const initialFormStatus = {
    email: 'krysthopher5@gmail.com',
    password: 'Password2341@'
  };

  const handleClick = () => {
    setSnackbarState({ open: true, vertical: 'top', horizontal: 'right' });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarState({ open: false, vertical: 'top', horizontal: 'right' });
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

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
        <Snackbar
          open={open}
          anchorOrigin={{ vertical, horizontal }}
          autoHideDuration={1000}
          onClose={handleClose}
          message="Loging In!"
          action={action}
          key={vertical + horizontal}
        />

        <h1 className="text-3xl md:text-5xl text-center">Welcome to Dentora</h1>
        <h3 className="text-lg text-center mt-6">
          Please enter your credentials
        </h3>

        <Formik
          initialValues={initialFormStatus}
          validationSchema={loginSchema}
          onSubmit={function (values, actions) {
            loginMethod(values);
            handleClick();
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

                <button
                  type="submit"
                  className="custom-btn-styles"
                  disabled={isSubmitting}
                >
                  <CustomBtnInnerContent text="Submit" icon={<LoginIcon />} />
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginPage;
