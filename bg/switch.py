import cv2
import sys
import os

# 1: small
# 2: big

big_image = cv2.imread(sys.argv[2])
small_image = cv2.imread(sys.argv[1], -1)

l_img = big_image
s_img = small_image
height,width,channels = s_img.shape
l_img = cv2.resize(l_img, (width+1, height+1))

x_offset=0
y_offset=0

for c in range(0,3):
	l_img[y_offset:y_offset+s_img.shape[0], x_offset:x_offset+s_img.shape[1], c] = s_img[:,:,c] * (s_img[:,:,2]/255.0) +  l_img[y_offset:y_offset+s_img.shape[0], x_offset:x_offset+s_img.shape[1], c] * (1.0 - s_img[:,:,2]/255.0)

l_img = l_img[height-700:height, width-1200:width] # Crop from x, y, w, h -> 100, 200, 300, 400
height,width,channels = l_img.shape
l_img = cv2.resize(l_img, (width/2, height/2))

fname = 'output_' + sys.argv[1] + '_' + sys.argv[2] + '.png'
os.chdir('/home/ubuntu/nomad_server_but_refactored/bg/switchoutput')
cv2.imwrite(fname, l_img)
