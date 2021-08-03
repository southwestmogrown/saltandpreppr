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
        <div className='ingredient-page-main'>
            <div className='ingredient-page'>
                <div className='ingredient-name'>
                    <h1>{ingredient?.name}</h1>
                </div>
                <div className='ingredient-amount'>
                    <h2>{ingredient?.amount}</h2>
                </div>
                <div className='edit-form'>
                    <IngredientEditFormModal />
                </div>
                <div className='delete-ingredient'>
                    <form onSubmit={onDelete}>
                        <button className='delete-ingredient-btn'>Delete</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default IngredientPage;
