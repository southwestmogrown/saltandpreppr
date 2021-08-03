import React, { useState } from "react";
import * as sessionActions from '../store/session';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../styles/Navbar.css';

function Demo() {
    const dispatch = useDispatch();
    const [email] = useState("demo@aa.io");
    const [password] = useState('password');
    const history = useHistory()
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login(email, password))
            .then(() => history.push(`/users/1/recipes`))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
             });
      }
    
    
        return (
            <div>
                <div>
                    {errors.map((error, ind) => (
                        <li key={ind}>{error}</li>
                    ))}
                </div>
                <form onSubmit={handleSubmit} className='demo-login'>
                    <button type='submit' className='demo-login-btn'>Demo</button>
                </form>
            </div>
        )
}

export default Demo;
