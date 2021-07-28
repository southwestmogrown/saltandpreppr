import React from 'react'
import { useSelector } from 'react-redux'

function Recipes() {
    const recipes = useSelector(state => state?.recipe?.allRecipes?.recipes)
    
    return (
        <div>
            <h1>Recipe page</h1>
            {recipes?.map(recipe => (
                <div key={recipes.id}>{recipe.name}, {recipe.type}, {recipe.instructions}</div>
                
            ))}
        </div>
    )
}

export default Recipes
