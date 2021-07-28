import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as recipeActions from '../store/recipe';

function RecipeForm() {
    const params = useParams();
    const [errors, setErrors] = useState([]);
    const [userId, setUserId] = useState(params.userId);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [instructions, setInstructions] = useState('');
    const dispatch = useDispatch()

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(recipeActions.addRecipe(
            name,
            type,
            instructions
        ));

        if(data) {
            setErrors(data)
        }
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
                <button type='submit'>Add Recipe!</button>
            </div>
        </form>
    )
};

export default RecipeForm
