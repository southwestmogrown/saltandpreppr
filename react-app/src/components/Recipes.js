import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import MealPlan from './MealPlan';
import '../styles/RecipesPage.css';

function Recipes() {
    const user = useSelector(state => state?.session?.user)
    const recipes = useSelector(state => state?.recipe?.allRecipes?.recipes)
    

    
    return (
        <div className='recipes-grid'>
            <div className='recipes-head'>
                <h1>My Recipes</h1> 
            </div>
            <div className='mealplans-head'>
                <h1>My Mealplans</h1>
            </div>
            <div className='recipes__body'>
                <div className='recipes__scroll'>
                    {recipes?.map(recipe => (
                        <div className='recipe-card-container' key={recipe.id}>
                            <RecipeCard user={user} recipe={recipe}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className='mealplans__body'>
                <div className='mealplans'>
                    <MealPlan user={user}/>
                </div>
            </div>
        </div>
    )
}

export default Recipes
