import React, { useState } from 'react';
import img from '../assets/login-doctor-image.jpg';
import { utilsData } from '../utils/utilsData';
import { Link } from 'react-router-dom';
import { CircledRightArrow, LoginIcon } from '../icons';
import { Rings } from 'react-loading-icons';

function LoginPage() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errorHidden, setErrorHidden] = useState(true);
  const [signinStatus, setSigningStatus] = useState('initialStatus');

  async function loginMethod(email, password) {
    try {
      setSigningStatus('gettingStatus');
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
        console.log('please check your credentials');
        setErrorHidden(false);
        setSigningStatus('failedStatus');
      } else {
        const json = await response.json();
        window.localStorage.setItem('token', json.token);
        setErrorHidden(true);
        setSigningStatus('succesStatus');
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  }

  return (
    <div className="flex w-5/6 items-center justify-center mt-16 gap-8 mx-auto">
      <img src={img} alt="login-doctor-image?" className="w-1/3 rounded-xl" />

      <div className="">
        <h1 className="text-5xl text-center">Welcome to Dentora!</h1>

        <h3 className="text-lg text-center mt-6">
          Please enter your credentials!
        </h3>

        <form action="" className="flex flex-col mt-6 w-5/6 mx-auto">
          <label
            htmlFor=""
            className="flex gap-4 text-base justify-between mt-2 h-10 items-center"
          >
            Email:
            <input
              type="email"
              placeholder="juanitopancracio@gmail.com"
              className="text-sm w-4/6 pl-2 border-2  border-sky-600 rounded-lg py-1"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </label>
          <label
            htmlFor=""
            className="flex gap-4 text-base justify-between mt-2 h-10 items-center "
          >
            Password:
            <input
              type="password"
              placeholder="********"
              className="text-sm w-4/6 pl-2 border-2  border-sky-600 rounded-lg py-1"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </label>

          <div className="flex justify-evenly mt-6 py-5 gap-6">
            <Link
              to="./signup"
              className={
                signinStatus === 'initialStatus'
                  ? 'flex'
                  : signinStatus === 'failedStatus'
                  ? 'flex'
                  : 'hidden'
              }
            >
              <button
                className="flex justify-center items-center gap-2 rounded-lg bg-gradient-to-tr from-sky-600 to-sky-900 py-2 px-10 text-center text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <span>Sign-up</span>
                <CircledRightArrow />
              </button>
            </Link>

            <button
              className={
                signinStatus === 'initialStatus'
                  ? 'flex justify-center items-center gap-2 rounded-lg bg-gradient-to-tr from-sky-600 to-sky-900 py-2 px-10 text-center text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                  : 'hidden'
              }
              type="button"
              data-ripple-light="true"
              onClick={() => {
                loginMethod(userEmail, userPassword);
              }}
            >
              <span>Log in</span>
              <LoginIcon />
            </button>

            <button
              className={
                signinStatus === 'gettingStatus'
                  ? 'flex justify-center items-center gap-2 rounded-lg bg-gradient-to-tr from-sky-600 to-sky-900 py-2 px-10 text-center text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                  : 'hidden'
              }
              type="button"
            >
              <span>Loadging</span>
              <Rings />
            </button>

            <button
              className={
                signinStatus === 'failedStatus'
                  ? 'flex justify-center items-center gap-2 rounded-lg bg-gradient-to-tr from-sky-600 to-sky-900 py-2 px-10 text-center text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                  : 'hidden'
              }
              type="button"
            >
              <span>Failed</span>
              <LoginIcon />
            </button>

            <div
              className={
                signinStatus === 'succesStatus'
                  ? 'flex justify-center items-center gap-2 rounded-lg w-96 bg-gradient-to-tr from-sky-600 to-sky-900 py-2 px-10 text-center text-xs font-bold uppercase text-white  transition-all shadow-lg shadow-pink-500/40 '
                  : 'hidden'
              }
              type="button"
            >
              <span>Welcome!</span>
              <LoginIcon />
            </div>
          </div>
          <div className="mt-4 h-6">
            <p
              className={
                errorHidden
                  ? 'hidden'
                  : 'flex text-xs text-red-700 justify-center'
              }
            >
              There is something wrong with your credentials, try again.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
