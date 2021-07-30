import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import * as recipeActions from '../store/recipe';
import * as ingredientActions from '../store/ingredient'
import Ingredients from './Ingredients'    
import '../styles/Recipe.css';
import InstructionFormModal from './InstructionFormModal';

function RecipePage() {
    const history = useHistory()
    const params = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state?.session?.user)
    const recipe = useSelector(state => state?.recipe?.oneRecipe)
    const ingredients = useSelector(state => state?.ingredient?.allIngredients)

    useEffect(() => {
        dispatch(recipeActions.getRecipe(user?.id, recipe?.id))
        dispatch(ingredientActions.getIngredients(user?.id, recipe?.id))
    }, [dispatch])
    
    
    const onDelete = async (e) => {
        e.preventDefault()
        dispatch(recipeActions.deleteRecipe(user?.id, recipe?.id))
        await dispatch(recipeActions.getRecipes(user?.id))
        history.push(`/users/${user?.id}/recipes`)
    }


    return (
        <div className='recipe'>
            <h1>{recipe?.name}</h1> 
            <div>{recipe?.type}</div> 
            <div>
                <Ingredients />
            </div>
                <a href={`/users/${user?.id}/recipes/${recipe?.id}/ingredient-form`}>Add Ingredient</a>                
            <div>{recipe?.instructions}</div>
            <div><InstructionFormModal /></div>
            <form onSubmit={onDelete}>
                <button>Delete</button>
            </form>
        </div>
    )
}

export default RecipePage;
