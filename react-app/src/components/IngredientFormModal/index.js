import React, { useState } from "react";
import { Modal } from '../../context/Modal';

import IngredientForm from "./IngredientForm";

function IngredientFormModal() {

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const onIngredientFormSubmit = (e) => {
        e.preventDefault();
        handleClose();
    }

    return (
        <div>
            <button className='ingredients-modal-btn' onClick={handleShow}>Add Ingredient</button>
            {showModal && (
                <Modal onClose={handleClose}>
                    <IngredientForm onIngredientFormSubmit={onIngredientFormSubmit}/>
                </Modal>
            )}
        </div>
    )
}

export default IngredientFormModal;