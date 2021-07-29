import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as recipeActions from '../store/recipe';

function InstructionForm() {
    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();
    const  [errors, setErrors] = useState([]);
    const [instructions, setInstructions] = useState('');
    const recipe = useSelector(state => state?.recipe?.oneRecipe)

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(recipeActions.updateRecipe(
            params.userId, 
            params.recipeId, 
            instructions
        ));

        if(data) {
            setErrors(data)
        }
        await dispatch(recipeActions.getRecipes(params.userId))
        history.push(`/users/${params.userId}/recipes`)
    }

    const updateInstructions = (e) => {
        setInstructions(e.target.value)
    }

    
    return (
        <div>
            <h1>Instruction Form</h1>
            <form onSubmit={onSubmit}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind} >{error}</div>
                    ))}
                </div>
                <div>
                    <label htmlFor='edit_instructions'>Edit Instructions</label>
                    <textarea
                        name='edit_instructions'
                        type='text-area'
                        placeholder={recipe?.instructions}
                        // value={recipe?.instructions}
                        onChange={updateInstructions}
                    />
                    <button type='submit'>Edit Recipe!</button>
                </div>
            </form>
        </div>
    )
}

export default InstructionForm;
