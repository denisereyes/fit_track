from datetime import date
from models.User import User
from models.WeightList import WeightList
from models.Weight import Weight
from models.Calories import Calories

def test_from_json():
    user = {
        'username' : "user", 
        'password' : "hello",
        'initial_weight' : 30,
        'birthday' :"10-10-2010",
        'sex' : "f",
        'height' : 43,
        'activity_level' : 1, 
        'desire' : 1 , 
        'is_metric' : False,
        'weight' : {
				"date": "04-28-2022",
				"kilograms": 55.6
		}, 
        'calories' : {
			"date": "04-28-2022",
			"goal": 1,
			"input": 800,
			"output": 500
		}, 
        'is_authorized' : False
    }
    assert User.from_json(user) == User(
        username = "user", 
        password = "hello", 
        initial_weight = 30,
        birthday = "10-10-2010",
        sex = "f",
        height = 43,
        activity_level = 1, 
        desire = 1, 
        is_metric = False,
        weight = Weight(
            date=date(2022, 4, 28),
            kilograms=54
        ), 
        calories = Calories(
			date=date(2022, 4, 28), 
			goal=1,
			input=800,
			output=500
        ), 
        is_authorized = False)

def test_to_json():
    user = User(username = "user", 
        password = "hello", 
        initial_weight = 30,
        birthday = "10-10-2010",
        sex = "f",
        height = 43,
        activity_level = 1, 
        desire = 1, 
        is_metric = False,
        weight = Weight(
            date=date(2022, 4, 28),
            kilograms=54
        ), 
        calories = Calories(
			date=date(2022, 4, 28), 
			goal=1,
			input=800,
			output=500
        ), 
        is_authorized = False)
    assert user.to_json() == {
        'username' : "user", 
        'password' : "hello", 
        'initial_weight' : 30,
        'birthday' : "10-10-2010",
        'sex' : "f",
        'height' : 43,
        'activity_level' : 1, 
        'desire' : 1 , 
        'is_metric' : False,
        'weight' : {
				"date": "04-28-2022",
				"kilograms": 55.6
		}, 
        'calories' : {
			"date": "04-28-2022",
			"goal": 1,
			"input": 800,
			"output": 500
		}, 
        'is_authorized' : False
    }

def test_setup_account():
    user = User(password="hello",is_authorized=False, birthday="04-08-2021",
    weight=[100], calories=("05-01-2022", 2000, 0, 0))
    assert user.setup_account() == User(password="hello",is_authorized=False, birthday="04-08-2021",
    weight=[100], calories=("05-01-2022", 2000, 0,0))
