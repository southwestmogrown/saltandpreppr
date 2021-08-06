import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as mealplanActions from '../store/mealplan';
import AddMealPlan from './AddMealPlanFormModal';
import '../styles/MealPlanPage.css';

function MealPlan({ user }) {
    const dispatch = useDispatch()
    const mealplans = useSelector(state => state?.mealplan?.allMealplans?.mealplans)

    

    useEffect(() => {
        dispatch(mealplanActions.getMealplans(user?.id))
    }, [dispatch])

    return (
        <div>
            <div className='add-meal-plan-button'>
                <AddMealPlan />
            </div>
            <div className='mealplan-container'>
                <div className='mealplan-holder'>
                    {mealplans?.map(mealplan => (
                            <div className='mealplan-div' key={mealplan?.id}><a href={`/users/${user.id}/mealplans/${mealplan?.id}`}>{mealplan?.name}</a> </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MealPlan;
