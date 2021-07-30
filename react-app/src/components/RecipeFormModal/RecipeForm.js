import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as recipeActions from '../../store/recipe';
// import '../styles/RecipeForm.css';

function RecipeForm({ onRecipeFormSubmit }) {
    const history = useHistory()
    const params = useParams();
    const user = useSelector(state => state?.session?.user)
    const [errors, setErrors] = useState([]);
    const [userId] = useState(user.id);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [showModal, setShowModal] = useState(true)
    const [instructions, setInstructions] = useState('');
    const dispatch = useDispatch()

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(recipeActions.addRecipe(
            userId,
            name,
            type,
            instructions
        ));

        if(data) {
            setErrors(data)
        }
        await dispatch(recipeActions.getRecipes(user.id))
        onRecipeFormSubmit(e)
    }

    const updateName = (e) => {
        setName(e.target.value)
    }

    const updateType = (e) => {
        setType(e.target.value)
    }
    
    const updateInstructions = (e) => {
        setInstructions(e.target.value)
    }

    return (
        <div className='recipe-form'>
            <form onSubmit={onSubmit}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
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
                    <label htmlFor='instructions'>Instructions</label>
                    <textarea
                        name='instructions'
                        type='text-area'
                        placeholder='Instructions'
                        value={instructions}
                        onChange={updateInstructions}
                    />
                    <button type='submit' >Add Recipe!</button>
                </div>
            </form>
        </div>
    )
};

export default RecipeForm
