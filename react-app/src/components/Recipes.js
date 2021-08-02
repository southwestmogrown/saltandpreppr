import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import '../styles/RecipesPage.css';

function Recipes() {
    const dispatch = useDispatch()
    const user = useSelector(state => state?.session?.user)
    const recipes = useSelector(state => state?.recipe?.allRecipes?.recipes)

    
    const params = useParams()
    return (
        <div className='recipes__body'>
            <div className='recipes__scroll'>
                {recipes?.map(recipe => (
                    <div>
                        <RecipeCard user={user} recipe={recipe}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Recipes
