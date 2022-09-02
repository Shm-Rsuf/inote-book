import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    const [credential, setCredential] = useState({ email: '', password: '' })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:4000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                //   'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1NDc1Yzc2OTdhZDUwMDU3Y2FkM2RmIn0sImlhdCI6MTY0OTczNzEwN30._Cc_AxucdBdyC8nv6Tl75xLZAJkfD8wbj61L3JavrOw'
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });
        const json = await response.json()
        console.log(json)
        if(json.success){
            //save the auth token and redirect
            localStorage.setItem('token', json.authtoken)
            props.showAlert('Logged in Successfully', 'success')
            navigate("/")
        }
        else{
            props.showAlert('Invalid Logged in', 'danger')
        }
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} value={credential.email} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credential.password} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default Login
