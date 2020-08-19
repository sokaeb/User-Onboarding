import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
// import Form from './Form';
import User from './User';
import * as yup from 'yup';
import axios from 'axios';
import formSchema from './validation/formSchema';

const initialFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  role: '',
  terms: {
    accept: false
  },
}

const initialFormErrors = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  role: '',
  terms: {
    accept: false
  },
}

const initialUser = []
const initialDisabled = true

export default function App() {
  const [users, setUsers] = useState(initialUser)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  // this gets the users from the API and sets them into users state
const getUsers = () => {
  axios.get('https://reqres.in/api/users')
    .then(res => {
      setUsers(res.data.data)
      // console.log(res.data.data) // an array of objects w/user info
    })
    .catch(err => {
      debugger
      console.log(err.response)
    })
}
  // WHAT DOES THIS DO
useEffect(() => {
  getUsers()
}, [])

const postNewUser = newUser => {
  axios.post('https://reqres.in/api/users', newUser)
    .then(res => {
      // setUsers(...users, res.data.data)
      setUsers(users.concat(res.data))
      // console.log(res.data)
    })
    .catch(err => {
      debugger
      console.log(err.response)
    })
    .finally(() => {
      setFormValues(initialFormValues)
    })
}

const inputChange = (name, value) => {
  // this is where validation with yup is being run
  yup
  // telling yup to look at the name paramater (corresponds to each property in the object) then check it/validate against what the value should look like
  .reach(formSchema, name) 
  .validate(value)
  .then(valid => { // if validation is successful, clear the error messages
    setFormErrors({
      ...formErrors,
      [name]: ''
    })
  })
  .catch(err => { // if validation is unsuccessful, grab the corresponding err message 
    setFormErrors({
      ...formErrors,
      [name]: err.errors[0]
    })
  });

  setFormValues({ //resets it to empty? 
    ...formValues,
    [name]: value
  })
}

const checkboxChange = (name, isChecked) => {
  setFormValues({
    ...formValues,
    terms: {
      ...formValues.terms,
      [name]: isChecked,
    }
  })
}

const submit = () => {
  const newUser = {
    first_name: formValues.first_name.trim(),
    last_name: formValues.last_name.trim(),
    email: formValues.email.trim(),
    password: formValues.password.trim(),
    role: formValues.role,
    terms: Object.keys(formValues.terms).filter(term => formValues.terms[term]),
  }
  postNewUser(newUser)
}



  return (
    <div className="App">
      <header className="App-header">
       <h1>OnBoarding App</h1>
       {/* <Form 
       
       
       /> */}
      </header>
    </div>
  );
}

