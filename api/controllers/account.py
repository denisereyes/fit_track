from models.Calories import Calories
from models.Weight import Weight
from models.User import User
import controllers.auth as auth
import controllers.api as api
from common.utils import remove_data_key


def find(username: str) -> dict:
    """
    This function takes a username and returns the user information
    :return: A dictionary of the user's information
    """

    response = api.find_user(username)

    return response


def find_username(username: str) -> dict:
    """
    This function takes a username and returns a
    dictionary with the username if found.

    :return: A dictionary containing the username.
    """
    response = api.find_username(username)
    return response


def update(username: str, settings: dict) -> dict:
    """
    Update the user's settings
    :return: A dictionary containing the users updated information.
    """
    settings = auth.update_user(settings)
    response = api.update_user(username, settings)
    return response


def create(settings: dict) -> dict:
    """
    Create a new user account
    :return: A dictionary with the user's data
    """

    user = User.from_json(settings)

    #  Set up user data to be added to the database
    user.setup_account()

    #  Send user to database
    user_data = api.create_user(user)
    if "error" in user_data:
        return user_data

    # Login new user
    authorized = auth.login(user.username, user.password)
    if "error" in authorized:
        return authorized

    return user_data


def weight(username: str) -> dict:
    """
    This function takes a username and returns a
    dictionary of the user's weight statistics.

    :return: A dictionary of the user's weight.
    """

    response = api.get_weight_statistics(username)
    return response


def add_weight(username: str, kilograms: float) -> dict:
    """
    Take a username and a weight in kilograms
    and return the new weight statistics

    :return: A dictionary with updated weight statistics
    """

    weight = Weight(kilograms)
    response = api.add_weight(username, weight)
    return response


def calories(username: str) -> dict:
    """
    This function takes a username and returns a
    dictionary of the user's calories.

    :return: A dictionary of the user's calories.
    """
    response = api.get_calories(username)
    return response


def update_calories(username: str, amount: int) -> dict:
    """
    Update the calories for a user by a given amount
    :return:  A dictionary of the user's calories.
    """
    response = api.get_calories(username)

    if "error" in response:
        return response

    calories_data = remove_data_key(response)
    calories_dict = calories_data["calories"]
    calories = Calories.from_json(calories_dict)
    calories.update(amount)
    response = api.update_calories(username, calories)

    return response


def renew_calories(username: str) -> dict:
    """
    It resets the calories for a user if it is a new day.
    :return: A dictionary of the user's calories.
    """

    response = api.find_user(username, format_user=False)
    if "error" in response:
        return response

    user = _user_from_data(response)  
    calories = user.renew_calories()
    updated_calories = api.update_calories(user.username, calories)

    return updated_calories


# Helper Functions
def _user_from_data(data: dict) -> User:
    """
    Convert a dictionary wrapped in data key to a User object.
    :return: A user object
    """
    user = remove_data_key(data)
    user = User.from_json(user)
    
    return user
