from datetime import date
from models.Weight import Weight

def test_to_json(): 
    weight = Weight(
        date=date(2022, 5, 1),
        kilograms=54
    )
        
    assert weight.to_json() == {
        "date": "05-01-2022",
        "kilograms": 54,
    }

def test_from_json(): 
    weight = {
        "date": "05-01-2022",
        "kilograms": 54,
    }
    assert Weight.from_json(weight) == Weight(
        date=date(2022, 5, 1),
        kilograms=54
    )


        