import * as yup from 'yup';

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
  firstName: yup
    .string()
    .min(3, 'The minimum characters are 3.')
    .required('This is required.'),
  lastName: yup.string().required('This is required.'),
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
    .required('Password Required!'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'passport must match')
    .required('Required')
});

export const createAppoitmentSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, 'too Short, please be more descriptive')
    .max(15, 'too long, please be more concised')
    .required('Title is required'),
  date: yup.string().required('Date is required'),
  startTime: yup.string().required('Start Time Required'),
  endTime: yup
    .string()
    .required('End-time is required!')
    .notOneOf(
      [yup.ref('startTime'), null],
      "Appointment can't last less than one minute"
    ),
  description: yup
    .string()
    .min(5, 'Please be more descriptive.')
    .required('Description is required!')
});

export const editAppointmentSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, 'too Short, please be more descriptive')
    .max(15, 'too long, please be more concised'),
  date: yup.string().required('Date is required'),
  startTime: yup.string(),
  endTime: yup
    .string()
    .notOneOf(
      [yup.ref('startTime'), null],
      "Appointment can't last less than one minute"
    ),
  description: yup.string().min(5, 'Please be more descriptive.')
});
