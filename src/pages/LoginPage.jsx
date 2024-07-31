import React, { useState, useEffect } from 'react';
import img from '../assets/login-doctor-image.jpg';
import CustomButton from '../components/Btn';
// import { loginMethod } from '../utils/apiMethods';
import { CircledRightArrow, LoginIcon } from '../icons';

function LoginPage() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userId, setUserId] = useState('');

  async function loginMethod(email, password) {
    console.log(typeof email);
    console.log(typeof password);
    const data = await fetch(
      'https://dental-clinic-be.onrender.com/auth/signin',
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
    )
      .then((response) => response.json())
      .then((json) => console.log(json, 'this is a json'))
      .catch((error) => console.log('this is an error'));
    //setUserId(data);
  }

  // useEffect(() => {
  //   console.log(userEmail);
  // }, [userEmail]);
  // useEffect(() => {
  //   console.log(userPassword);
  // }, [userPassword]);

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
              type="text"
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
            <CustomButton
              title="Sign-up"
              address="./SignUp"
              icon={<CircledRightArrow />}
            />

            {/* <CustomButton
              title="Login"
              // address="./CurrentSchedule"
              icon={<LoginIcon />}
              onClick={() => console.log('clicked')}
            /> */}
            <button
              className="flex justify-center items-center gap-2 rounded-lg bg-gradient-to-tr from-sky-600 to-sky-900 py-2 px-10 text-center text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-light="true"
              onClick={() => {
                loginMethod(userEmail, userPassword);
              }}
            >
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
