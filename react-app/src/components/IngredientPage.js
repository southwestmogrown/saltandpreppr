import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as ingredientActions from '../store/ingredient';
import * as recipeActions from '../store/recipe';
import '../styles/IngredientPage.css';
import IngredientEditFormModal from './IngredientEditFormModal';

function IngredientPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const recipeId = params.recipeId;
    const userId = params.userId;
    const ingredientId = params.ingredientId
    const user = useSelector(state => state?.session?.user)
    const recipe = useSelector(state => state?.recipe?.oneRecipe) 
    const ingredient = useSelector(state => state?.ingredient?.oneIngredient)

    const onDelete = async (e) => {
        e.preventDefault()
        dispatch(ingredientActions.deleteIngredient(userId, recipeId, ingredientId))
        await dispatch(recipeActions.getRecipes(userId))
        history.push(`/users/${userId}/recipes/${recipeId}`)
    }

    useEffect(() => {
        dispatch(ingredientActions.getSingleIngredient(userId, recipeId, ingredientId))
    }, [dispatch])

    return (
        <div className='ingredient-page'>
            <h1>{ingredient?.name}</h1>
            <h2>{ingredient?.type}</h2>
            <h2>{ingredient?.amount}</h2>
            <div>
                <IngredientEditFormModal />
            </div>
            <form onSubmit={onDelete}>
                <button>Delete</button>
            </form>
        </div>
    )
}

export default IngredientPage;
