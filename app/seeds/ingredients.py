from app.models import db
from app.models.ingredient import Ingredient


# Adds a demo user, you can add other users here if you want
def seed_ingredients():
    i1 = Ingredient(
        recipeId=1,
        name='Tortillas', 
        type='Starch/Bread', 
        amount='30',
    )
    i2 = Ingredient(
        recipeId=1,
        name='Meat', 
        type='Protien', 
        amount='2 lbs',
    )
    i3 = Ingredient(
        recipeId=1,
        name='Cheese', 
        type='Dairy', 
        amount='24 oz',
    )

    db.session.add(i1)
    db.session.add(i2)
    db.session.add(i3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_ingredients():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()