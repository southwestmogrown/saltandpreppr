import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as recipeActions from '../../store/recipe';

function InstructionForm({  onInstructionFormSubmit }) {
    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();
    const  [errors, setErrors] = useState([]);
    const [instructions, setInstructions] = useState('');
    const user = useSelector(state => state?.session?.user)
    const recipe = useSelector(state => state?.recipe?.oneRecipe)

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(recipeActions.updateRecipe(
            user?.id, 
            recipe?.id, 
            instructions
        ));

        if(data) {
            setErrors(data)
        }
        await dispatch(recipeActions.getRecipe(user?.id, recipe.id))
        onInstructionFormSubmit(e)
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
