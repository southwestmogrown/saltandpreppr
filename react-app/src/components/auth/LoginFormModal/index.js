import React, { useState } from "react";
import { Modal } from '../../../context/Modal';

import LoginForm from "./LoginForm";

function LoginFormModal() {

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const onFormSubmit = (e) => {
        e.preventDefault();
        handleClose();
    }

    return (
        <div>
            <button className='login-modal-btn' onClick={handleShow}>Log In</button>
            {showModal && (
                <Modal onClose={handleClose}>
                    <LoginForm onFormSubmit={onFormSubmit}/>
                </Modal>
            )}
        </div>
    )
}

export default LoginFormModal