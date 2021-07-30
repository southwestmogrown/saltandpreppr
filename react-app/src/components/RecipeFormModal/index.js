import React, { useState } from "react";
import { Modal } from '../../context/Modal';

import RecipeForm from "./RecipeForm";

function RecipeFormModal() {

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const onRecipeFormSubmit = (e) => {
        e.preventDefault();
        handleClose();
    }

    return (
        <div>
            <button className='login-modal-btn' onClick={handleShow}>Add Recipe</button>
            {showModal && (
                <Modal onClose={handleClose}>
                    <RecipeForm onRecipeFormSubmit={onRecipeFormSubmit}/>
                </Modal>
            )}
        </div>
    )
}

export default RecipeFormModal;