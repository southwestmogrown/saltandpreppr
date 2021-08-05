import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as mealplanActions from '../store/mealplan';
import * as recipeActions from '../store/recipe';
import * as mealplanRecipeActions from '../store/mealplan_recipe';
import RecipeCard from './RecipeCard';
import MealplanRecipeCard from './MealplanRecipeCard';
import '../styles/MealPlanPage.css'

function MealPlanPage() {
    const params = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state?.session?.user)
    const userId = params.userId
    const mealplanId = params.mealplanId
    const mealplan = useSelector(state => state?.mealplan?.oneMealplan)
    const history = useHistory()
    const mealplan_recipes = useSelector(state => state?.mealplan_recipe?.allMealplanRecipes?.mealplan_recipes)
    const mealplanRecipeIds = useSelector(state => state?.mealplan_recipe?.mealplanRecipeIds?.mealplan_recipe_ids)
    

    useEffect(() => {
        dispatch(mealplanActions.getSingleMealplan(userId, mealplanId))
        dispatch(mealplanRecipeActions.getMealPlanRecipes(userId, mealplanId))
        dispatch(mealplanRecipeActions.getAllMealplanRecipeIds(userId, mealplanId))
    }, [dispatch]);

    const onSubmit = async (e) => {
        e.preventDefault()
        await dispatch(mealplanActions.deleteMealplan(userId, mealplanId))
        await dispatch(recipeActions.getRecipes(userId))
        await dispatch(mealplanActions.getMealplans(userId))

        history.push(`/users/${userId}/recipes`)
    }

    return (
        <div className='mealplan-scroll'>
            <p>{mealplan?.name}</p>
            {mealplan_recipes?.map(recipe => (
                <MealplanRecipeCard 
                    user={user} 
                    recipe={recipe} 
                    mealplanId={mealplanId} 
                    mealplanRecipeId={
                        mealplanRecipeIds?.filter(mealplanRecipeId => (
                           (mealplanRecipeId?.recipeId === recipe?.id)
                        ))
                    }
                />
            ))}
            <div className='mealplan-delete-container'>
                <form className='mealplan-delete' onSubmit={onSubmit}>
                    <button className='mealplan-delete-btn' type='submit'>Delete Meal Plan</button>
                </form>
            </div>
        </div>
    )
}

export default MealPlanPage;
