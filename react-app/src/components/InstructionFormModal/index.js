import React, { useState } from "react";
import { Modal } from '../../context/Modal';

import InstructionForm from "./InstructionForm";

function InstructionFormModal() {

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const onInstructionFormSubmit = (e) => {
        e.preventDefault();
        handleClose();
    }

    return (
        <div>
            <button className='login-modal-btn' onClick={handleShow}>Edit Instruction</button>
            {showModal && (
                <Modal onClose={handleClose}>
                    <InstructionForm onInstructionFormSubmit={onInstructionFormSubmit}/>
                </Modal>
            )}
        </div>
    )
}

export default InstructionFormModal;