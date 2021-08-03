from app.models import db
from app.models.meal_plan import Mealplan

def seed_meal_plans():
    mp1 = Mealplan(userId=1, name='mealplan 1')

    mp2 = Mealplan(userId=1, name='mealplan 2')

    mp3 = Mealplan(userId=2, name='mealplan 3')

    db.session.add(mp1)
    db.session.add(mp2)
    db.session.add(mp3)

    db.session.commit()

def undo_meal_plans():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()