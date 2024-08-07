async function isAuthFn(token) {
  try {
    //setSigningStatus('loadingStatus');
    const response = await fetch(
      //utilsData.apiURL + utilsData.apiSignInRoute,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // email: email,
          // password: password
        })
      }
    );

    if (response.status === 200) {
      //const json = await response.json();
      // if (json.token.length > 0) {
      //   // window.localStorage.setItem('userId', json.token);
      // }
    } else if (response.status === 400) {
      console.log('Token has expired or is invalid');
    } else {
      console.log('an unexpected error has occured, please try again later');
    }
  } catch (error) {
    console.log('an error has occurred');
  }
}

export default isAuthFn;
