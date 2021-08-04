import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as mealplanRecipeActions from '../../store/mealplan_recipe';

function AddToPlan(props) {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const history = useHistory()
    const [mealplanId, setMealplanId] = useState('')
    const { userId, recipeId, onAddToPlanSubmit } = props
    const mealplans = useSelector(state => state?.mealplan?.allMealplans?.mealplans)

    const updateMealplanId = (e) => {
        setMealplanId(e.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors([])
        const data = await dispatch(mealplanRecipeActions.addOneRecipe(userId, mealplanId, recipeId));

        if(data) {
            setErrors(data)
        }
        onAddToPlanSubmit(e)
        history.push(`/users/${userId}/mealplans/${mealplanId}`)
    }


    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className='input-container'>
                    <select placeholder='Choose a plan' onChange={updateMealplanId} >
                        <option>--</option>
                        {mealplans.map(mealplan => (
                            <option value={mealplan.id} key={mealplan.id}>{mealplan.name}</option>
                        ))}
                    </select>

                </div>
                <button className='add-to-submit-btn' type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default AddToPlan;
