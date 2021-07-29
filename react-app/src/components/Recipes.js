import React from 'react'
import { useParams } from 'react-router-dom';
import '../styles/RecipesPage.css';

function Recipes({recipes}) {
    
    const params = useParams()
    return (
        <div className='recipes-page' >
            <h1>Recipes page</h1>
            {recipes?.map(recipe => (
                <li key={recipe?.id} ><a href={`/users/${params.userId}/recipes/${recipe.id}`}>{recipe.name}</a>, {recipe.type}, {recipe.instructions}</li>   
            ))}
        </div>
    )
}

export default Recipes
