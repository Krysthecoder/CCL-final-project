import React from 'react';
import img from '../assets/login-doctor-image.jpg';
import CustomButton from '../components/Btn';
import { CircledRightArrow, LoginIcon } from '../icons';

function LoginPage() {
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
            />
          </label>
          <div className="flex justify-evenly mt-6 py-5 gap-6">
            <CustomButton
              title="Sign-up"
              address="./SignUp"
              icon={<CircledRightArrow />}
            />
            <CustomButton
              title="Login"
              address="./CurrentSchedule"
              icon={<LoginIcon />}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
