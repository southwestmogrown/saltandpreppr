import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  useHistory } from 'react-router-dom';
import { login } from '../../../store/session';
import '../../../styles/LoginForm.css';
import '../../../context/Modal.css';
import SignUpFormModal from '../SignUpFormModal';

const LoginForm = (props) => {

  const { loginOpen, signupOpen,  setLoginOpen, setSignupOpen, handleLogin, handleSignup, onFormSubmit } = props;

  const switchSignup = (event) => {
    setLoginOpen(false)
    setSignupOpen(true)
  }


  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state?.session?.user);
  const dispatch = useDispatch();
  const history = useHistory();
  

  const onLogin = async (e) => {
    e.preventDefault();
    setErrors([])
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
      return;
    }
    onFormSubmit(e);
    history.push(`/users/${user?.id}/recipes`)
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  


  return (
    <div className='login-form-main'>
      <form className='login-form' onSubmit={onLogin}>
        <div className='errors-container'>
          <div className='login-errors'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
        </div>
        <div className='input-container'>
          <div className='email'>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
              required
            />
          </div>
        </div>
        <div className='input-container'>
          <div className='password'>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
              required
            />
          </div>
        </div>
          <div className='login-btn-container'>
            <button className='login-modal-btn' type='submit'>Login</button>
          </div>
          <div className='sign-up-message'>
            <p className='message'>Don't have an account?</p>
          </div>
          <div className='login__sign-up-btn' onClick={switchSignup} >
            <SignUpFormModal loginOpen={loginOpen} signupOpen={signupOpen} setLoginOpen={setLoginOpen} setSignupOpen={setSignupOpen} handleLogin={handleLogin} handleSignup={handleSignup} />
          </div>
      </form>
    </div>
  );
};

export default LoginForm;
