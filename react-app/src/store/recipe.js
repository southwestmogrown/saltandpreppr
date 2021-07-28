const SET_RECIPE = 'recipe/SET_RECIPE';
const GET_RECIPE = 'recipe/GET_RECIPE';
const UPDATE_RECIPE = 'recipe/UPDATE_RECIPE';
const ADD_RECIPE = 'recipe/ADD_RECIPE'
const REMOVE_RECIPE = 'recipe/REMOVE_RECIPE';

const setRecipes = (recipes) => ({
    type: SET_RECIPE,
    payload: recipes
});

const getOneRecipe = (recipe) => ({
    type: GET_RECIPE,
    payload: recipe
})

const updateRecipe = (recipeId, instructions) => ({
    type: UPDATE_RECIPE,
    payload: {
        recipeId,
        instructions
    }
});

const addOneRecipe = (recipe) => ({
    type: ADD_RECIPE,
    payload: recipe
});

export const getRecipes = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/recipes`)

    if(res.ok) {
        const data = await res.json()

        if(data.errors) {
            return data.errors
        }
        dispatch(setRecipes(data))
    }
};

export const getRecipe = (userId, recipeId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/recipes/${recipeId}`)

    if(res.ok) {
        const data = await res.json()

        if(data.errors) {
            return data.errors
        }
        dispatch(getOneRecipe(data))
    }
}

const initialState = {allRecipes: null, oneRecipe: null}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case SET_RECIPE:
            return { ...state, allRecipes: action.payload}
        case GET_RECIPE:
            return { ...state, oneRecipe: action.payload}
        default:
            return state;
    }
}