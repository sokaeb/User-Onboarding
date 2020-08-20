import * as yup from 'yup'


const formSchema = yup.object().shape({
    first_name: yup
    .string()
    .min(3, 'First Name must be at least 3 characters long.')
    .required('First Name is Required'),
    last_name: yup
    .string()
    .min(3, 'Last Name must be at least 3 characters long.')
    .required('Last Name is Required'),
    email: yup
      .string()
      .email('Must be a valid email address.')
      .required('Email is Required'),
    password: yup
        .string()
        .min(8, 'Passwords must be at least 8 characters long.')
        .required('Password is Required.'),
    role: yup
      .string()
      .oneOf(['Student', 'Instructor', 'Team Lead'], 'You must select a role.')
      .required('You must select a role'),
  });

  export default formSchema