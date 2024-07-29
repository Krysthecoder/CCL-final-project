import React, { useState, useEffect } from 'react';
import Botton from '../components/Btn';

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
          <Botton title="Go back Home" address="../" />
          <Botton title="Create" address="../CalendarPage" />
        </div>
      </form>
    </div>
  );
}
