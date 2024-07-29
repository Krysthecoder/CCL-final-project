import React from 'react';
import img from '../assets/login-doctor-image.jpg';
import Botton from '../components/Btn';

function LoginPage() {
  return (
    <div className="flex w-5/6 items-center justify-center mt-16 gap-8 mx-auto">
      <img src={img} alt="login-doctor-image?" className="w-1/3 rounded-xl" />

      <div className="">
        <h1 className="text-5xl text-center">Welcome to Dentora!</h1>

        <h3 className="text-lg text-center mt-6">
          Please enter your credetials!
        </h3>

        <form action="" className="flex flex-col mt-6 w-4/6 mx-auto">
          <label
            htmlFor=""
            className="flex gap-4 text-base justify-between mt-2 h-10 items-center"
          >
            Email:
            <input
              type="text"
              placeholder="Juanito Pancracio"
              className="w-4/6 pl-2 border-2  border-sky-600 rounded-lg py-1"
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
              className="w-4/6 pl-2 border-2  border-sky-600 rounded-lg py-1"
            />
          </label>
          <div className="flex justify-evenly mt-6 py-5 gap-6">
            <Botton title="Sign-up" address="./SignUp" />
            <Botton title="Login" address="./CalendarPage" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
