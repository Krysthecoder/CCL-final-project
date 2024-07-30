import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    console.log(password);
  }, [password]);

  return (
    <div className="w-3/5 mt-32 flex justify-center items-center flex-col mx-auto">
      <h1 className="text-5xl text-sky-700 font-bold">Welcome to Dentora</h1>
      <h3 className="text-2xl mt-6">Please register a new user</h3>
      <form action="" className="flex flex-col mt-6 w-4/6 mx-auto">
        <label className="flex gap-4 text-base justify-between mt-2 h-10 items-center">
          First Name:
          <input
            type="text"
            placeholder="Juanito"
            className="w-3/6 pl-2 border-2  border-sky-600 rounded-lg py-1"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        <label className="flex gap-4 text-base justify-between mt-2 h-10 items-center">
          Last Name:
          <input
            type="text"
            placeholder="Sanchez"
            className="w-3/6 pl-2 border-2  border-sky-600 rounded-lg py-1"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>

        <label className="flex gap-4 text-base justify-between mt-2 h-10 items-center">
          Email:
          <input
            type="text"
            placeholder="JuanitoS@gmail.com"
            className="w-3/6 pl-2 border-2  border-sky-600 rounded-lg py-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="flex gap-4 text-base justify-between mt-2 h-10 items-center ">
          Password:
          <input
            type="password"
            placeholder="********"
            className="w-3/6 pl-2 border-2  border-sky-600 rounded-lg py-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label className="flex gap-4 text-base justify-between mt-2 h-10 items-center ">
          Confirm Password:
          <input
            type="password"
            placeholder="********"
            className="w-3/6 pl-2 border-2  border-sky-600 rounded-lg py-1"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>

        <div className="flex justify-evenly mt-6 py-5 gap-10">
          <Link to="../">
            <button
              class="flex justify-center items-center gap-2 rounded-lg bg-gradient-to-tr w-42 from-sky-600 to-sky-900 py-2 px-10 align-middle text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-light="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>{' '}
              <span>Home</span>
            </button>
          </Link>
          <Link to="../CurrentSchedule">
            <button
              className="flex justify-center items-center gap-2 rounded-lg bg-gradient-to-tr from-sky-600 to-sky-900 py-2 px-10 text-center text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-light="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                />
              </svg>{' '}
              <span>Register</span>
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
