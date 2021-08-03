from app.models import db
from app.models.mealplan_recipes import MealplanRecipe

def seed_mealplan_recipes():

    mpr1 = MealplanRecipe(
        mealplanId = 1,
        recipeId = 1
    )

    mpr2 = MealplanRecipe(
        mealplanId = 1,
        recipeId = 2
    )

    mpr3 = MealplanRecipe(
        mealplanId = 1,
        recipeId = 3
    )

    db.session.add(mpr1)
    db.session.add(mpr2)
    db.session.add(mpr3)

    db.session.commit()

def undo_mealplan_recipes():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()