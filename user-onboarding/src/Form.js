import React from 'react';


 export default function Form(props) {
    const {
        values,
        inputChange,
        checkboxChange,
        submit,
        disabled,
        errors,
     } = props


    // .preventDefault prevents the form from reloading. submit() is carrying out the function from App
    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    // this func will be looking at the checked attribute
    const onCheckboxChange = evt => {
        const { name, checked } = evt.target
        checkboxChange( name, checked)
    }

    const onInputChange = evt => {
        const { name, value } = evt.target
        inputChange(name, value)
    }

    return (
        <form className='form container' onSubmit={onSubmit}>
            <div className='form submit'>
                <h2>Add a User</h2>
                <div className='errors'>
                    <div>{errors.first_name}</div>
                    <div>{errors.last_name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.role}</div>
                </div>
            </div>

            <div className='form inputs'>
                <h4>New User Information</h4>

                <label>First Name&nbsp;
                    <input 
                        value={values.first_name}
                        onChange={onInputChange}
                        name='first_name'
                        type='text'
                    />
                </label>

                <label>Last Name&nbsp;
                    <input 
                        value={values.last_name}
                        onChange={onInputChange}
                        name='last_name'
                        type='text'
                    />
                </label>

                <label>Email&nbsp;
                    <input 
                        value={values.email}
                        onChange={onInputChange}
                        name='email'
                        type='text'
                    />
                </label>

                <label>Password&nbsp;
                    <input 
                        value={values.password}
                        onChange={onInputChange}
                        name='password'
                        type='password'
                    />
                </label>

                <label>Role&nbsp;
                    <select
                        value={values.role}
                        onChange={onInputChange}
                        name='role'
                    >
                        <option value=''>-- Select a Role --</option>
                        <option value='Student'>Student</option>
                        <option value='Instructor'>Instructor</option>
                        <option value='Team Lead'>Team Lead</option>
                    </select>
                </label>
            </div> 
            
            <div className='form checkbox'>
                <label>Do you accept the Terms of Service?&nbsp;
                    <input 
                        checked={values.terms.accept}
                        onChange={onCheckboxChange}
                        name='terms'
                        type='checkbox'
                    />
                </label>
            </div>
            <button id='submitBtn' disabled={disabled}>SUBMIT</button>
        </form>
    )
}