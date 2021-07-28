from flask_wtf import FlaskForm
from wtforms import StringField

class InstructionForm(FlaskForm):
    name = StringField('instructions')