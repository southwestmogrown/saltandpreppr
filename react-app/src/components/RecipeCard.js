import React from 'react';
import photo from '../media/Homemade-Pulled-Pork.png';
import AddToMealPlan from './AddToMealPlan';
import '../styles/RecipeCard.css'

function RecipeCard(props) {
    const {user, recipe} = props

    return (
        <div className='recipe-card'>
            <div className='recipe-photo'></div>
            <div className='heading-container'>
                <h1 className='recipe-card__heading'><a href={`/users/${user?.id}/recipes/${recipe.id}`}>{recipe.name}</a></h1>
                <div className='add-component'>
                    <AddToMealPlan recipeId={recipe.id} />
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

export default RecipeCard;
