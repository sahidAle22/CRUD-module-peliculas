import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='_Navbar'>  

            <span>Calaverita <i className="fa-solid fa-skull"></i></span>

            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/new">Create</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar