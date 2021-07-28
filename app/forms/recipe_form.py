from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Recipe


class RecipeForm(FlaskForm):
    name = StringField('name')
    name = StringField('type')
    name = StringField('instructions')