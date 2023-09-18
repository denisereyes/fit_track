from models.User import User
from common.utils import remove_data_key
import common.format_api.error as error
from common.format_api.data import data


users = {}

SUCCESS = data({"code": 200})


def login(request: dict) -> dict:
    credentials = remove_data_key(request)
    username = credentials["username"]
    password = credentials["password"]

    user: dict = users.get(username)

    if user is not None and password == user["password"]:
        users[username]["is_authorized"] = True
        return SUCCESS

    return error.FAILED_LOGIN


def logout(request: dict) -> dict:
    username = remove_data_key(request)["username"]
    response = _check_user(username)

    if "error" in response:
        response

    users[username]["is_authorized"] = False
    return SUCCESS


def create_user(request: dict) -> dict:
    settings = remove_data_key(request)
    username = settings["username"]

    if username in users:
        return error.USERNAME_IS_TAKEN(username)

    users.update({username: settings})
    return _secure_data(settings)


def find_username(request: dict) -> dict:
    body = remove_data_key(request)
    username = body["username"]
    if username not in users:
        return error.USER_NOT_FOUND(username)

    return request


def find_user(request: dict) -> dict:
    body = remove_data_key(request)
    username = body["username"]

    user_data = _check_user(username)

    if "error" in user_data:
        return user_data

    return _secure_data(user_data)


def update_user(request: dict) -> dict:
    body = remove_data_key(request)
    username = body["username"]
    settings = body["settings"]

    user_data = _check_user(username)

    if "error" in user_data:
        return user_data

    user_data.update(settings)

    # Update username key for fake db
    if "username" in settings:
        users[settings["username"]] = users.pop(username)

    return _secure_data(user_data)


def add_weight(request: dict) -> dict:
    body = request["data"]
    username = body["username"]
    weight = body["weight"]
    user_data = _check_user(username)

    if "error" in user_data:
        return user_data

    user_data["weight"]["history"].insert(0, weight)
    weight_history = user_data["weight"]["history"]

    return data({"history": weight_history})


def get_weight(request: dict) -> dict:
    body = remove_data_key(request)
    username = body["username"]
    user_data = _check_user(username)

    if "error" in user_data:
        return user_data

    weight_history = user_data["weight"]["history"]

    return data({"history": weight_history})


def get_calories(request: dict) -> dict:
    body = remove_data_key(request)
    username = body["username"]
    user_data = _check_user(username)
    if "error" in user_data:
        return user_data

    calories = user_data["calories"]

    return data(calories)


def update_calories(request: dict) -> dict:
    body = remove_data_key(request)
    username = body["username"]
    response = _check_user(username)

    if "error" in response:
        return response

    calories = body["calories"]

    users[username]["calories"] = calories

    return data(calories)


def _check_user(username: str) -> dict:
    if username not in users:
        return error.USER_NOT_FOUND(username)

    user: dict = users.get(username)

    if user["is_authorized"] is False:
        return error.NOT_AUTHORIZED(username)

    return user


def _secure_data(request: dict) -> dict:
    user = User.from_json(request)
    safe = user.to_json(without=["password", "is_authorized"])
    return data(safe)
