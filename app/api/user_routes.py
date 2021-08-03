from app.models import ingredient
from app.models.ingredient import Ingredient
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, Recipe
from app.models.meal_plan import Mealplan
from app.forms.recipe_form import RecipeForm
from app.forms.instruction_form import InstructionForm




user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


######### Recipe Routes ############

def get_all_recipes(userId):
    return Recipe.query.where(Recipe.userId == userId).all()

@user_routes.route('/<int:id>/recipes')
@login_required
def recipes(id):
    recipes = get_all_recipes(id)
    return {'recipes': [recipe.to_dict() for recipe in recipes]}

@user_routes.route('/<int:userId>/recipes/<int:recipeId>')
@login_required
def get_one_recipe(userId, recipeId):
    recipe = Recipe.query.where(Recipe.id == recipeId).first()
    return recipe.to_dict()

@user_routes.route('/<int:id>/recipes', methods=['POST'])
@login_required
def add_recipe(id):
    data = request.get_json()

    form = RecipeForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        new_recipe = Recipe(userId=data['userId'], name=data['name'], type=data['type'], instructions=data['instructions'])
        db.session.add(new_recipe)
        db.session.commit()
        recipes =  get_all_recipes(id)
    return {'recipes': [recipe.to_dict() for recipe in recipes]}

@user_routes.route('/<int:id>/recipes/<int:recipeId>', methods=['PATCH'])
@login_required
def edit_recipe(id, recipeId):
    data = request.get_json()
    form = InstructionForm()
    print(data)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        recipe = Recipe.query.get(recipeId)
        recipe.instructions = data['instructions']
        db.session.commit()
    return recipe.to_dict()

@user_routes.route('/<int:userId>/recipes/<int:recipeId>', methods=['DELETE'])
@login_required
def delete_recipe(userId, recipeId):
    recipe = Recipe.query.get(recipeId)
    db.session.delete(recipe)
    db.session.commit()
    recipes = get_all_recipes(userId)
    return {'recipes': [recipe.to_dict() for recipe in recipes]}


########### Ingredients routes ###########




@user_routes.route('/<int:userId>/recipes/<int:recipeId>/ingredients')
@login_required
def get_all_ingredients(userId, recipeId):
    ingredients = Ingredient.query.where(Ingredient.recipeId == recipeId).all()
    return {'ingredients': [ingredient.to_dict() for ingredient in ingredients]}


@user_routes.route('/<int:userId>/recipes/<int:recipeId>/ingredients/<int:ingredientId>')
@login_required
def get_one_ingredient(userId, recipeId, ingredientId):
    ingredient = Ingredient.query.where(Ingredient.id == ingredientId).first()
    return ingredient.to_dict()


@user_routes.route('/<int:userId>/recipes/<int:recipeId>/ingredients', methods=['POST'])
@login_required
def add_ingredient(userId, recipeId):
    data = request.get_json()
    new_ingredient = Ingredient(recipeId=data['recipeId'], name=data['name'], type=data['type'], amount=data['amount'])
    db.session.add(new_ingredient)
    db.session.commit()
    ingredients = get_all_ingredients(userId, recipeId)

    return ingredients


@user_routes.route('/<int:userId>/recipes/<int:recipeId>/ingredients/<int:ingredientId>', methods=['PATCH'])
@login_required
def edit_ingredient(userId, recipeId, ingredientId):
    data = request.get_json()
    ingredient = Ingredient.query.get(ingredientId)
    ingredient.name = data['name']
    ingredient.type = data['type']
    ingredient.amount = data['amount']
    db.session.commit()
    return ingredient.to_dict()


@user_routes.route('/<int:userId>/recipes/<int:recipeId>/ingredients/<int:ingredientId>', methods=['DELETE'])
@login_required
def delete_ingredient(userId, recipeId, ingredientId):
    ingredient = Ingredient.query.get(ingredientId)
    db.session.delete(ingredient)
    db.session.commit()
    ingredients = get_all_ingredients(userId, recipeId)
    return ingredients


################### Mealplan Routes #####################################

@user_routes.route('<int:userId>/mealplans')
# @login_required
def get_mealplans(userId):
    mealplans = Mealplan.query.where(Mealplan.userId == userId).all()

    return {'mealplans': [mealplan.to_dict() for mealplan in mealplans]}


@user_routes.route('<int:userId>/mealplans/<int:mealplanId>')
# @login_required
def get_single_mealplan(userId, mealplanId):
    mealplan = Mealplan.query.where(Mealplan.id == mealplanId).first()
    return mealplan.to_dict()


@user_routes.route('<int:userId>/mealplans', methods=['POST'])
@login_required
def add_mealplan(userId):
    data = request.get_json()
    print(data)
    new_mealplan = Mealplan(name=data['name'], userId=data['userId'])
    db.session.add(new_mealplan)
    db.session.commit()
    mealplans = Mealplan.query.where(Mealplan.userId == userId)
    return {'mealplans': [mealplan.to_dict() for mealplan in mealplans]}


@user_routes.route('<int:userId>/mealplans/<int:mealplanId>', methods=['DELETE'])
# @login_required
def delete_mealplan(userId, mealplanId):
    mealplan = Mealplan.query.get(mealplanId)
    db.session.delete(mealplan)
    db.session.commit()
    mealplans = Mealplan.query.where(Mealplan.userId == userId)
    return {'mealplans': [mealplan.to_dict() for mealplan in mealplans]}