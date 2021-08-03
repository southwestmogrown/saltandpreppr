import React, { useState } from "react";
import { Modal } from '../../context/Modal';

import AddMealPlan from "./AddMealPlan";

function AddMealPlanModal() {

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const onAddMealPlanSubmit = (e) => {
        e.preventDefault();
        handleClose();
    }

    return (
        <div>
            <button className='mealplan-modal-btn' onClick={handleShow}>Create New Meal Plan!</button>
            {showModal && (
                <Modal onClose={handleClose}>
                    <AddMealPlan onAddMealPlanSubmit={onAddMealPlanSubmit}/>
                </Modal>
            )}
        </div>
    )
}

export default AddMealPlanModal;