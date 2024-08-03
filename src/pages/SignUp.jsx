// import React, { useState } from 'react';

// export default function SignUp() {
//   return (
//     <div className="w-3/5 mt-32 flex justify-center items-center flex-col mx-auto">
//       <h1 className="text-5xl text-sky-700 font-bold">Welcome to Dentora</h1>
//       <h3 className="text-2xl mt-6">Please register a new user</h3>

//     </div>
//   );
// }

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RegisterIcon, HomeIcon, ContinueIcon } from '../icons';
import { utilsData } from '../utils/utilsData';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [singupStatus, setSignupStatus] = useState('initialStatus');
  const [userMessage, setUserMessage] = useState('');

  async function createUser(email, password) {
    try {
      setSignupStatus('processingStatus');
      const response = await fetch(
        utilsData.apiURL + utilsData.apiSignUpRoute,
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
        setSignupStatus('failedStatus');
        setUserMessage('existingEmail');
        statusReset();
      } else {
        const json = await response.json();
        window.localStorage.setItem('token', json.token);
        setSignupStatus('successStatus');
        setUserMessage('success');
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  }

  function statusReset() {
    setTimeout(() => {
      setSignupStatus('initialStatus');
    }, 1500);
  }

  return (
    <div className="w-3/5 mt-32 flex justify-center items-center flex-col mx-auto">
      <h1 className="text-5xl text-sky-700 font-bold">Welcome to Dentora</h1>
      <h3 className="text-2xl mt-6">Please register a new user</h3>

      <form action="handleSubmit" className="flex flex-col mt-6 w-4/6 mx-auto">
        <label className="flex gap-4 text-base justify-between mt-2 h-10 items-center">
          Email:
          <input
            type="text"
            placeholder="youremail@email.com"
            className="w-3/6 pl-2 border-2  border-sky-600 rounded-lg py-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="flex gap-4 text-base justify-between mt-2 h-10 items-center ">
          Password:
          <input
            type="password"
            placeholder="****"
            className="w-3/6 pl-2 border-2  border-sky-600 rounded-lg py-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <div className="flex justify-evenly mt-6 py-5 gap-10">
          <Link to="../">
            <button
              className="flex justify-center items-center gap-2 rounded-lg bg-gradient-to-tr w-42 from-sky-600 to-sky-900 py-2 px-10 align-middle text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-light="true"
            >
              <HomeIcon /> <span>Home</span>
            </button>
          </Link>

          <div className={singupStatus === 'initialStatus' ? 'flex' : 'hidden'}>
            <button
              className="custom-btn-styles"
              type="button"
              data-ripple-light="true"
              onSubmit={() => {
                createUser(email, password);
              }}
            >
              <RegisterIcon /> <span>Register</span>
            </button>
          </div>

          <div
            className={singupStatus === 'processingStatus' ? 'flex' : 'hidden'}
          >
            <div
              className="custom-btn-styles"
              type="button"
              data-ripple-light="true"
            >
              <ContinueIcon />
              <span>Loading</span>
            </div>
          </div>

          <div
            to="/CurrentSchedule"
            className={singupStatus === 'failedStatus' ? 'flex' : 'hidden'}
          >
            <div className="custom-btn-styles">
              <ContinueIcon />
              <span>Failed</span>
            </div>
          </div>

          <Link
            to="/CurrentSchedule"
            className={singupStatus === 'successStatus' ? 'flex' : 'hidden'}
          >
            <button
              className="custom-btn-styles"
              type="button"
              data-ripple-light="true"
            >
              <ContinueIcon />
              <span>Continue</span>
            </button>
          </Link>
        </div>
      </form>
      <div className={userMessage === 'error' ? 'flex' : 'hidden'}>
        <p className="mt-4">Hubo un problema, intente mas tarde.</p>
      </div>
      <div className={userMessage === 'existingEmail' ? 'flex' : 'hidden'}>
        <p className="mt-4">Email already in file, please go back to login</p>
      </div>
      <div className={userMessage === 'success' ? 'flex' : 'hidden'}>
        <p className="mt-4">User has been register, you can Continue</p>
      </div>
    </div>
  );
}
