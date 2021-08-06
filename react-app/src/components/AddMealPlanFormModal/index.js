import React, { useState } from "react";
import { Modal } from '../../context/Modal';
import AddMealPlan from "./AddMealPlan";
import '../../styles/MealPlanPage.css'

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
            <button className='mealplan-modal-btn' onClick={handleShow}>Add A New Meal Plan!</button>
            {showModal && (
                <Modal onClose={handleClose}>
                    <AddMealPlan onAddMealPlanSubmit={onAddMealPlanSubmit}/>
                </Modal>
            )}
        </div>
    )
}

export default AddMealPlanModal;