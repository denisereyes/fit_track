from os import stat
from pymongo import MongoClient


class database(object):

    URI = "mongodb+srv://Fittracking:Stayhealthy043@fittrack.vwc7d.mongodb.net/users_db?retryWrites=true&w=majority"
    DATABASE = None
    COLLECTION = None

    # initliazlizes connection to database
    @staticmethod
    def initialize():
        client = MongoClient(database.URI)
        database.DATABASE = client['users_db']
        database.COLLECTION = database.DATABASE['user_collection']
        return database.COLLECTION

    # logs in a user to the database
    @staticmethod
    def login(user, password):
        """
        Initializes the db and finds document in the database that has
        corresponding username, once the user is found it checks the password
        corresponds to the password given and if it does it updates the
        is_authorized tag to indicate the user can log in

        :return: The user's information.
        """
        db = database.initialize()

        response = db.find_one({"username": user})

        if response["password"] == password:
            db.update_one({"username": user}, {
                          "$set": {"is_authorized": True}})
            return {
                "data": {
                    "code": 200
                }
            }
        else:
            return {
                "error": {
                    "code": 401,
                   "message": "Username or password is incorrect."
                    }
                }

    # logout a user of the database
    @staticmethod
    def logout(user):
        """
        Initializes the db and checks if the user is logged in,
        if so it updates the is_authorized tag to indicate the user is logged out

        :return: sucess code
        """
        db = database.initialize()

        user_data = database.check_user(user)

        if "error" in user_data:
            return user_data

        db.update_one({"username": user}, {"$set": {"is_authorized": False}})

        return {
            "data": {
                "code": 200
            }
        }

    # inserts the data provided to database
    @staticmethod
    def insert(data, user):
        """
        Initializes the db and finds document in the database that has
        corresponding username, if the username is found then it is taken and
        the user can not pick that username,  if the username is not found we
        insert the data given to the database

        :return: The user's information.
        """

        db = database.initialize()
        try:
                for i in db.find({"username": user}):
                    return {
                        "error": {
                            "code": 404,
                            "message": "The username is taken: " + user
                        }
                    }

                response = db.find({"username": user})

                if user not in response:
                    db.insert_one(data)
                    result_val = db.find_one({"username": user})
                    result_val.pop("_id")
                    result_val.pop("password")
                    result_val.pop("is_authorized")
                    return {"data": result_val }
        except:
             return {
                 "error": {
                    "message": "could not insert user"
                }
            }

    # finds a specific user in the database and returns the username
    @staticmethod
    def find_username(user):
        """
        Initializes the db and finds document in the database that has 
        corresponding username

        :return: The username of the user.
        """
        db = database.initialize()
        try:
            response = db.find_one({"username": user}, {"username": 1})
            response.pop("_id")
            print(response)
            return {"data": response}
        except:
            return {
                "error": {
                    "code": 404,
                    "message": "Can't find user " + user
                }
            }

    # returns a user from the username
    @staticmethod
    def find_user(user):
        """
        Initializes the db and finds document in the database that has 
        corresponding username

        :return: The user's information.
        """

        db = database.initialize()
        try:
            user_data = database.check_user(user)

            if "error" in user_data:
                return user_data

            response = db.find_one({"username": user})

            response.pop("_id")
            response.pop("password")
            response.pop("is_authorized")

            return {"data": response}
        except:
            return {
                "error": {
                    "code": 404,
                    "message": "Can't find user " + user
                }
            }

    # updates a specifid document in the database
    @staticmethod
    def update(user, query, info):
        """
        Initializes the db and updates the information given on the database 


        :return: The user's information.
        """
        # (user is the username - str) (query what we want to change - str) (info - changed info)
        db = database.initialize()

        try:
            user_data = database.check_user(user)

            if "error" in user_data:
                return user_data

            for i, j in zip(query, info):
                db.update_one({"username": user}, {"$set": {i:j}}) 

                response = db.find_one({"username": user})
                response.pop("_id")
                response.pop("password")
                response.pop("is_authorized")

            return {"data": response}
        except:
            return {
                "error": {
                    "message": "could not update info"
                }
            }

    # adds a weight to the weight array of a user
    @staticmethod
    def adding_weight(user, new_weight):
        """
        Initializes the db and adds an element the users weight list with 
        the new weight and date information 

        :return: The user's information.
        """
        db = database.initialize()

        try:
            user_data = database.check_user(user)

            if "error" in user_data:
                return user_data

            db.update_one({"username": user},
                          {"$push": {"weight.history": new_weight}}
                          )

            response = db.find_one({"username": user}, {"weight.history": 1})
            response.pop("_id")

            return {"data": response}
        except:
            return {
                "error": {
                    "message": "could not find users weight"
                }
            }

    # gets a weight from the weight array of a user
    @staticmethod
    def getting_weight(user):
        """
        Initializes the db and finds the user with the corresponding username
        and gets that users weight information 

        :return: The user's information.
        """
        db = database.initialize()

        try:
            user_data = database.check_user(user)

            if "error" in user_data:
                return user_data

            response = db.find_one({"username": user}, {"weight.history": 1})
            response.pop("_id")
            return {"data": response}

        except:
            return {
                "error": {
                    "message": "could not find user"
                }
            }

    # gets calories of a user
    @staticmethod
    def getting_calories(user):
        """
        Initializes the db and finds the user with the corresponding username 
        and gets that users calories 

        :return: The user's information.
        """
        db = database.initialize()

        try:
            user_data = database.check_user(user)

            if "error" in user_data:
                return user_data

            response = db.find_one({"username": user}, {"calories": 1}) 

            response.pop("_id")

            return {"data": response}

        except:
            return {
                "error": {
                    "message": "could not find users calories"
                }
            }

    # updates a users calories (intake and outtake)
    @staticmethod
    def updating_calories(user, date, goal, input, output):
        """
        Initializes the db and updates the user's (with the matching username)
        calorie goal, input and output

        :return: The user's information.
        """
        db = database.initialize()

        try:
            user_data = database.check_user(user)

            if "error" in user_data:
                return user_data

            # update date
            db.update_one({"username": user},
                          {"$set": {"calories.date": date}}
                          )

            # update goal
            db.update_one({"username": user},
                          {"$set": {"calories.goal": goal}}
                          )

            # update input
            db.update_one({"username": user},
                          {"$set": {"calories.input": input}}
                          )

            # update output
            db.update_one({"username": user},
                          {"$set": {"calories.output": output}}
                          )

            response =  db.find_one({"username": user}, {"calories": 1}) 
            response.pop("_id")
            
            return {"data": response}

        except:
            return {
                "error": {
                    "message": "could not find users calories"
                }
            }

    # verifying users exists and is authorized


    @staticmethod
    def check_user(user):
        """
        Initializes the db and finds document in the database that has 
        corresponding username, once the user is found it checks is_authorized tag 
        and if they are not authorized then we give a message saying the user is not 
        logged in otherwise the user is logged in 

        :return: The user information.
        """
        db = database.initialize()

        try:
            response = db.find_one({"username": user})

            if response["is_authorized"] == False:
                return {
                    "error": {
                        "code": 401,
                        "message": user + " is not logged in."
                    }
                }
            else:
                response.pop("_id")
                return {"data": response}

        except:
            return {
                "error": {
                    "code": 404,
                    "message": "Can't find User: " + user
                }
            }
