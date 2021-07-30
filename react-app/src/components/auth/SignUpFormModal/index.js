import React, { useState } from "react";
import { Modal } from '../../../context/Modal';

import SignUpForm from "./SignUpForm";

function SignUpFormModal() {

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const onFormSubmit = (e) => {
        e.preventDefault();
        handleClose();
    }

    return (
        <div>
            <button className='login-modal-btn' onClick={handleShow}>Sign Up</button>
            {showModal && (
                <Modal onClose={handleClose}>
                    <SignUpForm onFormSubmit={onFormSubmit}/>
                </Modal>
            )}
        </div>
    )
}

export default SignUpFormModal