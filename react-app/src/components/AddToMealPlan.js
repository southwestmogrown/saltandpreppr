import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as mealplanRecipeActions from '../store/mealplan_recipe'

function AddToMealPlan() {
    const params = useParams()
    const dispatch = useDispatch()
    const userId = params?.userId

    const onSubmit = async (e) => {
        e.preventDefault()
        await dispatch(mealplanRecipeActions.addOneRecipe(userId, 5, 1))
    }

    return (
        <div className='add-to-mealplan-container'>
            <form onSubmit={onSubmit} className='add-to-mealplan'>
                <button className='add-to-mealplan-btn'>Add To Meal Plan</button>
            </form>
        </div>
    )
}

export default AddToMealPlan;
