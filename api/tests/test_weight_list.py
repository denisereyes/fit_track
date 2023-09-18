from datetime import date
from models.WeightList import WeightList
from models.Weight import Weight

#in the process of redoing these 

def test_to_json(): 
    weight = WeightList(
        Weight(latest=65, total=0, weekly=0)
    )
    
    assert weight.to_json(history=False) == { 
		"latest": 65,
		"total": 0,
		"weekly": 0
    }

def test_from_json():
    weight = {
			"date": "05-13-2022",
			"kilograms": 45
	}
     
    assert Weight.from_json(weight) == WeightList(
        Weight(45, date(2022, 5, 13))
    )
       
def test_add():
    weight = WeightList[Weight[0]]
    assert weight.add(weight=100) == WeightList[Weight[0, 100]]

def test_total():
    weight = WeightList[Weight[120, 100]]
    assert weight.total() == 20 

def test_latest():
    weight = WeightList[weight[120, 100]]
    assert weight.latest() == 120

def test_week():
    weight = WeightList[weight[120, 100, 99, 98, 99]]
    assert weight.week() == 21

def test_get_statistics():
    history = {"history" : {"date" : "05-15-2022", "kilograms" : 54}}
    assert WeightList.get_statistics(history) == {"date" : "05", "kilograms" : 54}


    
        