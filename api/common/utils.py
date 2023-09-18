import hashlib
from datetime import date, datetime


def hash_from_string(password: str) -> str:
    return hashlib.sha256(password.encode('utf-8')).hexdigest()


def age_from_birthday(birthdate: str) -> int:
    # if string --> date
    if isinstance(birthdate, str):
        birthdate = date_from_string(birthdate)

    current = today()
    # Subtracting the current year from the birthday year.
    year = current.year - birthdate.year
    month = (current.month, current.day) < (birthdate.month, birthdate.day)
    age = year - month
    return age


def today(string: bool = False) -> date:
    if string:
        return date.today().strftime('%m-%d-%Y')

    return date.today()


def date_from_string(date: str) -> date:
    return datetime.strptime(date, '%m-%d-%Y').date()


def string_from_date(date: date) -> str:
    return date.strftime('%m-%d-%Y')


def format_weight(isMetric: bool, kilograms: float) -> float:
    if(isMetric):
        return kilograms

    return kilograms * 2.2


def formatHeight(isMetric: bool, meters: float) -> float:
    if(isMetric):
        return meters

    return meters * 3.28


def Data(children: dict) -> dict:
    body = {"data": children}
    return body


def remove_data_key(unformatted: dict) -> dict:
    data = unformatted["data"]
    return data
