from .db import db

class Mealplan(db.Model):
    """Table to connect recipes to users"""

    __tablename__ = 'Mealplans'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    user = db.relationship('User', back_populates='mealplans')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
        }