import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as mealplanActions from '../../store/mealplan';
import '../../styles/MealPlanPage.css'

function AddMealPlan({ onAddMealPlanSubmit }) {
    const params = useParams();
    const userId = params.userId;
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors([])
        const data = await dispatch(mealplanActions.addMealplan(
            userId,
            name
        ));

        if (data) {
            setErrors(data)
            return;
        }
        await dispatch(mealplanActions.getMealplans(userId))
        onAddMealPlanSubmit(e)
    }

    const updateName = (e) => {
        setName(e.target.value)
    }

    return (
        <div className='add-mealplan-form-main'>
            <div className='add-mealplan-form'>
                <form onSubmit={onSubmit}>
                    <div className='errors-container'>
                        {errors.map((error, ind) => (
                            <div className='mealplan-form-errors' key={ind}>{error}</div>
                        ))}
                    </div>
                    <div className='input-cotainer'>
                        <div className='add-mealplan-form-name'>
                            <label htmlFor='name'>Name</label>
                            <input 
                                name='name'
                                type='text'
                                placeholder='What would you like to name your plan?'
                                onChange={updateName}
                                required
                            />
                        </div>
                    </div>
                    <div className='mealplan-btn-container'>
                        <div className='add-mealplan-btn'>
                            <button className='mealplan-btn' type='submit' >Add Meal Plan!</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddMealPlan;
