import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as ingredientActions from '../store/ingredient';
import * as recipeActions from '../store/recipe';

function IngredientPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const ingredient = useSelector(state => state?.ingredient?.oneIngredient)

    const onSubmit = (e) => {
        e.preventDefault()
        history.push(`/users/${params.userId}/recipes/${params.recipeId}/ingredients/${params.ingredientId}/ingredient-edit-form`)
    }

    // const onDelete = async (e) => {
    //     e.preventDefault()
    //     dispatch(recipeActions.deleteRecipe(params.userId, params.recipeId))
    //     await dispatch(recipeActions.getRecipes(params.userId))
    //     history.push(`/users/${params.userId}/recipes`)
    // }

    useEffect(() => {
        dispatch(ingredientActions.getSingleIngredient(params.userId, params.recipeId, params.ingredientId))
    }, [dispatch])

    return (
        <div>
            <h1>{ingredient?.name}</h1>
            <h2>{ingredient?.type}</h2>
            <h2>{ingredient?.amount}</h2>
            <form onSubmit={onSubmit}>
                <button>Edit</button>
            </form>
            {/* <form onSubmit={onDelete}>
                <button>Delete</button>
            </form> */}
        </div>
    )
}

export default IngredientPage;
