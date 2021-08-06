import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as mealplanRecipeActions from '../../store/mealplan_recipe';
import '../../styles/AddToPlan.css';

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
            return;
        }
        onAddToPlanSubmit(e)
        history.push(`/users/${userId}/mealplans/${mealplanId}`)
    }


    return (
        <div className='add-to-plan-main'>
            <div className='add-to-plan-form'>
                <form onSubmit={onSubmit}>
                <div className='errors-container'>
                            {errors.map((error, ind) => (
                                <div className='ingredient-errors' key={ind}>{error}</div>
                            ))}
                        </div>
                    <div className='input-container'>
                        <div className='select-container'>
                            <label htmlFor='plan-select'>Which Plan?</label>
                            <select name='plan-select' onChange={updateMealplanId} >
                                <option>--</option>
                                {mealplans?.map(mealplan => (
                                    <option value={mealplan.id} label={mealplan.name} key={mealplan.id}>{mealplan.name}</option>
                                    ))}
                            </select>
                        </div>  

                    </div>
                    <div className='submit-container'>
                        {mealplanId === '' ? <></> :
                        <button className='add-to-submit-btn' type='submit'>Submit</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddToPlan;
