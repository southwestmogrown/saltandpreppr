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
    const user = useSelector(state => state?.session?.user)
    const recipe = useSelector(state => state?.recipe?.oneRecipe) 
    const ingredient = useSelector(state => state?.ingredient?.oneIngredient)
    console.log(params)

    const onSubmit = (e) => {
        e.preventDefault()
        history.push(`/users/${params.userId}/recipes/${params.recipeId}/ingredients/${params.ingredientId}/ingredient-edit-form`)
    }

    const onDelete = async (e) => {
        e.preventDefault()
        dispatch(ingredientActions.deleteIngredient(params.userId, params.recipeId, params.ingredientId))
        await dispatch(recipeActions.getRecipes(params.userId))
        history.push(`/users/${user?.id}/recipes/${recipe?.id}`)
    }

    useEffect(() => {
        dispatch(ingredientActions.getSingleIngredient(params.userId, params.recipeId, params.ingredientId))
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
