import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import * as recipeActions from '../store/recipe';
import * as ingredientActions from '../store/ingredient'
import Ingredients from './Ingredients'    
import '../styles/Recipe.css';
import InstructionFormModal from './InstructionFormModal';
import IngredientFormModal from './IngredientFormModal';

function RecipePage() {
    const history = useHistory()
    const params = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state?.session?.user)
    const recipe = useSelector(state => state?.recipe?.oneRecipe)
    const ingredients = useSelector(state => state?.ingredient?.allIngredients)
    useEffect(() => {
        dispatch(recipeActions.getRecipe(params.userId, params.recipeId))
        dispatch(ingredientActions.getIngredients(params.userId, params.recipeId))
    }, [dispatch])
    
    
    const onDelete = async (e) => {
        e.preventDefault()
        dispatch(recipeActions.deleteRecipe(params.userId, params.recipeId))
        await dispatch(recipeActions.getRecipes(params.userId))
        history.push(`/users/${params.userId}/recipes`)
    }


    return (
        <div className='recipe'>
            <h1>{recipe?.name}</h1> 
            <div>{recipe?.type}</div> 
            <div>
                <Ingredients />
            </div>
                <IngredientFormModal />               
            <div>{recipe?.instructions}</div>
            <div><InstructionFormModal /></div>
            <form onSubmit={onDelete}>
                <button>Delete</button>
            </form>
        </div>
    )
}

export default RecipePage;
