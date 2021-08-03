import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as mealplanActions from '../store/mealplan';

function MealPlanPage() {
    const params = useParams()
    const dispatch = useDispatch()
    const userId = params.userId
    const mealplanId = params.mealplanId
    const mealplan = useSelector(state => state?.mealplan?.oneMealplan)
    console.log(mealplan)

    useEffect(() => {
        dispatch(mealplanActions.getSingleMealplan(userId, mealplanId))
    }, [dispatch]);


    return (
        <div>
            <p>{mealplan?.name}</p>
        </div>
    )
}

export default MealPlanPage;
