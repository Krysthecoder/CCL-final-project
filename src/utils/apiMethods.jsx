export function loginMethod(userEmail, userPassword) {
  return fetch(
    `${process.env.REACT_APP_DENTORA_API}${process.env.REACT_APP_DENTORA_LOGIN_METHOD}`,
    {
      method: 'POST',
      body: JSON.stringify({
        email: userEmail,
        password: userPassword
      })
    }
  )
    .then((result) => result.json())
    .catch((error) => console.log(error));
}
