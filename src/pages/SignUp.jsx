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
        window.localStorage.setItem('fetchedToken', json.token);
        console.log('success');

        pageRedirecter();
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };

  const statusReset = () => {
    setTimeout(() => {
      setSignupStatus('initialStatus');
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

  // const onSubmit = (values, actions) => {
  //   createUser(values.email, values.password);
  //   actions.resetForm();
  // };

  // const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
  //   useFormik({
  //     initialValues: {
  //       email: '',
  //       password: '',
  //       confirmPassword: ''
  //     },
  //     validationSchema: signupSchema,
  //     onSubmit
  //   });

  return (
    <div className="w-3/5 mt-32 flex justify-center items-center flex-col mx-auto">
      <h1 className="text-5xl text-sky-700 font-bold">Welcome to Dentora</h1>
      <h3 className="text-2xl mt-6">Please register a new user</h3>

      <Formik
        initialValues={initialFormStatus}
        validationSchema={signupSchema}
        onSubmit={function (values, actions) {
          console.log(values);
        }}
      >
        {(props, isSubmitting = submittingForm) => (
          <Form>
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
          </Form>
        )}
      </Formik>
    </div>
  );
}

// {/* <form
//         onSubmit={handleSubmit}
//         autoComplete="off"
//         className="flex flex-col w-4/6 mx-auto gap-4 mt-6"
//       >
//         <div className="flex justify-between mt">
//           <label>Email:</label>
//           <div className="flex flex-col w-4/6">
//             <input
//               type="email"
//               id="email"
//               value={values.email}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               placeholder="youremail@email.com"
//               className={
//                 errors.email && touched.email
//                   ? 'text-sm  pl-2 border-2 w-full border-red-600 rounded-lg py-1'
//                   : 'text-sm  pl-2 border-2 w-full border-sky-600 rounded-lg py-1'
//               }
//             />
//             {errors.email && touched.email && (
//               <p className="text-sm text-red-600 flex mr-2 justify-end">
//                 {errors.email}
//               </p>
//             )}
//           </div>
//         </div>

//         <div className="flex justify-between">
//           <label>Password:</label>

//           <div className="flex flex-col w-4/6">
//             <input
//               value={values.password}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               type="password"
//               id="password"
//               placeholder="your password"
//               className={
//                 errors.password && touched.password
//                   ? 'text-sm  pl-2 border-2 w-full border-red-600 rounded-lg py-1'
//                   : 'text-sm  pl-2 border-2 w-full border-sky-600 rounded-lg py-1'
//               }
//             />
//             {errors.password && touched.password && (
//               <p className="text-sm text-red-600 flex mr-2 justify-end">
//                 {errors.password}
//               </p>
//             )}
//           </div>
//         </div>

//         <div className="flex justify-between">
//           <label>Confirm Password:</label>
//           <div className="flex flex-col w-4/6">
//             <input
//               value={values.confirmPassword}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               type="password"
//               id="confirmPassword"
//               placeholder="Confirm your password"
//               className={
//                 errors.confirmPassword && touched.confirmPassword
//                   ? 'text-sm  pl-2 border-2 w-full border-red-600 rounded-lg py-1'
//                   : 'text-sm  pl-2 border-2 w-full border-sky-600 rounded-lg py-1'
//               }
//             />
//             {errors.confirmPassword && touched.confirmPassword && (
//               <p className="text-sm text-red-600 flex mr-2 justify-end">
//                 {errors.confirmPassword}
//               </p>
//             )}
//           </div>
//         </div>

//         <div className="flex justify-between mt-6 w-4/5 mx-auto">
//           <CustomLinkBtn
//             path={'/'}
//             className={'custom-btn-styles'}
//             text="Go-Back"
//             icon={<HomeIcon />}
//           />

//           <button type="submit">
//             <span
//               className={
//                 signupStatus === 'initialStatus'
//                   ? 'custom-btn-styles'
//                   : 'hidden'
//               }
//             >
//               <CustomBtnInnerContent text="Sign-Up" icon={<RegisterIcon />} />
//             </span>

//             <span
//               className={
//                 signupStatus === 'loadingStatus'
//                   ? 'custom-btn-styles'
//                   : 'hidden'
//               }
//             >
//               <CustomBtnInnerContent
//                 text={'Loading'}
//                 icon={
//                   <CircularProgress
//                     size={20}
//                     sx={{
//                       color: 'white'
//                     }}
//                   />
//                 }
//               />
//             </span>

//             <span
//               className={
//                 signupStatus === 'failedStatus' ? 'custom-btn-styles' : 'hidden'
//               }
//             >
//               <CustomBtnInnerContent
//                 text={'Failed'}
//                 icon={<UserDeniedIcon />}
//               />
//             </span>
//           </button>
//         </div>
// </form> */}
