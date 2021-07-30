import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from '../../../context/Modal';

import LoginForm from "./LoginForm";

function LoginFormModal() {

    const [showModal, setShowModal] = useState(false);
    const user = useSelector(state => state?.session?.user)
    const history = useHistory()

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const onFormSubmit = (e) => {
        e.preventDefault();
        handleClose();
        history.push(`/users/${user?.id}/recipes`)
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