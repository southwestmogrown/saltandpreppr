from .db import db

class Mealplan(db.Model):
    """Table to connect recipes to users"""

    __tablename__ = 'Mealplans'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(55), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    user = db.relationship('User', back_populates='mealplans')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'userId': self.userId,
        }