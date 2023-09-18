from datetime import date
from common.utils import today, string_from_date, date_from_string


class Weight:
    def __init__(self, kilograms, date: date = today()):
        self.kilograms = kilograms
        self.date = date

    def to_json(self):
        """
        Turns a weight object into a dictionary.
        :return: A dictionary with the date and kilograms.
        """
        return {
            "date": string_from_date(self.date),
            "kilograms": self.kilograms,
        }

    def from_json(data):
        """
        It takes a dictionary, and returns a Weight object
        :return: A Weight object
        """
        kilograms = data["kilograms"]
        if "date" in data:
            date = date_from_string(data["date"])
            weight = Weight(kilograms, date)
        else:
            weight = Weight(kilograms)

        return weight

    def __eq__(self, other):
        if not isinstance(other, Weight):
            return False
        return self.kilograms == other.kilograms and self.date == other.date