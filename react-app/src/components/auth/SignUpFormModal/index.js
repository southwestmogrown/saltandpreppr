import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from '../../../context/Modal';

import SignUpForm from "./SignUpForm";


function SignUpFormModal(props) {
    const { loginOpen, signupOpen,  setLoginOpen, setSignupOpen, handleLogin, handleSignup } = props;
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    
    
    const handleClose = () => setSignupOpen(false);
    


    const onFormSubmit = (e) => {
        e.preventDefault();
        handleClose();
        history.push(`/users/${user?.id}/recipes`)
    }

    return (
        <div>
            <button className='signup-modal-btn' onClick={handleSignup}>Sign Up</button>
            {signupOpen && (
                <Modal onClose={handleClose}>
                    <SignUpForm onFormSubmit={onFormSubmit} loginOpen={loginOpen} signupOpen={signupOpen} handleLogin={handleLogin} setLoginOpen={setLoginOpen} setSignupOpen={setSignupOpen} onFormSubmit={onFormSubmit} />
                </Modal>
            )}
        </div>
    )
}

export default SignUpFormModal