import React from 'react'
import { useSelector } from 'react-redux'

function Recipes({recipes}) {
    
    
    return (
        <div>
            <h1>Recipes page</h1>
            {recipes?.map(recipe => (
                <div key={recipes.id}>{recipe.name}, {recipe.type}, {recipe.instructions}</div>
                
            ))}
        </div>
    )
}

export default Recipes
