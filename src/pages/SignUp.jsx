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
              class="items-center rounded-lg bg-gradient-to-tr w-42 from-sky-600 to-sky-900 py-2 px-10 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-light="true"
            >
              Go back Home
            </button>
          </Link>
          <Link to="../CurrentSchedule">
            <button
              class="items-center rounded-lg bg-gradient-to-tr w-36 from-sky-600 to-sky-900 py-2 px-10 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-light="true"
            >
              Create
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
