from .db import db

class Recipe(db.Model):
    __tablename__ = 'Recipes'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(10))
    instructions = db.Column(db.Text, nullable=False)
    user = db.relationship('User', back_populates='recipes')
    ingredients = db.relationship('Ingredient', back_populates='recipe',  cascade="all, delete-orphan")
    

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'name': self.name,
            'type': self.type,
            'instructions': self.instructions
        }