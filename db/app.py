from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from bson import json_util
from .userClass import user_functions

#establishing server
app = Flask(__name__)
CORS(app)

#logs in a user
@app.route('/login', methods=['POST'])
def login():
    body = request.json['data']

    user = user_functions.login_user(body) 

    return user

#logs out a user 
@app.route('/logout', methods=['POST']) 
def logout():
    body = request.json['data']

    user = user_functions.logout_user(body) 

    return user

#creates a user and posts their data to mongodb atlas
@app.route('/create-user', methods=['POST'])
def create_user():
    body = request.json['data']

    user = user_functions.insert_user(body) 

    return user

#gets a username from database
@app.route('/find-username', methods=['POST'])
def find_username():
    body = request.json['data']

    user = user_functions.retrieve_username(body)

    return user 

#gets a user from the database 
@app.route('/find-user', methods=['POST']) 
def find_user():
    body = request.json['data'] 

    user = user_functions.retrieve_user(body)

    return user

#updates a users info - settings
@app.route('/update-info', methods=["PUT"])
def update_info():
    body = request.json

    user = user_functions.update_user(body)

    return user

#adds weights to a users weight history
@app.route('/add-weight', methods=['POST'])
def add_weight():
    body = request.json['data']

    user = user_functions.add_a_weight(body)
    
    return user 

#gets a users weight
@app.route('/get-weight', methods=['POST']) 
def get_weight():
    body = request.json['data']

    user = user_functions.gets_weight(body)

    return user

#gets a users calories
@app.route('/get-calories', methods=['POST']) 
def get_calories():
    body = request.json['data']

    user = user_functions.gets_calorie(body)

    return user

#updates a users calories
@app.route('/update-calories', methods=['PUT'])
def update_calories():
    body = request.json['data']

    user = user_functions.update_calorie(body)

    return user

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
