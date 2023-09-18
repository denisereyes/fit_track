import common.utils
from datetime import date, datetime

def test_hash_from_string():
    password = "hello"
    assert common.utils.hash_from_string(
    password) == "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"

def test_age_from_birthday():
    birthday = "04-30-2000"
    assert common.utils.age_from_birthday(birthday) == 22

def test_today():
    assert common.utils.today(string=True) == '05-13-2022'  

def test_date_from_string():
    assert common.utils.date_from_string("05-01-2022") == date(2022, 5, 1) 

def test_string_from_datetime():
    assert common.utils.string_from_date(date(2022, 5, 1)) == "05-01-2022"

def test_formatHeight():
    assert common.utils.formatHeight(isMetric=True, meters=34) == 34

def test_format_weight():
    assert common.utils.format_weight(isMetric=False, kilograms=54) == 118.80000000000001

