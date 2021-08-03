import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as mealplanActions from '../store/mealplan';
import AddMealPlan from './AddMealPlanFormModal';

function MealPlan({ user }) {
    const dispatch = useDispatch()
    const mealplans = useSelector(state => state?.mealplan?.allMealplans?.mealplans)
    console.log(mealplans)

    useEffect(() => {
        dispatch(mealplanActions.getMealplans(user?.id))
    }, [dispatch])

    return (
        <div>
            <div>
                <AddMealPlan />
            </div>
            {mealplans?.map(mealplan => (
                <div key={mealplan?.id}><a href={`/users/${user.id}/mealplans/${mealplan?.id}`}>{mealplan?.name}</a> </div>
            ))}
        </div>
    )
}

export default MealPlan;
