import React from 'react';
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
  return (
    <div className='nav-container'>
      <nav>
        <ul>
          <li>
            <NavLink to={`/users/${user?.id}/recipes`} exact={true} activeClassName='active'>
              <img src={logo} alt='salt_and_preppr_logo' className='logo'></img>
            </NavLink>
          </li>
          <li>
            <LoginFormModal />
          </li>
          <li>
            <SignUpFormModal />
          </li>
          <li>
            <RecipeFormModal />
          </li>
          <li>
            <Demo />
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
