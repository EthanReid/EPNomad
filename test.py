import time
import sys
from pymongo import MongoClient
from bson.objectid import ObjectId

project_id = str(sys.argv[1])
client = MongoClient()
db = client.nomad

for i in range(0, 15):
	print i
	time.sleep(1)

db.projects.find_and_modify(query={'_id': ObjectId(project_id)}, update={"$set": {'in_training': False, 'trained': True }}, upsert=False)