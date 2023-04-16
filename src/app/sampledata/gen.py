import json
import random
import datetime

namel = ["Hibba Fraser", "Muneeb Booth","Clarke Mcintosh","Zakk Hilton","Sean Pace","Rudra Flores","Kelsie Forrest","Reema House","Afsana Logan","Beck Russo",]


def newEntry(month):
    temp = {}
    date = datetime.datetime(2021, month, random.randint(1,28))
    temp.update({"dateOfCollection": date.strftime("%Y-%m-%d")})
    temp.update({"accessionNo": "AER156843FR3454Z"})
    temp.update({"aerModel": "NEWAERMACHINE"})
    temp.update({"aerSerial": "9471684714"})
    temp.update({"collectedBy": namel[random.randint(0,9)]})
    temp.update({"circulatedBy": namel[random.randint(0,9)]})
    temp.update({"disinfectantUsed": "MAMALEMON" + (str)(random.randint(1000,9999))+"Z"})
    temp.update({"disinfectantLotNo": (str)(random.randint(1000000,9999999))})
    temp.update({"disinfectantChanged": (date - datetime.timedelta(days=random.randint(1,13))).strftime("%Y-%m-%d")})
    temp.update({"detergentUsed": "BSRSDZ" + (str)(random.randint(1000,9999))+"FR"})
    temp.update({"detergentLotNo": (str)(random.randint(1000000,9999999))})
    temp.update({"dateFilterChanged": (date - datetime.timedelta(days=random.randint(1,4))).strftime("%Y-%m-%d")})
    temp.update({"dateOfResult": date.strftime("%Y-%m-%d")})
    temp.update({"fluidResult": "CLEAR"})
    temp.update({"fluidAnalysis": "NIL"})
    temp.update({"fluidActions": "NIL"})
    temp.update({"quaratine": False})
    temp.update({"repeatDate": "NIL"})
    temp.update({"remarks": "NIL"})
    return temp

def newHistory():
    history = []
    for i in range(12):
        history.append(newEntry(i+1))
        
    return history
    
def newScope(date, id):
    temp = {}
    temp.update({"id": id})
    temp.update({"samplingDate": date})    
    temp.update({"status": "REGULAR"})    
    temp.update({"brand": "OLYMPUS"})
    temp.update({"modelNo": "BR"+(str)(random.randint(1000,9999))+"AF"})
    temp.update({"inShelf": trueFalse()})
    temp.update({"type": assignScope()})
    temp.update({"history": newHistory()})

    return temp
    
def trueFalse():
    if random.randint(0,9)%2:
        return True
    else:
        return False
    
def assignScope():
    rn = random.randint(0,9)
    if rn < 2:
        return "Scope A"
    elif rn < 4:
        return "Scope B"
    elif rn <6:
        return "Scope C"
    elif rn <8 :
        return "Scope D"
    else:
        return "Scope E"
        
output = {}
date = datetime.datetime(2022,1,1)

for i in range(100):
    for i in range(4):
        scopeid = random.randint(100000,999999)
        output.update({scopeid: newScope(date.strftime("%Y-%m-%d"), scopeid)})
    date = date + datetime.timedelta(days=1)
    
# print()


f = open("scopeData.json", "a")
f.write(json.dumps(output, indent=4))
f.close()