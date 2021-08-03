import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function AddToMealPlan() {
    const params = useParams()
    const userId = params?.userId

    const onSubmit = (e) => {
        e.preventDefault()
        
    }

    return (
        <div className='add-to-mealplan-container'>
            <form className='add-to-mealplan'>
                <button className='add-to-mealplan-btn'>Add To Meal Plan</button>
            </form>
        </div>
    )
}

export default AddToMealPlan;
