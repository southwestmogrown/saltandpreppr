import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as recipeActions from '../store/recipe';

function RecipePage() {
    const params = useParams()
    const dispatch = useDispatch()
    const recipe = useSelector(state => state?.recipe?.oneRecipe)
    console.log(recipe)

    useEffect(() => {
        dispatch(recipeActions.getRecipe(params.userId, params.recipeId))
    }, [dispatch])

    return (
        <div>
            <div>{recipe?.name}, {recipe?.type}, {recipe?.instructions}</div>
            <button>Edit</button>
        </div>
    )
}

export default RecipePage;
