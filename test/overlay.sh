#!/bin/bash
for i in $(seq 1 12)
do
       magick convert ${i}_bg.png ${i}_fg.png -gravity center -composite -format jpg -quality 90 ${i}_out.jpg 
done
