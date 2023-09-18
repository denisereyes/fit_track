from models.Weight import Weight
from models.WeightList import WeightList
from models.Calories import Calories
from common import utils


class User():
    # Dynamically initialize User object based on arguments given
    def __init__(self, **kwargs):
        self.instance_vars = [
            "username",
            "password",
            "initial_weight",
            "birthday",
            "sex",
            "height",
            "activity_level",
            "desire",
            "is_metric",
            "weight",
            "calories",
            "is_authorized",
        ]
        for k in kwargs.items():
            if k in self.instance_vars:
                setattr(self, k, kwargs[k])  # == self.k = kwargs[k]

    @staticmethod
    def from_json(data, without=[]):
        """
        It takes a dictionary of data, and returns a User object
        with the data in the dictionary. Will leave out any keys in without.

        :return: A User object
        """
        user = User()
        for k in data:
            if k in user.instance_vars:
                if k == "weight" and "history" in data["weight"]:
                    history = data["weight"]["history"]
                    weightlist = WeightList.from_json(history)
                    setattr(user, k, weightlist)
                elif k == "calories":
                    calories_dict = data["calories"]
                    calories = Calories.from_json(calories_dict)
                    setattr(user, k, calories)
                else:
                    if k not in without:
                        setattr(user, k, data[k])

        return user

    def to_json(self, without=[]):
        """
        It takes a user object, and returns a dictionary with its data.
        Will leave out any keys in without.

        :return: A dictionary of the attributes of the object.
        """

        data = {}
        for attribute in dir(self):
            if not attribute.startswith("__"):

                if attribute == "calories":
                    data.update({"calories": self.calories.to_json()})

                elif attribute == "weight":
                    weight = self.weight.to_json(statistics=False)
                    data.update({"weight": weight})

                elif attribute in self.instance_vars:
                    if attribute not in without:
                        data[attribute] = getattr(self, attribute)

        return data

    def setup_account(self):
        """
        It sets up an initial user from the frontend to be sent to the db.
        :return: self
        """

        self.is_authorized = False

        age = utils.age_from_birthday(self.birthday)
        first_weight = Weight(self.initial_weight)
        self.weight = WeightList([first_weight])

        goal = Calories.calculate_goal(
            self.sex,
            age,
            self.initial_weight,
            self.height,
            self.activity_level,
            self.desire,
        )

        self.calories = Calories(goal)
     
        return self

    def __eq__(self, other):
        if not isinstance(other, User):
            return False
        return self.username == other.username and self.password == other.password and self.initial_weight == other.initial_weight and self.birthday == other.birthday and self.sex == other.sex

    def renew_calories(self) -> Calories:
        """
        If the date of the calories is not today, then calculate
        a new goal and set it as the calories.

        :return: The calories object.
        """

        # It's checking if the date of the calories is the same as today.
        if self.calories.date != utils.today():
            user_age = utils.age_from_birthday(self.birthday)
            user_weight = self.weight.latest()

            goal = Calories.calculate_goal(
                self.sex,
                user_age,
                user_weight,
                self.height,
                self.activity_level,
                self.desire,
            )

            new_calories = Calories(goal)
            self.calories = new_calories

        return self.calories
