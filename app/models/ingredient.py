from .db import db

class Ingredient(db.Model):
    __tablename__ = 'Ingredients'

    id = db.Column(db.Integer, primary_key=True)
    recipeId = db.Column(db.Integer, db.ForeignKey('Recipes.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(20), nullable=True)
    amount = db.Column(db.String(20), nullable=True)
    recipe = db.relationship('Recipe', back_populates='ingredients')

    def to_dict(self):
        return {
            'id': self.id,
            'recipeId': self.recipeId,
            'name': self.name,
            'type': self.type,
            'amount': self.amount
        }