import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as recipeActions from '../../store/recipe';
import '../../styles/InstructionForm.css'

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
        setErrors([])
        const data = await dispatch(recipeActions.updateRecipe(
            user?.id, 
            recipe?.id, 
            instructions
        ));

        if(data) {
            setErrors(data)
            return;
        }
        await dispatch(recipeActions.getRecipe(user?.id, recipe.id))
        onInstructionFormSubmit(e)
    }

    const updateInstructions = (e) => {
        setInstructions(e.target.value)
    }

    
    return (
        <div className='instruction-form-main'>
            <div className='instruction-form'>
                <form onSubmit={onSubmit}>
                    <div className='errors-container'>
                        <div className='instruction-errors'>
                            {errors.map((error, ind) => (
                                <div key={ind} >{error}</div>
                            ))}
                        </div>
                    </div>
                    <div className='input-container'>
                        <div className='recipe-instructions'>
                            <label htmlFor='edit_instructions'>Edit Instructions</label>
                            <div>
                                <textarea
                                    className='instructions-textarea'
                                    name='edit_instructions'
                                    type='text-area'
                                    placeholder={recipe?.instructions}
                                    onChange={updateInstructions}
                                    required
                                    />
                            </div>
                        </div>
                    </div>
                    <div className='edit-recipe-btn-container'>
                        <div className='edit-recipe-btn'>
                            <button className='edit-recipe' type='submit'>Edit Recipe!</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default InstructionForm;
