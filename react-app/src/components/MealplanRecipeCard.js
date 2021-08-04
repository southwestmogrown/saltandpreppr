import React, { useState } from 'react';
import photo from '../media/Homemade-Pulled-Pork.png';
import '../styles/RecipeCard.css'
import * as mealplanRecipeActions from '../store/mealplan_recipe'
import { useDispatch } from 'react-redux';

function MealplanRecipeCard(props) {
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch();
    const {user, recipe, mealplanId} = props;


    const onSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        const data = await dispatch(mealplanRecipeActions.deleteMealplanRecipe(user?.id, mealplanId, recipe?.id))

        if(data?.errors) {
            setErrors(data)
        }
        await dispatch(mealplanRecipeActions.getMealPlanRecipes(user?.id, mealplanId))

    }

    return (
        <div className='recipe-card'>
            <div className='recipe-photo'></div>
            <div className='heading-container'>
                <h1 className='recipe-card__heading'><a href={`/users/${user?.id}/recipes/${recipe.id}`}>{recipe.name}</a></h1>
                <div className='delete-component'>
                    <form onSubmit={onSubmit}>
                        <button className='mealplan-recipe-delete-btn' type='submit'>Delete</button>
                    </form>
                </div>
                <p className='recipe-card__type'>{recipe.type}</p>
            </div>
            <div className='instructions-container fade'>
                <p className='recipe-card__instructions'>
                    {recipe.instructions}
                </p>
            </div>
        </div>
    )
}

export default MealplanRecipeCard;