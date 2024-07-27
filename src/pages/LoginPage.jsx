import React from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/login-doctor-image.jpg';

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
            User Name:
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
            <button
              class="flex select-none items-center rounded-lg bg-gradient-to-tr from-sky-600 to-sky-900 py-2 px-10 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-light="true"
            >
              Log-in
            </button>
            <Link to="./Calendar">
              <button
                class="flex select-none items-center rounded-lg bg-gradient-to-tr from-sky-600 to-sky-900 py-2 px-10 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                data-ripple-light="true"
              >
                Sign-up
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
