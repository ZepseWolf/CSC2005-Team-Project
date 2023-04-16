import datetime
import random
import json

#AI QIN
#AI QIN BACK TO YOU
    
list = []
def newEntry(date):
    temp = {}
    #temp.update({"id": 'createEventId()'})
    temp.update({"title":"Scope "+ (str)(random.randint(100000,999999))})
    temp.update({"start": date})
    return temp

date = datetime.date.today()
for i in range(90):
    list.append(newEntry(date.strftime("%Y-%m-%d")))
    list.append(newEntry(date.strftime("%Y-%m-%d")))
    list.append(newEntry(date.strftime("%Y-%m-%d")))
    list.append(newEntry(date.strftime("%Y-%m-%d")))
    date = date + datetime.timedelta(days=1)

print(json.dumps(list, indent=2))
