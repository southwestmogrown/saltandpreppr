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
    console.log(params)

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
                        placeholder={ingredient?.name}
                        value={name}
                        onChange={updateName}
                    />
                <label htmlFor='type'>Type</label>
                    <input
                        name='type'
                        type='text'
                        placeholder={ingredient?.type}
                        value={type}
                        onChange={updateType}
                    />
                <label htmlFor='amount'>Amount</label>
                    <input
                        name='amount'
                        type='text'
                        placeholder={ingredient?.amount}
                        value={amount}
                        onChange={updateAmount}
                    />
                    <button type='submit'>Edit Ingredient</button>
            </form>
        </div>
    )
}

export default IngredientEditForm;