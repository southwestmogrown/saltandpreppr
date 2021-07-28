import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as recipeActions from '../store/recipe';

function RecipePage() {
    const history = useHistory()
    const params = useParams()
    const dispatch = useDispatch()
    const recipe = useSelector(state => state?.recipe?.oneRecipe)

    useEffect(() => {
        dispatch(recipeActions.getRecipe(params.userId, params.recipeId))
    }, [dispatch])
    
    const onSubmit = (e) => {
        e.preventDefault()
        history.push(`/users/${params.userId}/recipes/${params.recipeId}/instruction-form`)
    }

    return (
        <div>
            <div>{recipe?.name}, {recipe?.type}, {recipe?.instructions}</div>
            <form onSubmit={onSubmit}>
                <button>Edit</button>
            </form>
        </div>
    )
}

export default RecipePage;
