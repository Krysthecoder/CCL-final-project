import * as yup from 'yup';

// min 5 characters, 1 upperCase, 1 lowerCase, 1 numeric

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email required!'),
  password: yup
    .string()
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    //.matches(/[^\w]/, 'Password requires a symbol')
    .required('Password Required!')
});

export const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email required!'),
  password: yup
    .string()
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    // .matches(/[^\w]/, 'Password requires a symbol')
    .required('Password Required!'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'passport must match')
    .required('Required')
});
