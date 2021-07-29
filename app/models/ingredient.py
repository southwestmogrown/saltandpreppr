from .db import db

class Ingredient(db.Model):
    __tablename__ = 'Ingredients'

    id = db.Column(db.Integer, primary_key=True)
    recipeId = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(20), nullable=True)
    amount = db.Column(db.String(20), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'recipeId': self.recipeId,
            'name': self.name,
            'type': self.type,
            'amount': self.amount
        }