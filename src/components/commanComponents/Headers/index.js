import React from 'react'
import './style.css';
import { Link, useLocation } from 'react-router-dom';
function Header() {


    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <div className='nav'>

            <div className='gradient'></div>
            <div className='link'>
                <Link to='/' className={currentPath == '/' ? 'active' : ""}>Singup</Link>
                <Link to='/podcasts' className={currentPath == '/podcast' ? 'active' : ""}>Podcast</Link>
                <Link to='/create-a-podcast' className={currentPath == 'create-a-podcast' ? 'active' : ""}>Start A Podcast</Link>
                <Link to='/profile' className={currentPath == '/profile' ? 'active' : ""}>Profile</Link>

            </div>

        </div>
    )
}

export default Header