from datetime import timedelta
from models.Weight import Weight
from common.utils import today, date_from_string


class WeightList():

    def __init__(self, list=[Weight]):
        self.list = list

    def to_json(self, history=True, statistics=True):
        """
        It takes a list of Weight objects, and returns a dictionary with the
        total, weekly, and latest weight, and a list of dictionaries with the
        history of the weights. Setting history or statistics to false will
        exclude them from the json.

        :return: A dictionary with keys: total, weekly, latest, and history.
        """

        weight_json = {}
        if statistics:
            weight_json['total'] = self.total()
            weight_json['weekly'] = self.week()
            weight_json['latest'] = self.latest()

        if history:
            # Add the rest of the data
            weight_json["history"] = []

            for weight in self.list:
                weight_json["history"].append(weight.to_json())

        return weight_json
    @staticmethod
    def from_json(history: dict):
        """
        It takes a list of weight dictionaries, and returns a WeightList object
        :return: A WeightList object
        """
        list = []
        for weight in range(len(history)):
            date= date_from_string(history[weight]["date"])
            new_weight = Weight(history[weight]["kilograms"], date)
            list.append(new_weight)
        return WeightList(list)

    def add(self, weight: Weight) -> None:
        """Add a weight to the list of weights."""
        self.list.append(weight)

    def total(self) -> float:
        """
        If there are less than two entries, return 0. Otherwise, return the
        difference between the latestand oldest entries.

        :return: Total weight change
        """
        # Only initial weight recorded
        if len(self.list) < 2:
            return 0

        oldest_entry = self.list[-1].kilograms
        latest_entry = self.list[0].kilograms

        total = latest_entry - oldest_entry
        return round(total, 2)

    def latest(self) -> float:
        """
        It returns the latest weight in kilograms.
        :return: The latest weight in kilograms.
        """
        weight = self.list[0].kilograms
        return round(weight, 2)

    def week(self) -> float:
        """
        If there are less than two entries, return 0. Otherwise, return
        the difference between the latest entry and the oldest
        entry from the last week.

        :return: Weight change for the past week
        """

        # Only initial weight recorded
        if len(self.list) < 2:
            return 0

        oldest_entry = None
        latest_entry = self.list[0].kilograms
        week_ago = today() - timedelta(days=-7)

        i = 0
        while i < len(self.list):
            weight: Weight = self.list[i]
            oldest_entry = weight.kilograms

            if weight.date >= week_ago:
                return oldest_entry or 0

            i += 1

        total = latest_entry - oldest_entry
        return round(total, 2)

    @staticmethod
    def get_statistics(weight: dict) -> dict:
        """
        Given a dictionary of weight history, return a dictionary of statistics
        :return: A dictionary with the statistics from the weight history.
        """
        history = weight["history"]
        list = WeightList.from_json(history)
        return list.to_json(history=False)

    def __eq__(self, other):
        if not isinstance(other, WeightList):
            return False
        return self.list == other.list
