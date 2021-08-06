import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as recipeActions from '../store/recipe';
import * as ingredientActions from '../store/ingredient'
import Ingredients from './Ingredients'    
import '../styles/Recipe.css';
import InstructionFormModal from './InstructionFormModal';
import IngredientFormModal from './IngredientFormModal';
import AddToMealPlan from './AddToMealPlan';

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
        <div className='recipe-page-main'>
            <div className='recipe-page'>
                <div className='recipe-name'>
                    <h1>{recipe?.name}</h1> 
                </div>
                <div className='ingredient-form-link'>
                    <IngredientFormModal />               
                </div>
                <div className='ingredients-outer'>
                    <div className='ingredients-container'>
                        <Ingredients />
                    </div>
                </div>
                <div className='recipe-instruction-container'>
                    <div className='recipe-instruction'>{recipe?.instructions}</div>
                </div>
                <div className='recipe-page-btns'>
                    <div className='instruction-btn'>
                        <InstructionFormModal />
                    </div>
                    <form onSubmit={onDelete}>
                        <button className='delete-btn'>Delete</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RecipePage;
