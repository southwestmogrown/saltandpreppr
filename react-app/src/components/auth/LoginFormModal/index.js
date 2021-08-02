import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from '../../../context/Modal';
import SignUpFormModal from "../SignUpFormModal";

import LoginForm from "./LoginForm";

function LoginFormModal(props) {
    const { loginOpen, signupOpen, setLoginOpen, setSignupOpen, handleLogin, handleSignup } = props;
    

    
    const user = useSelector(state => state?.session?.user)
    const history = useHistory()

    const handleClose = () => {
        setLoginOpen(false)
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        handleClose();
        history.push(`/users/${user?.id}/recipes`)
    }

    
    

    return (
        <div>
            <button className='login-modal-btn' onClick={handleLogin}>Log In</button>
            {loginOpen && (
                <Modal onClose={handleClose}>
                    <LoginForm loginOpen={loginOpen} signupOpen={signupOpen} setLoginOpen={setLoginOpen} setSignupOpen={setSignupOpen} onFormSubmit={onFormSubmit} />
                </Modal>
            )}
        </div>
    )
}

export default LoginFormModal