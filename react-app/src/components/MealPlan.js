import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as mealplanActions from '../store/mealplan';
import * as mealplanRecipeActions from '../store/mealplan_recipe'
import AddMealPlan from './AddMealPlanFormModal';

function MealPlan({ user }) {
    const dispatch = useDispatch()
    const mealplans = useSelector(state => state?.mealplan?.allMealplans?.mealplans)

    

    useEffect(() => {
        dispatch(mealplanActions.getMealplans(user?.id))
    }, [dispatch])

    return (
        <div>
            <div>
                <AddMealPlan />
            </div>
            {mealplans?.map(mealplan => (
                <div> 
                    <div key={mealplan?.id}><a href={`/users/${user.id}/mealplans/${mealplan?.id}`}>{mealplan?.name}</a> </div>
                </div>
            ))}
        </div>
    )
}

export default MealPlan;
