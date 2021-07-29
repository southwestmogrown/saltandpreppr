import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Recipes from './components/Recipes';
import InstructionForm from './components/InstructionForm';
import RecipePage from './components/RecipePage';
import RecipeForm from './components/RecipeForm';
import { authenticate } from './store/session';
import * as recipeActions from './store/recipe';

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
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
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
          <RecipeForm />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/recipes/:recipeId' exact={true}>
          <RecipePage />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/recipes/:recipeId/instruction-form'>
          <InstructionForm />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
