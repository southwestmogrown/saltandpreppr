from .db import db

class Mealplan(db.Model):
    """Table to connect recipes to users"""

    __tablename__ = 'Mealplans'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(55), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    user = db.relationship('User', back_populates='mealplans')
    mealplanrecipes = db.relationship('MealplanRecipe', back_populates='mealplan', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'userId': self.userId,
        }