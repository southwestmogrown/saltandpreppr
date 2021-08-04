import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddToPlan from './AddToPlanModal';
import * as mealplanRecipeActions from '../store/mealplan_recipe'

function AddToMealPlan({ recipeId }) {
    const params = useParams()
    
    const dispatch = useDispatch()
    const userId = params?.userId

    
    

    return (
        <div className='add-to-mealplan-container'>
            <AddToPlan userId={userId} recipeId={recipeId} />
        </div>
    )
}

export default AddToMealPlan;
