from datetime import date
from common.utils import today, string_from_date, date_from_string


class Calories():

    def __init__(self, goal, input=0, output=0, date: date = today()):
        self.date = date
        self.goal = goal
        self.input = input
        self.output = output

    def to_json(self) -> dict:
        """
        It takes a date, a goal, an input, and an output, and returns a
        JSON object with those values

        :return: A dictionary with the date, goal, input, and output.
        """
        return {
            "date": string_from_date(self.date),
            "goal": self.goal,
            "input": self.input,
            "output": self.output
        }

    @staticmethod
    def from_json(data: dict):
        """
        It takes a dictionary of data, and returns a Calories object
        :return: Calories object
        """
        return Calories(
            date=date_from_string(data['date']),
            goal=data['goal'],
            input=data['input'],
            output=data['output']
        )

    def update(self, amount: int) -> None:
        """
        The function takes in an amount, and adds that amount to the goal,
        if the amount is positive, it adds it to the input,
        and if the amount is negative, it adds it to the output.
        """
        self.goal += -amount
        if amount > 0:
            self.input += abs(amount)

        if amount < 0:
            self.output += abs(amount)

    def __eq__(self, other):
        if not isinstance(other, Calories):
            return False
        return self.date == other.date and self.goal == other.goal and self.input == other.input and self.output == other.output
    
    def calculate_goal(sex: str, age: int, kilograms: float, meters: float,
                       activity_level: int, goal: int) -> int:
        """
        Calculate the goal calories for a user based on
        their sex, age, weight, height, activity level, and goal.

        :return: the calculated daily calorie goal.
        """

        bmr = _calculate_BMR(sex, age, kilograms, meters)
        amr = _calculate_AMR(bmr, activity_level)

        if goal == -1:
            return int(amr - 500)
        if goal == 0:
            return int(amr)
        if goal == 1:
            return int(amr + 500)


def _calculate_AMR(bmr: float, activity_level: int) -> float:
    """
    Calculate the users Active Metabolic Rate using
    their bmr and activity level

    :return: the BMR
    """
    if activity_level == -1:
        return bmr * 1.2
    if activity_level == 0:
        return bmr * 1.55
    if activity_level == 1:
        return bmr * 1.9


def _calculate_BMR(sex: str, age: int,
                   kilograms: float, meters: float) -> float:
    """
    It calculates the Basal Metabolic Rate (BMR) of a person
    based on their sex, age, weight, and height
    :return: The BMR.
    """

    if sex == 'm':
        p1 = (13.75 * kilograms)
        p2 = (5.003 * (meters*100.0))
        p3 = (6.755 * age)
        return 66.47 + p1 + p2 - p3

    elif sex == 'f':
        p1 = (9.563 * kilograms)
        p2 = (1.850 * (meters*100.0))
        p3 = (4.676 * age)
        return 655.1 + p1 + p2 - p3
