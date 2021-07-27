from .db import db

class UserIngredient(db.Model):
    __tablename__ = 'UserIngredients'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'name': self.name
        }