import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as recipeActions from '../store/recipe';

function InstructionForm() {
    const  [errors, setErrors] = useState([]);
    const [instructions, setInstructions] = useState('');

    const params = useParams();
    const dispatch = useDispatch();
    const recipe = useSelector(state => state?.recipe?.oneRecipe)

    const onSubmit = async (e) => {
        e.preventDefault()
        const data = await(dispatch())
    }

    useEffect(() => {
        dispatch(recipeActions.getRecipe(params.userId, params.recipeId))
    }, [dispatch])
    
    return (
        <div>
            <h1>Instruction Form</h1>
        </div>
    )
}

export default InstructionForm;
