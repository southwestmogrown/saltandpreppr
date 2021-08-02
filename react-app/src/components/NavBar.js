import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import '../styles/Navbar.css';
import Demo from './Demo';
import { useSelector } from 'react-redux';
import logo from '../media/s&p_logo.png'
import LoginFormModal from './auth/LoginFormModal';
import SignUpFormModal from './auth/SignUpFormModal';
import RecipeFormModal from './RecipeFormModal';

const NavBar = () => {
  const user = useSelector(state => state?.session?.user)

  const [loginOpen, setLoginOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)
  
  const handleLogin = (event) => {
    setLoginOpen(true)
  }
  
  const handleSignup = (event) => {
    setSignupOpen(true)
  }
  
  if (user) {
    return (
      <div className='navbar-container'>
          <div className='left-nav'>
            <li className='navbar-link'>
              <NavLink to={`/users/${user?.id}/recipes`} exact={true} activeClassName='active'>
                <img src={logo} alt='salt_and_preppr_logo' className='logo'></img>
              </NavLink>
            </li>
          </div>
          <div className='center-nav'>
            <li classname='navbar-link'>
              <RecipeFormModal />
            </li>
          </div>
          <div className='right-nav'>
            <li classname='navbar-link'>
              <LogoutButton />
            </li>
          </div>
      </div>
    )    
  } else {
    return (
        <div className='navbar-container'>
            <div className='left-nav'>
              <li className='navbar-link'>
                <NavLink to={`/users/${user?.id}/recipes`} exact={true} activeClassName='active'>
                  <img src={logo} alt='salt_and_preppr_logo' className='logo'></img>
                </NavLink>
              </li>
            </div>
            <div className='center-nav'>
              <li className='navbar-link'>
                <Demo />
              </li>
            </div>
            <div className='right-nav'>
              <li className='navbar-link'>
                <SignUpFormModal loginOpen={loginOpen} signupOpen={signupOpen} setLoginOpen={setLoginOpen} setSignupOpen={setSignupOpen} handleLogin={handleLogin} handleSignup={handleSignup} />
              </li>
              <li className='navbar-link'>
                <LoginFormModal loginOpen={loginOpen} signupOpen={signupOpen} setLoginOpen={setLoginOpen} setSignupOpen={setSignupOpen} handleLogin={handleLogin} handleSignup={handleSignup} />
              </li>
            </div>
      </div>
    )    
  }

}

export default NavBar;
