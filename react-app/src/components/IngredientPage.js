import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as ingredientActions from '../store/ingredient';

function IngredientPage() {
    const dispatch = useDispatch();
    const params = useParams();
    const ingredient = useSelector(state => state?.ingredient?.oneIngredient)
    console.log(ingredient)
    useEffect(() => {
        dispatch(ingredientActions.getSingleIngredient(params.userId, params.recipeId, params.ingredientId))
    }, [dispatch])

    return (
        <div>
            <h1>{ingredient.name}</h1>
            <h2>{ingredient.type}</h2>
            <h2>{ingredient.amount}</h2>
        </div>
    )
}

export default IngredientPage;
