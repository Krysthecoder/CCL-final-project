import React from 'react';
import img from '../assets/login-doctor-image.jpg';
import { useFormik } from 'formik';
// import { utilsData } from '../utils/utilsData';
import { Link, useNavigate } from 'react-router-dom';
import { CircledRightArrow, LoginIcon, UserDeniedIcon } from '../icons';
import { basicSchema } from '../schemas';

const onSubmit = (values, actions) => {
  console.log(values);
  actions.resetForm();
};

function LoginPage() {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: '',
        password: ''
      },
      validationSchema: basicSchema,
      onSubmit
    });

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
              placeholder="email@email.com"
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
              className={
                errors.password && touched.password
                  ? 'text-sm  pl-2 border-2 w-4/6 border-red-600 rounded-lg py-1'
                  : 'text-sm  pl-2 border-2 w-4/6 border-sky-600 rounded-lg py-1'
              }
            />
          </div>
          {errors.password && touched.password && <p>{errors.password}</p>}

          <div className="flex justify-between mt-6">
            <Link to={'/SignUp'} className="custom-btn-styles">
              <span>Sign-up</span>
              <CircledRightArrow />
            </Link>

            <button type="submit" className="custom-btn-styles">
              <span>Log in</span>
              <LoginIcon />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

// import React, { useState } from 'react';
// import img from '../assets/login-doctor-image.jpg';
// import { utilsData } from '../utils/utilsData';
// import { Link, useNavigate } from 'react-router-dom';
// import { CircledRightArrow, LoginIcon, UserDeniedIcon } from '../icons';
// import { CircularProgress } from '@mui/material';

// function LoginPage() {
//   const navigate = useNavigate();

//   const [userEmail, setUserEmail] = useState('');
//   const [userPassword, setUserPassword] = useState('');
//   const [errorHidden, setErrorHidden] = useState(true);
//   const [signinStatus, setSigningStatus] = useState('initialStatus');

//   async function loginMethod(email, password) {
//     try {
//       setSigningStatus('gettingStatus');
//       const response = await fetch(
//         utilsData.apiURL + utilsData.apiSignInRoute,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             email: email,
//             password: password
//           })
//         }
//       );

//       if (response.status === 400) {
//         console.log('please check your credentials');
//         setErrorHidden(false);
//         setSigningStatus('failedStatus');
//         btnResetter();
//       } else {
//         const json = await response.json();
//         if (json.token.length > 0) {
//           window.localStorage.setItem('fetchedToken', json.token); /// TODO: corregir nombre
//         }
//         setErrorHidden(true);
//         setSigningStatus('succesStatus');
//         pageRedirecter();
//         console.log('success');
//       }
//     } catch (error) {
//       console.log('An error occurred:', error);
//     }
//   }

//   function pageRedirecter() {
//     setTimeout(() => {
//       navigate({
//         pathname: '/CurrentSchedule'
//       });
//     }, 1500);
//   }

//   function btnResetter() {
//     setTimeout(() => {
//       setSigningStatus('initialStatus');
//     }, 1500);
//   }

//   return (
//     <div className="flex w-5/6 items-center justify-center mt-16 gap-8 mx-auto">
//       <img src={img} alt="login-doctor-image?" className="w-1/3 rounded-xl" />

//       <div className="">
//         <h1 className="text-5xl text-center">Welcome to Dentora!</h1>

//         <h3 className="text-lg text-center mt-6">
//           Please enter your credentials!
//         </h3>

//         <form action="" className="flex flex-col mt-6 w-5/6 mx-auto">
//           <label
//             htmlFor=""
//             className="flex gap-4 text-base justify-between mt-2 h-10 items-center"
//           >
//             Email:
//             <input
//               type="email"
//               placeholder="juanitopancracio@gmail.com"
//               className="text-sm w-4/6 pl-2 border-2  border-sky-600 rounded-lg py-1"
//               value={userEmail}
//               onChange={(e) => setUserEmail(e.target.value)}
//             />
//           </label>
//           <label
//             htmlFor=""
//             className="flex gap-4 text-base justify-between mt-2 h-10 items-center "
//           >
//             Password:
//             <input
//               type="password"
//               placeholder="********"
//               className="text-sm w-4/6 pl-2 border-2  border-sky-600 rounded-lg py-1"
//               value={userPassword}
//               onChange={(e) => setUserPassword(e.target.value)}
//             />
//           </label>

//           <div className="flex justify-evenly mt-6 py-5 gap-6">
//             <Link
//               to="./SignUp"
//               className={
//                 signinStatus === 'initialStatus'
//                   ? 'flex'
//                   : signinStatus === 'failedStatus'
//                   ? 'flex'
//                   : 'hidden'
//               }
//             >
//               <button
//                 className="custom-btn-styles"
//                 type="button"
//               >
//                 <span>Sign-up</span>
//                 <CircledRightArrow />
//               </button>
//             </Link>

//             <button
//               className={
//                 signinStatus === 'initialStatus'
//                   ? 'custom-btn-styles'
//                   : 'hidden'
//               }
//               type="button"
//               data-ripple-light="true"
//               onClick={() => {
//                 loginMethod(userEmail, userPassword);
//               }}
//             >
//               <span>Log in</span>
//               <LoginIcon />
//             </button>

//             <div
//               className={
//                 signinStatus === 'gettingStatus'
//                   ? 'custom-btn-styles'
//                   : 'hidden'
//               }
//             >
//               <span>Loading</span>
//               <CircularProgress
//                 size={20}
//                 sx={{
//                   color: 'white'
//                 }}
//               />
//             </div>

//             <button
//               className={
//                 signinStatus === 'failedStatus'
//                   ? 'custom-btn-styles'
//                   : 'hidden'
//               }
//               type="button"
//             >
//               <span>Failed</span>
//               <UserDeniedIcon />
//             </button>

//             <Link
//               to={'./CurrentSchedule'}
//               className={signinStatus === 'succesStatus' ? 'flex' : 'hidden'}
//             >
//               <div
//                 className="justify-center items-center gap-2 rounded-lg w-96 bg-gradient-to-tr from-sky-600 to-sky-900 py-2 px-10 text-center text-xs font-bold uppercase text-white  transition-all shadow-lg shadow-pink-500/40 "
//                 type="button"
//               >
//                 <span>Welcome!</span>
//               </div>
//             </Link>
//           </div>
//           <div className="mt-4 h-6">
//             <p
//               className={
//                 errorHidden
//                   ? 'hidden'
//                   : 'flex text-xs text-red-700 justify-center'
//               }
//             >
//               There is something wrong with your credentials, try again.
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;
