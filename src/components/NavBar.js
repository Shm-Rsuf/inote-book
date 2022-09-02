import React, { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const Navbar = () => {
    let location = useLocation()
    useEffect(()=>{
        // console.log(location.pathname)
    },[location])
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">iNoteBook</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className={`nav-link ${location.pathname ==="/"? "active": "" }`} aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={`nav-link ${location.pathname ==="/about"? "active": "" }`} to="/about">About</NavLink>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <NavLink className="btn btn-primary mx-1" role="button" to='/login'>Login</NavLink>
                        <NavLink className="btn btn-primary mx-1" role="button" to='/signup'>Sign Up</NavLink>
                    </form>
                </div>
            </div>
        </nav>

    )
}

export default Navbar
