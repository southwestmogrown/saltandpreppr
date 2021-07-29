import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import '../styles/Navbar.css';
import Demo from './Demo';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const user = useSelector(state => state?.session?.user)
  return (
    <div className='nav-container'>
      <nav>
        <ul>
          <li>
            <NavLink to={`/users/${user?.id}/recipes`} exact={true} activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink to={`/users/${user?.id}/recipe-form`} exact={true} activeClassName='active'>
              Add Recipe
            </NavLink>
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
