from common.utils import hash_from_string
from models.User import User
from models.Weight import Weight
from models.Calories import Calories

""" A module formating bodies for the API."""


def data(children: dict) -> dict:
    """
    Creates a dictionary with a key of "data" and a
    value of the children dictionary.

    :return: A dictionary
    """
    body = {"data": children}
    return body


def username(username: str) -> dict:
    """
    Format a username request
    :return: A dictionary with a key of "username" and a
             value of the username parameter.
    """
    return data({"username": username})


def new_user(user: User) -> dict:
    user_data = user.to_json(without=["initial_weight"])
    user_data["password"] = hash_from_string(user_data["password"])
    return data(user_data)


def update_user(username: str, settings: dict) -> dict:
    return data({"username": username, "settings": settings})


def login(username: str, password: str) -> dict:
    return data({"username": username, "password": password})


def update_calories(username: str, calories: Calories) -> dict:
    return data({"username": username, "calories": calories.to_json()})


def add_weight(username: str, weight: Weight) -> dict:
    return data({"username": username, "weight": weight.to_json()})
