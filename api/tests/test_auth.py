import controllers.auth as Auth

def test_login():
    username = "user"
    password = "hello"
    assert Auth.login(username, password) == {
        "error": {
            "code": 401,
            "message": "Username or password is inncorrect."
        }
    }
        
def test_logout():
    assert Auth.logout() == {"code": 401,
                            "message": "No one is logged in."}

def test_check_login():
    assert Auth.check_login() == {
        "error": {
            "code": 401,
            "message": "No one is logged in."
        }
    }
    