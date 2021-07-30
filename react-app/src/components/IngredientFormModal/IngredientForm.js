import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as ingredientActions from '../../store/ingredient';
import * as recipeActions from '../../store/recipe';
// import '../styles/IngredientForm.css';

function IngredientForm({ onIngredientFormSubmit }) {
    const history = useHistory();
    const params = useParams();
    const user = useSelector(state => state?.session?.user)
    const recipe = useSelector(state => state?.recipe?.oneRecipe)
    const [errors, setErrors] = useState([])
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [amount, setAmount] = useState('')
    const dispatch = useDispatch()


    const onSubmit = async (e) => {
        e.preventDefault()
        const data = await dispatch(ingredientActions.addIngredient(
            user?.id,
            recipe?.id,
            name,
            type,
            amount
        ));

        if(data) {
            setErrors(data)
        }
        dispatch(recipeActions.getRecipes(user?.id))
        dispatch(ingredientActions.getIngredients(user?.id, recipe?.id))
        onIngredientFormSubmit(e)
    }

    const updateName = (e) => {
        setName(e.target.value)
    }
    
    const updateType = (e) => {
        setType(e.target.value)
    }
    
    const updateAmount = (e) => {
        setAmount(e.target.value)
    }


    return (
        <div className='ingredient'>
            <h1>Ingredient Edit Form</h1>
            <form onSubmit={onSubmit}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <label htmlFor='name'>Name</label>
                    <input
                        name='name'
                        type='text'
                        placeholder='Name'
                        value={name}
                        onChange={updateName}
                    />
                <label htmlFor='type'>Type</label>
                    <input
                        name='type'
                        type='text'
                        placeholder='Type'
                        value={type}
                        onChange={updateType}
                    />
                <label htmlFor='amount'>Amount</label>
                    <input
                        name='amount'
                        type='text'
                        placeholder='Amount'
                        value={amount}
                        onChange={updateAmount}
                    />
                    <button type='submit'>Add Ingredient</button>
            </form>
        </div>
    )
}

export default IngredientForm;
