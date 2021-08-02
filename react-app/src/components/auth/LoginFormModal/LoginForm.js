import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../../store/session';
import '../../../styles/LoginForm.css';
import '../../../context/Modal.css';
import SignUpFormModal from '../SignUpFormModal';
import SignUpForm from '../SignUpFormModal/SignUpForm';

const LoginForm = (props, {onFormSubmit}) => {

  const { loginOpen, signupOpen,  setLoginOpen, setSignupOpen, handleLogin, handleSignup } = props;

  const switchSignup = (event) => {
    setLoginOpen(false)
    setSignupOpen(true)
}

  console.log(props)
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state?.session?.user);
  const dispatch = useDispatch();
  const history = useHistory();
  

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));

    if (data) {
      setErrors(data);
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
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='email-container'>
          <div className='email'>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
        </div>
        <div className='password-container'>
          <div className='password'>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
        </div>
          <div className='login-btn-container'>
            <button className='login-btn' type='submit'>Login</button>
          </div>
          <div className='sign-up-message'>
            <p>Don't have an account?</p>
          </div>
          <div className='sign-up-link'>
          </div>
      </form>
      <div onClick={switchSignup} >
        <SignUpFormModal loginOpen={loginOpen} signupOpen={signupOpen} setLoginOpen={setLoginOpen} setSignupOpen={setSignupOpen} handleLogin={handleLogin} handleSignup={handleSignup} />

      </div>
    </div>
  );
};

export default LoginForm;
