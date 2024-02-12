import React from 'react';
import { useAuth } from '../hooks/AuthProvider'
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { value, logout } = useAuth();
    const navigate = useNavigate();

    const logOutButton = () => {
        logout();
        navigate(0);
    }

    return (
        <header>
            <a href='/'> <div className="logo">Logo</div></a>
            <ul className='navlist'>
                <li>PortFolio</li>
                <li>Posts</li>
                <li>Game Dev</li>
                <li>Music</li>
            </ul>

            {value.isAuthenticated ? (
                <div className="user">
                    <nav className="user-nav">
                        <a href='/newpost'>New Post</a>
                        <a href='/posts'>My Posts</a>
                    </nav>
                    <button onClick={logOutButton}>Log Out</button>
                </div>
            ) : (
                <div className="signup">
                    <a href='/login'><button>Log In</button></a>
                    <a href='/signup'><button>Sign Up</button></a>
                </div>
            )}


        </header>
    );
};

export default Header;
