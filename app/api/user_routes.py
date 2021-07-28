from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, Recipe


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

def get_all_recipes(userId):
    return Recipe.query.where(Recipe.userId == userId).all()

@user_routes.route('/<int:id>/recipes')
# @login_required
def recipes(id):
    recipes = get_all_recipes(id)
    return {'recipes': [recipe.to_dict() for recipe in recipes]}

@user_routes.route('/<int:userId>/recipes/<int:recipeId>')
# @login_required
def get_one_recipe(userId, recipeId):
    recipe = Recipe.query.where(Recipe.id == recipeId).first()
    print(recipe)
    return recipe.to_dict()

@user_routes.route('/<int:id>/recipes', methods=['POST'])
# @login_required
def add_recipe(id):
    data = request.get_json()

    new_recipe = Recipe(userId=data['userId'], name=data['name'], type=data['type'], instructions=data['instructions'])
    db.session.add(new_recipe)
    db.session.commit()
    recipes = get_all_recipes(id)
    return {'recipes': [recipe.to_dict() for recipe in recipes]}

# @user_routes.route('/<int:id>/recipes/<int:recipeId>')
# # @login_required
# def edit_recipe(recipeId):
#     data = request.get_json()

#     new_recipe = data
