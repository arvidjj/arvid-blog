import React from 'react';

const Header = () => {
    return (
        <header>
            <a href='/'> <div className="logo">Logo</div></a>
            <ul className='navlist'>
                <li>Game Dev</li>
                <li>Music</li>
                <li>Other</li>
            </ul>

            <div className="signup">
                <a href='/login'><button>Log In</button></a>
                <a href='/signup'><button>Sign Up</button></a>
            </div>

        </header>
    );
};

export default Header;
