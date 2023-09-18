from flask import Flask, request
from flask_cors import CORS
from requests import Request
import controllers.auth as auth
import controllers.account as account

# Global required by flask
app = Flask(__name__)
CORS(app)

app.secret_key = "fb2f1cba-5298-4fae-8c6d-3a8c1317104a"

# Using a REST API structure
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        return auth.check_login()

    elif request.method == "POST":
        credentials = _dict_from_request(request)
        username = credentials["username"]
        password = credentials["password"]
        response = auth.login(username, password)
        return response


@app.route("/logout", methods=["GET"]) 
def logout():
    response = auth.logout()
    return response


@app.route("/user", methods=["POST"])
@app.route("/user/<username>", methods=["GET", "PUT"])
def user(username=None):
    if request.method == "GET":
        response = account.find(username)
        return response

    # If json body sent
    settings = _dict_from_request(request)

    if request.method == "POST":
        response = account.create(settings)
        return response

    elif request.method == "PUT":
        response = account.update(username, settings)
        return response


@app.route("/user/<username>/taken", methods=["GET"]) 
def find_username(username):
    response = account.find_username(username)
    return response


@app.route("/user/<username>/weight", methods=["POST", "GET"])
def weight(username):
    if request.method == "GET":
        response = account.weight(username)
        return response

    elif request.method == "POST":
        weight = _dict_from_request(request)
        kilograms = weight["kilograms"]
        response = account.add_weight(username, kilograms)
        return response


@app.route("/user/<username>/calories", methods=["GET", "POST", "PUT"])
def calories(username):
    if request.method == "GET":
        response = account.calories(username)
        return response
    elif request.method == "POST":
        response = account.renew_calories(username)
        return response

    elif request.method == "PUT":
        calories = _dict_from_request(request)
        amount = calories["amount"]
        response = account.update_calories(username, amount)
        return response


def _dict_from_request(request: Request) -> dict:
    return request.json["data"]


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
