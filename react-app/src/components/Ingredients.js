import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as ingredientActions from '../store/ingredient';
import * as recipeActions from '../store/recipe';

function Ingredients() {
    const dispatch = useDispatch()
    const ingredientsPage = useSelector(state => state?.ingredient?.allIngredients?.ingredients)
    console.log(ingredientsPage)
    const recipeName = useSelector(state => state?.recipe?.oneRecipe?.name)
    const params = useParams();

    const keyGen = () => {
        return '_' + Math.random().toString(36).substr(2, 9)
    }
    
    useEffect(() => {
        dispatch(ingredientActions.getIngredients(params.userId, params.recipeId))
        dispatch(recipeActions.getRecipe(params.userId, params.recipeId))
    }, [dispatch])
    
    return (
        <div>
            <div>{recipeName}</div>
            {ingredientsPage?.map(ingredient => (
                <div key={keyGen()}>
                    <li key={keyGen()} ><a href={`/users/${params.userId}/recipes/${params.recipeId}/ingredients/${ingredient.id}`}>{ingredient.name}</a></li>
                    <li key={keyGen()}>{ingredient.amount}</li>
                </div>
            ))}
        </div>
    )
}

export default Ingredients;
