import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form';
import User from './User';
import * as yup from 'yup';
import axios from 'axios';
import formSchema from './validation/formSchema';

  // consts here to give states initial values aka initial state (which are all empty at first)
const initialFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  role: '',
  terms: {
    accept: false,
  },
}

const initialFormErrors = { 
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  role: '',
}

const initialUser = []
const initialDisabled = true

export default function App() {
  const [users, setUsers] = useState(initialUser) // array of friend objects
  const [formValues, setFormValues] = useState(initialFormValues) // object
  const [formErrors, setFormErrors] = useState(initialFormErrors) // object, slice of state for validating errors
  const [disabled, setDisabled] = useState(initialDisabled) // boolean, first being set to true (button will be disabled)

  // this gets the users from the API and sets them into users state (replacing the initialUser which is an empty array)
const getUsers = () => {     // NETWORKING HELPER 1of2
  axios.get('https://reqres.in/api/users')
    .then(res => {
      setUsers(res.data.data)
      // console.log(res.data.data) // shows an array of objects w/user info
    })
    .catch(err => {
      debugger
      console.log(err.response)
    })
}
    // this will take the info passed into newUser and add to the end of current user array
const postNewUser = newUser => {  // NETWORKING HELPER 2of2
  axios.post('https://reqres.in/api/users', newUser)
    .then(res => {
      // console.log(res) // res is an object. concatting res.data will add newly passed user info to users object
      // setUsers(...users, res.data) // another way to setUsers
      setUsers(users.concat(res.data))
    })
    .catch(err => {
      debugger
      console.log(err.response)
    })
    .finally(() => {
      setFormValues(initialFormValues) // resets the form after posting newUser
    })
}


// *** FORM FUNCTIONS ***
  // this is where validation with yup is being run as inputs are being changed
const inputChange = (name, value) => {
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
    // allows inputs to be made, without this, cannot type or select from dropdown
    // [name] will be replaced by whatever field the inputs are being made in
    // value will be replaced by the text that's inputed, then assigned to [name]
  
    setFormValues({ 
    ...formValues,
    [name]: value
  })
}

const checkboxChange = (name, isChecked) => {
  setFormValues({
    ...formValues,
    terms: {
      ...formValues.terms.accept,
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
    terms: Object.keys(formValues.terms),
    id: Math.floor(Math.random() * 100000), // needed because test API doesn't give an id by default
  }
  postNewUser(newUser)  // this line posts the newUser (on submission) using the postNewUser func from above (which adds to users array)
}


  // *** Side Effects ***
  useEffect(() => {
    getUsers()
  }, [])

  // This sets the disabled state
  // the submit button initial state is disabled. this checks if formValues matches the schema. If so, it returns true. 
  // .then, it will set the disabled state to the opposite of valid (which per debugger, is false). 
  // So, it'll set disabled to true(!false). Thereby, making the Submit button able
  useEffect(() => {
    formSchema.isValid(formValues)
    .then(valid => {
      setDisabled(!valid);
    })
  }, [formValues])

  return (
    <div className="App">
      <header className="App-header">
        <h1>OnBoarding App</h1>
      </header>
       
       <Form 
        values={formValues}
        inputChange={inputChange}
        checkboxChange={checkboxChange}
        submit={submit}
        disabled={disabled}
        errors={formErrors}
       />
      {/* this is creating the individual user in the user component, map thru users array and for each user, create inside the user component, an individual user object*/}
      {
        users.map(user => {
          return (
            <User key={user.id} details={user} />
          )
        })
      }
    </div>
  );
}

