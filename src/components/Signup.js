import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

    const [credential, setCredential] = useState({ name: '', email: '', password: '', cpassword: '' })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {name, email, password }= credential;
        const response = await fetch('http://localhost:4000/api/auth/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                //   'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1NDc1Yzc2OTdhZDUwMDU3Y2FkM2RmIn0sImlhdCI6MTY0OTczNzEwN30._Cc_AxucdBdyC8nv6Tl75xLZAJkfD8wbj61L3JavrOw'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            //save the auth token and redirect
            localStorage.setItem('token', json.authtoken)
            navigate("/")
            props.showAlert('Sign Up Successfully', 'success')
        }
        else {
           props.showAlert('Invalid Details', 'danger')
        }
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default Signup
