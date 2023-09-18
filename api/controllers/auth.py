from controllers import api
from controllers.account import find
from common.utils import hash_from_string, remove_data_key
from common.format_api.error import NOT_AUTHENTICATED
from flask import session

# A global variable used for the session key
_AUTHORIZED_USER = 'authorized_user'


def login(username: str, password: str) -> dict:
    """
    This function takes a username and password, hashes the password,
    and returns a response from the API.

    :return: A dictionary with the following keys:
        - 'error': If there is an error, this key will be present.
        - 'data': If login is successful, this key will be present.
    """

    password = hash_from_string(password)

    response = api.login(username, password)
    if 'error' in response:
        return response

    update_session(username)

    return response


def logout() -> dict:
    """
    It checks if the user is logged in, if they are, it logs them out
        - 'error': If there is an error, this key will be present.
        - 'data': If login is successful, this key will be present.
    """
    current_session = check_login()
    if 'error' in current_session:
        return current_session

    user = remove_data_key(current_session)

    response = api.logout(user['username'])
    if 'error' in response:
        return response

    session.pop(_AUTHORIZED_USER, default=None)
    return response


def check_login() -> dict:
    """
    If the user is not logged in, return a not authenticated
    response, otherwise return the user's information.
    Also renew calories.

    :return: A dictionary with the following keys:
        - 'error': If there is an error, this key will be present.
        - 'data': If login is successful, this key will be present.
    """
    if not session.get(_AUTHORIZED_USER):
        return NOT_AUTHENTICATED

    username = session.get(_AUTHORIZED_USER)
    response = find(username)

    return response


def update_user(data: dict) -> dict:
    """
    It updates the user's session if the username is provided,
    and hashes the password if it is provided. Response is sent to db.

    :return: A dictionary with user information.
    """
    if 'username' in data:
        update_session(data['username'])

    if 'password' in data:
        data['password'] = hash_from_string(data['password'])

    return data


def update_session(username) -> None:
    """ Update the session with the given username. """
    session[_AUTHORIZED_USER] = username
