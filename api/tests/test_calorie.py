from datetime import date, datetime
from models.Calories import Calories
import models.Calories

def test_to_json():
    calories = Calories(
        date=date(2022, 5, 2),
        goal=27000,
        input=30,
        output=40
    )
    assert calories.to_json() == {
        "date": "05-02-2022",
        "goal": 27000,
        "input": 30,
        "output": 40
    }
    
def test_from_json(): 
    calories = {
        "date": "05-02-2022",
        "goal": 27000,
        "input": 30,
        "output": 40
    }
    assert Calories.from_json(calories) == Calories( 
        date=date(2022, 5, 2), 
        goal=27000,
        input=30,
        output=40
    )

def test_update():
    calories = Calories(date="05-02-2022",goal=500,input=0,output=0)
    calories.update(100)
    assert calories.goal == 400
    assert calories.input == 100

    
def test_calorie_goal():
    assert Calories.calculate_goal(sex="f", age=21, kilograms=54, meters=1.5494, activity_level=0, goal=1) == 2607
    
def test_calculate_AMR():
    assert models.Calories._calculate_AMR(bmr=1359.94, activity_level=0) == 2107.907

def test_calculate_BMR():
    assert models.Calories._calculate_BMR(sex="f", age=21, kilograms=54, meters=1.5494) == 1359.9450000000002
