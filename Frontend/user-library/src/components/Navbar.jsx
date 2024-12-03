import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const isLoggedIn = !!localStorage.getItem('token');

    const handleSignOut = () => {
        localStorage.removeItem('token');
        window.location.href = '/signin';
    };

    return (
        <nav>
            <Link to="/">Home</Link>
            {isLoggedIn ? (
                <>
                    <Link to="/profile">My Profile</Link>
                    <button onClick={handleSignOut}>Sign Out</button>
                </>
            ) : (
                <>
                    <Link to="/signin">Sign In</Link>
                    <Link to="/signup">Sign Up</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;
