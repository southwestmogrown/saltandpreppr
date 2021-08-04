import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import MealPlan from './MealPlan';
import '../styles/RecipesPage.css';

function Recipes() {
    const dispatch = useDispatch()
    const user = useSelector(state => state?.session?.user)
    const recipes = useSelector(state => state?.recipe?.allRecipes?.recipes)
    

    
    const params = useParams()
    return (
        <div className='recipes-grid'>
            <div className='recipes__body'>
                <div className='recipes__scroll'>
                    {recipes?.map(recipe => (
                        <div key={recipe.id}>
                            <RecipeCard user={user} recipe={recipe}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className='mealplans__body'>
                <MealPlan user={user}/>
            </div>
        </div>
    )
}

export default Recipes
