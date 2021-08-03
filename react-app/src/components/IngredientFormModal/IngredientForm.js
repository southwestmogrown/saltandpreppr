import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as ingredientActions from '../../store/ingredient';
import * as recipeActions from '../../store/recipe';
import '../../styles/IngredientForm.css';

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
        <div className='ingredient-form-main'>
            <div className='ingredient-form'>
                <form onSubmit={onSubmit}>
                    <div className='errors-container'>
                        {errors.map((error, ind) => (
                            <div className='ingredient-errors' key={ind}>{error}</div>
                        ))}
                    </div>
                    <div className='input-container'>
                        <div className='ingredient-name'>
                            <label htmlFor='name'>Name</label>
                                <input
                                    name='name'
                                    type='text'
                                    placeholder='Name'
                                    value={name}
                                    onChange={updateName}
                                    required
                                />
                        </div>
                    </div>
                    <div className='input-container'>
                        <div className='ingredient-type'>
                            <label htmlFor='type'>Type</label>
                            <input
                                name='type'
                                type='text'
                                placeholder='Type'
                                value={type}
                                onChange={updateType}
                                required
                            />
                        </div>
                    </div>
                    <div className='input-container'>
                        <div className='ingredient-amount'>
                            <label htmlFor='amount'>Amount</label>
                                <input
                                    name='amount'
                                    type='text'
                                    placeholder='Amount'
                                    value={amount}
                                    onChange={updateAmount}
                                    required
                                />
                        </div>
                    </div>
                    <div className='ingredient-btn-container'>
                        <div className='add-ingredient-btn'>
                            <button className='add-ingredient' type='submit'>Add Ingredient</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default IngredientForm;
