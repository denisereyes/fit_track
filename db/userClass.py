import re
from .db import database


class user_functions():

    # logs in a user 
    def login_user(data):
        """
        It seperates the json and passes in the username and password as arguemnts 
        to be handeled by db 

        :return: A json with the user's information.
        """
        username = data["username"]
        password = data["password"]
        response = database.login(username, password)

        return response

    # logs out a user 
    def logout_user(data):
        """
        It seperates the json and passes in the username as an arguemnt 
        to be handeled by db 

        :return: succes code 
        """
        username = data["username"]
        response = database.logout(username)

        return response

    # inserts user to database
    def insert_user(data):
        """
        It seperates the json and passes in the username as an arguemnt 
        to be handeled by db 

        :return: A json with the user's information.
        """
        username = data["username"]
        response = database.insert(data, username)

        return response
    
     # retrieves a user's username from database given the username
    def retrieve_username(data):
        """
        It seperates the json and passes in the username as an arguemnt 
        to be handeled by db 

        :return: A json with the username.
        """
        username = data["username"]

        response = database.find_username(username)
        return response
    
    # gets a user from the database provided the username 
    def retrieve_user(data):
        """
        It seperates the json and passes in the username as an arguemnt 
        to be handeled by db 

        :return: A json with the user's information.
        """
        username = data["username"]
        response = database.find_user(username)
        return response 

    # update information for a specific user
    def update_user(data):
        """
        It seperates the json and passes in the username as an arguemnt 
        to be handeled by db. It also iteratoes through the settings the 
        user wants to change and seperates the key value pairs and put them
        in their respective list. The lists get passed to the db. 

        :return: A json with the user's information.
        """
        body = data['data']
        username = body['username']

        query = []
        info = []

        for k, v in body["settings"].items():
            query.append(k)           
            info.append(v)
       
        # (user is the username) (query is what we want to change) (info is the changed info) 
        response  = database.update(username, query, info)
        return response 

    # adds a weight to a users weight array 
    def add_a_weight(data):
        """
        It seperates the json and passes in the username and weight information as arguemnts 
        to be handeled by db 

        :return: A json with the user's weight information.
        """

        username = data["username"]

        weight = data["weight"]
        
        response = database.adding_weight(username, weight)

        return response 

    # gets a weight from the users weight array
    def gets_weight(data):
        """
        It seperates the json and passes in the username as an arguemnt 
        to be handeled by db 

        :return: A json with the user's weight information.
        """
        username = data["username"]

        response = database.getting_weight(username)

        return response 
        

    # gets calories from a user given the username 
    def gets_calorie(data):
        """
        It seperates the json and passes in the username as an arguemnt 
        to be handeled by db 

        :return: A json with the user's calorie information.
        """
        username = data["username"]

        response = database.getting_calories(username)

        return response 

    # updates a users calories 
    def update_calorie(data):
        """
        It seperates the json and passes in the username and calorie information 
        as arguemnts to be handeled by db 

        :return: A json with the user's calorie information.
        """
        username = data["username"]
        date = data["calories"]["date"]
        goal = data["calories"]["goal"]
        input = data["calories"]["input"]
        output = data["calories"]["output"]
   
        response = database.updating_calories(username, date, goal, input, output)

        return response 


