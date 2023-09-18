""" A module containing error messages."""


def _Error(children: dict) -> dict:
    """
    Take a dictionary of children and wrap in parent with key "error"
    
    :return: A dictionary with the key "error" and the
             value of the dictionary passed in.
    """

    body = {"error": children}
    return body


# Kept function names capitalized to keep error calling consistant

FAILED_LOGIN = _Error({"code": 401,
                       "message": "Username or password is inncorrect."})


NOT_AUTHENTICATED = _Error({"code": 401,
                            "message": "No one is logged in."})


def NOT_AUTHORIZED(username: str) -> dict:
    return _Error({"code": 403,
                   "message": username + " is not logged in."})


def USER_NOT_FOUND(username: str) -> dict:
    return _Error({"code": 404,
                   "message": "Can't find User: " + username})


def USERNAME_IS_TAKEN(username: str) -> dict:
    return _Error({"code": 200,  # success code because data is found?
                   "message": "The username is taken: " + username})
