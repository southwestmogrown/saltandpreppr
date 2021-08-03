import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as mealplanActions from '../store/mealplan';
import * as recipeActions from '../store/recipe';

function MealPlanPage() {
    const params = useParams()
    const dispatch = useDispatch()
    const userId = params.userId
    const mealplanId = params.mealplanId
    const mealplan = useSelector(state => state?.mealplan?.oneMealplan)
    const history = useHistory()
    console.log(mealplan)

    useEffect(() => {
        dispatch(mealplanActions.getSingleMealplan(userId, mealplanId))
    }, [dispatch]);

    const onSubmit = async (e) => {
        e.preventDefault()
        dispatch(mealplanActions.deleteMealplan(userId, mealplanId))
        await dispatch(recipeActions.getRecipes(userId))

        history.push(`/users/${userId}/recipes`)
    }

    return (
        <div>
            <p>{mealplan?.name}</p>
            <div className='mealplan-delete-container'>
                <form className='mealplan-delete' onSubmit={onSubmit}>
                    <button className='mealplan-delete-btn' type='submit'>Delete Meal Plan</button>
                </form>
            </div>
        </div>
    )
}

export default MealPlanPage;
