import React from 'react';


export default function User(props) {
    const { details } = props

    if (!details) {
        return <h3>Working on fetching your user details...</h3>
    }

    return (
        <div className='user container'>
            <h2>{details.first_name} {details.last_name}</h2>
            <p>Email: {details.email}</p>
            <p>Role: {details.role}</p>
        </div>

    )

}
