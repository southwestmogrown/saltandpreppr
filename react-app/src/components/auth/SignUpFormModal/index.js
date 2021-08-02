import React, { useState } from "react";
import { Modal } from '../../../context/Modal';

import SignUpForm from "./SignUpForm";

function SignUpFormModal(props, {onFormSubmit}) {
    const { loginOpen, signupOpen,  setLoginOpen, setSignupOpen, handleLogin, handleSignup } = props;
    
    
    
    const handleClose = () => setSignupOpen(false);
    


 

    return (
        <div>
            <button className='login-modal-btn' onClick={handleSignup}>Sign Up</button>
            {signupOpen && (
                <Modal onClose={handleClose}>
                    <SignUpForm loginOpen={loginOpen} signupOpen={signupOpen} handleLogin={handleLogin} setLoginOpen={setLoginOpen} setSignupOpen={setSignupOpen} onFormSubmit={onFormSubmit} />
                </Modal>
            )}
        </div>
    )
}

export default SignUpFormModal