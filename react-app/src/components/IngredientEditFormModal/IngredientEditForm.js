import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as ingredientActions from '../../store/ingredient';
// import '../styles/IngredientForm.css';

function IngredientEditForm({ onFormSubmit }) {
    const history = useHistory();
    const params = useParams();
    const recipeId = params.recipeId
    const userId = params.userId
    const ingredientId = params.ingredientId
    const [errors, setErrors] = useState([])
    const ingredient = useSelector(state => state?.ingredient?.oneIngredient)
    const user = useSelector(state => state?.session?.user)
    const recipe = useSelector(state => state?.recipe?.oneRecipe)
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [amount, setAmount] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(ingredientActions.getSingleIngredient(userId, recipeId, ingredientId))
    }, [dispatch])

    const onSubmit = async (e) => {
        e.preventDefault()
        const data = await dispatch(ingredientActions.updateIngredient(
            user?.id, 
            recipeId, 
            ingredient?.id,
            name,
            type,
            amount
        ));

        if(data) {
            setErrors(data)
        }
        onFormSubmit(e)
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
                            <button className='add-ingredient' type='submit'>Edit Ingredient</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default IngredientEditForm;
