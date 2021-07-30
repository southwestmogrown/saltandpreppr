import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as recipeActions from '../store/recipe'
import '../styles/RecipesPage.css';

function Recipes() {
    const dispatch = useDispatch()
    const user = useSelector(state => state?.session?.user)
    const recipes = useSelector(state => state?.recipe?.allRecipes?.recipes)

    
    const params = useParams()
    return (
        <div className='recipes-page' >
            <h1>Recipes page</h1>
            {recipes?.map(recipe => (
                <li key={recipe?.id} ><a href={`/users/${user?.id}/recipes/${recipe.id}`}>{recipe.name}</a>, {recipe.type}, {recipe.instructions}</li>   
            ))}
        </div>
    )
}

export default Recipes
