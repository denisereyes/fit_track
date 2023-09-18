import json
import requests
# import tests.database as fake
import common.format_api.data as format
from common.utils import remove_data_key
from models.User import User
from models.Calories import Calories
from models.Weight import Weight
from models.WeightList import WeightList


def create_user(user: User) -> dict:
    """
    Create a new user in the database
    :return: A new user from the database
    """
    request = format.new_user(user)
    path = "/create-user"
    response = _db("POST", path, request)
    if 'error' in response:
        return response

    user = _format_user_data(response)

    return user


def find_user(username: str, format_user: bool = True) -> dict:
    """
    Find a user from the database
    :return: A return a user dict with the same username
    """
    request = format.username(username)
    path = "/find-user"
    response = _db("POST", path, request) 
    
    if 'error' in response:
        return response

    if format_user:
        response = _format_user_data(response)

    return response


def update_user(username: str, settings: dict) -> dict:
    """
    Take a username and a dictionary of settings, and updates
    the user's settings in the database

    :return: Updated user info in a dictionary.
    """
    request = format.update_user(username, settings)
    path = "/update-info"
    response = _db("PUT", path, request)

    if 'error' in response:
        return response

    user = _format_user_data(response)

    return user


def find_username(username: str) -> dict:
    """
    Take a username and return the username from the database if found

    :return: dictionary containing the username if found
    """
    request = format.username(username)
    path = "/find-username"
    response = _db("POST", path, request) 

    return response


def login(username: str, password: str) -> dict:
    """
    Take a username and password and returns a response from the database.

    :return: A dictionary with the following keys:
        - "error": If there is an error, this key will be present.
        - "data": If there is no error, this key will be present.
    """
    request = format.login(username, password)
    path = "/login"
    response = _db("POST", path, request)

    return response


def logout(username: str) -> dict:
    """
    This function logs out the user with the given username

    :return: A dictionary with the following keys:
        - "error": If there is an error, this key will be present.
        - "data": If there is no error, this key will be present.
    """
    request = format.username(username)
    path = "/logout"
    response = _db("POST", path, request) 

    return response


def get_calories(username: str) -> dict:
    """
    This function takes in a username and returns
    the caloriesdictionary of the user

    :return: A dictionary containing the calorie information of a user.
    """
    request = format.username(username)
    path = "/get-calories"
    response = _db("POST", path, request) 

    return response


def update_calories(username: str, calories: Calories) -> dict:
    """
    It updates the calories of a user on the database.
    :return: A dictionary containing the updated calories information
    """
    request = format.update_calories(username, calories)
    path = "/update-calories"
    response = _db("PUT", path, request)

    return response


def get_weight_statistics(username: str) -> dict:
    """
    Get the weight history of a user and return the statistics of the weight
    :return: A dictionary with statistics of the users weight
    """
    request = format.username(username)
    path = "/get-weight"
    response = _db("POST", path, request)
    if "error" in response:
        return response
    statistics = _weight_statistics_from_history(response)

    return statistics


def add_weight(username: str, weight: Weight) -> dict:
    """
    Add a weight to the database and return the
    statistics of the weight history

    :return: A dictionary containing the weight statistics.
    """
    request = format.add_weight(username, weight)
    path = "/add-weight"
    response = _db("POST", path, request)

    if "error" in response:
        return response

    statistics = _weight_statistics_from_history(response)

    return statistics


# Helper Functions

def _format_user_data(data: dict) -> dict:
    """
    It takes a dictionary with user data, and returns
    a dictionary where the raw weight data formatted to statistics.

    :return: A dictionary with formated user data.
    """

    # Renew Calories
    # !! Not the best spot but because of time constraints it was left here.
    user_data = remove_data_key(data)
    user = User.from_json(user_data)
    user.renew_calories()
    user_data = user.to_json()

    # Get weight statistics
    user_data["weight"] = WeightList.get_statistics(user_data["weight"])

    return format.data(user_data)


def _weight_statistics_from_history(history_data: dict) -> dict:
    """
    It takes a dictionary of weight history data and
    returns a dictionary of statistics

    :return: A dictionary with the statistics of the weights.
    """
    weight = remove_data_key(history_data)
    statistics = WeightList.get_statistics(weight)
    return format.data(statistics)


def _db(type: str, path: str, request: dict):
    """
    It takes a request type, a path, and a request body,
    and returns the response from the database.

    :return: A dictionary (json) from the database.
    """

    # Config
    _BASE = "http://db:8080"
    _HEADER = {"Content-Type": "application/json"}

    url = _BASE + path
    body = json.dumps(request)
    # !! DB only does POST and PUT request because there was conflicts doing GET requests
    # !! Not the best implementation but because of time constraints it was left that way.

    if type == "POST":
        response = requests.post(url, data=body, headers=_HEADER)
    elif type == "GET":
        response = requests.get(url, params=request['data'], headers=_HEADER)
    elif type == "PUT":
        response = requests.put(url, data=body, headers=_HEADER)

    return response.json()
