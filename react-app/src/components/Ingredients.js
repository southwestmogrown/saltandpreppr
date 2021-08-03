import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as ingredientActions from '../store/ingredient';
import * as recipeActions from '../store/recipe';
import '../styles/Ingredients.css';

function Ingredients() {
    const dispatch = useDispatch()
    const ingredientsPage = useSelector(state => state?.ingredient?.allIngredients?.ingredients)
    const user = useSelector(state => state?.session?.user)
    const recipe = useSelector(state => state?.recipe?.oneRecipe)
    const params = useParams()


    const keyGen = () => {
        return '_' + Math.random().toString(36).substr(2, 9)
    }
    
    useEffect(() => {
        dispatch(ingredientActions.getIngredients(params.userId, params.recipeId))
        dispatch(recipeActions.getRecipe(params.userId, params.recipeId))
    }, [dispatch])
    
    return (
        <div className='ingredients-list-container' >
            <ul className='ingredients-list'>
                {ingredientsPage?.map(ingredient => (
                    <li key={keyGen()}>{ingredient.amount}  <a href={`/users/${user?.id}/recipes/${recipe?.id}/ingredients/${ingredient.id}`}>{ingredient.name}</a></li>
                ))}
            </ul>
        </div>
    )
}

export default Ingredients;
