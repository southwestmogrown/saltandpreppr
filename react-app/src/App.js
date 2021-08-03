import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginFormModal from './components/auth/LoginFormModal';
import SignUpFormModal from './components/auth/SignUpFormModal';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Recipes from './components/Recipes';
import RecipePage from './components/RecipePage';
import SplashPage from './components/SplashPage';
import { authenticate } from './store/session';
import * as recipeActions from './store/recipe';
import * as mealplanActions from './store/mealplan'
import Ingredients from './components/Ingredients';
import IngredientPage from './components/IngredientPage';
import IngredientFormModal from './components/IngredientFormModal';
import RecipeFormModal from './components/RecipeFormModal';
import InstructionFormModal from './components/InstructionFormModal';
import IngredientEditFormModal from './components/IngredientEditFormModal';
import MealPlanPage from './components/MealPlanPage';

function App() {
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const recipes = useSelector(state => state?.recipe?.allRecipes?.recipes)

 

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      if(user?.id) {
        dispatch(recipeActions.getRecipes(user.id))
      }
      setLoaded(true);
    })();
  }, [dispatch, user?.id]);

  if (!loaded) {
    return null;
  }


  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact={true}>
          <SplashPage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginFormModal  />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpFormModal  />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/recipes' exact={true}>
          <Recipes recipes={recipes} />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/recipe-form' exact={true}>
          <RecipeFormModal />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/recipes/:recipeId' exact={true}>
          <RecipePage />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/recipes/:recipeId/ingredient-form' exact={true}>
          <IngredientFormModal />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/recipes/:recipeId/ingredients' exact={true} >
          <Ingredients />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/recipes/:recipeId/ingredients/:ingredientId' exact={true}>
          <IngredientPage />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/recipes/:recipeId/instruction-form' exact={true}>
          <InstructionFormModal />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/recipes/:recipeId/ingredients/:ingredientId/ingredient-edit-form' exact={true}>
          <IngredientEditFormModal />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/mealplans/:mealplanId' exact={true}>
          <MealPlanPage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
