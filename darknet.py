import os
from shutil import copyfile
import sys
from pymongo import MongoClient
from bson.objectid import ObjectId

project_id = str(sys.argv[1])
client = MongoClient()
db = client.nomad
project = db.projects.find_one({"_id": ObjectId(project_id) })
num_of_classes = len(project["models"])
# first switch backgrounds; do that later lel
# then generate train.txt & labels & class.txt
with open("darknet_user_files/projects/" + project_id + "/training_lists/train.txt", "w+") as train:
	train_content = ""
	with open("darknet_user_files/projects/" + project_id + "/class.txt", "w+") as class_file:
		class_content = ""
		class_id = 0
		label_num = 0
		for model in project["models"]:
			class_content += model["name"].strip(" ") + "\n"
			for i in xrange(0, len(model["datas"])):	
				# this moves the image to images
				copyfile("darknet_user_files/projects/" + project_id + "/models/" + model["name"].strip(" ") + "/" + model["datas"][i], "darknet_user_files/projects/" + project_id + "/images/" + str(label_num) + ".jpg")
				# writes training file
				train_content += "darknet_user_files/projects/" + project_id + "/images/" + str(label_num) + ".jpg\n"
				# generate label
				with open("darknet_user_files/projects/" + project_id + "/labels/" + str(label_num) + ".txt", "w+") as f:
					f.write(str(class_id) + " 0.5 0.5 0.5 0.5")
				label_num+=1

			class_id+=1
		class_file.write(class_content)
	train.write(train_content)

with open("darknet_user_files/projects/" + project_id + "/cfg/yolo.data", "w+") as yolo:
	d_classes = "classes=" + str(num_of_classes) + "\n"
	d_train = "train=darknet_user_files/projects/" + project_id + "/training_lists/train.txt\n"
	d_names = "names=darknet_user_files/projects/" + project_id + "/class.txt\n"
	d_backup = "backup=darknet_user_files/projects/" + project_id + "/weights\n"
	data = d_classes + d_train + d_names + d_backup
	yolo.write(data)

# generate yolo.cfg
project_id = sys.argv[1]
with open('./darknet_user_files/yolo.cfg', 'r') as file:
	data = file.readlines()

data[230-1] = 'classes=' + str(num_of_classes) + '\n'
data[224-1] = 'filters=' + str((num_of_classes + 4 + 1) * 5) + '\n' # (classes + coords(4) + 1) * num

with open('darknet_user_files/projects/' + project_id + '/cfg/yolo.cfg', 'w+') as file:
	file.writelines(data)

cmd = ("./darknet detector train "
	"./darknet_user_files/projects/" + project_id + "/cfg/yolo.data "
	"./darknet_user_files/projects/" + project_id + "/cfg/yolo.cfg "
	"./darknet_user_files/darknet.conv")

os.system(cmd)
db.projects.find_and_modify(query={'_id': ObjectId(project_id)}, update={"$set": {'in_training': False, 'trained': True }}, upsert=False)