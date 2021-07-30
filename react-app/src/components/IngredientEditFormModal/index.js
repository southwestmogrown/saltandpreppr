import React, { useState } from "react";
import { Modal } from '../../context/Modal';

import IngredientEditForm from "./IngredientEditForm";

function IngredientEditFormModal() {

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const onFormSubmit = (e) => {
        e.preventDefault();
        handleClose();
    }

    return (
        <div>
            <button className='login-modal-btn' onClick={handleShow}>Edit Ingredient</button>
            {showModal && (
                <Modal onClose={handleClose}>
                    <IngredientEditForm onFormSubmit={onFormSubmit}/>
                </Modal>
            )}
        </div>
    )
}

export default IngredientEditFormModal;