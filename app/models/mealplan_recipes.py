from .db import db

class MealplanRecipe(db.Model):
    __tablename__ = 'MealplanRecipes'

    id = db.Column(db.Integer, primary_key=True)
    mealplanId = db.Column(db.Integer, db.ForeignKey('Mealplans.id'), nullable=False)
    recipeId = db.Column(db.Integer, db.ForeignKey('Recipes.id'), nullable=False)
    mealplan = db.relationship('Mealplan', back_populates='mealplanrecipes')
    recipes = db.relationship('Recipe', back_populates='mealplanrecipe')

    def to_dict(self):
        return {
            'id': self.id,
            'mealplanId': self.mealplanId,
            'recipeId': self.recipeId
        }