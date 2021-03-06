import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../../store/session';
import '../../../styles/SignupForm.css';
import LoginFormModal from '../LoginFormModal';

function SignUpForm(props) {

  const { setLoginOpen, setSignupOpen, onFormSubmit } = props;
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();





  const switchLogin = (event) => {
    setLoginOpen(true)
    setSignupOpen(false)
}

  const onSignUp = async (e) => {
    e.preventDefault();

    
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, repeatPassword));
      if (data) {
        setErrors(data)
        return;
      }
      onFormSubmit(e)
      history.push(`/users/${user?.id}/recipes`)
    } else {
      setErrors(['Password and Repeat Password Must Match.'])
      return;
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to={`/users/${user.id}/recipes`} />;
  }

  return (
    <div className='signup-form-main'>
      <div className='signup-form'>
        <form onSubmit={onSignUp}>
          <div className='errors-container'>
            {errors.map((error, ind) => (
              <div className='signup-errors' key={ind}>{error}</div>
            ))}
          </div>
          <div className='input-container'>
            <div className='username'>
              <label htmlFor='username'>User Name</label>
              <input
                type='text'
                name='username'
                onChange={updateUsername}
                value={username}
              />
            </div>
          </div>
          <div className='input-container'>
            <div className='email'>
              <label htmlFor='email'>Email</label>
              <input
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
                required
                maxLength='255'
              ></input>
            </div>
          </div>
          <div className='input-container'>
            <div className='password'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                onChange={updatePassword}
                value={password}
                required
                minLength='8'
              ></input>
            </div>
          </div>
          <div className='input-container'>
            <div className='repeat_password'>
              <label htmlFor='repeat_password'>Repeat Password</label>
              <input
                type='password'
                name='repeat_password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
          </div>
          <div className='signup-btn-container'>
            <button className='signup-modal-btn' type='submit'>Sign Up</button>
          </div>
          <div className='login-message'>
            <p className='message' >Already have an account?</p>
          </div>
          <div className='signup__login-btn' onClick={switchLogin}>
            <LoginFormModal   />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
