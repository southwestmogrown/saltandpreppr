import React, { useState } from "react";
import { Modal } from '../../context/Modal';

import AddToPlan from "./AddToPlan";

function AddToPlanModal(props) {
    const {userId, recipeId} = props
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const onAddToPlanSubmit = (e) => {
        e.preventDefault();
        handleClose();
    }

    return (
        <div>
            <button className='add-to-plan-btn' onClick={handleShow}>Add to Meal Plan!</button>
            {showModal && (
                <Modal onClose={handleClose}>
                    <AddToPlan onAddToPlanSubmit={onAddToPlanSubmit} userId={userId} recipeId={recipeId}/>
                </Modal>
            )}
        </div>
    )
}

export default AddToPlanModal;