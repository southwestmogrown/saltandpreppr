const SET_MEALPLANRECIPES = 'mealplan/SET_MEALPLANRECIPES';
const ADD_MEALPLANRECIPES = 'mealplan/ADD_MEALPLANRECIPES';

const setMealPlanRecipes = (mealplan_recipes) => ({
    type: SET_MEALPLANRECIPES,
    payload: mealplan_recipes
});

const addMealPlanRecipe = (recipe) => ({
    type: ADD_MEALPLANRECIPES,
    payload: recipe
})

export const getMealPlanRecipes = (userId, mealplanId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/mealplans/${mealplanId}/mealplan-recipes`)

    if (res.ok) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
        dispatch(setMealPlanRecipes(data))
    }
}

export const addOneRecipe = (userId, mealplanId, recipeId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/mealplans/${mealplanId}/mealplan-recipes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mealplanId,
            recipeId
        })
    });

    if (res.ok) {
        const data = await res.json();

        if(data.errors) {
            return data.errors
        }
        dispatch(addMealPlanRecipe(data))
    }
}

const initialState = {allMealplanRecipes: null}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case SET_MEALPLANRECIPES:
            return {...state, allMealplanRecipes: action.payload}
        default:
            return state
    }
}