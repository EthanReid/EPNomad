#!/bin/bash
Bac=Background/converted
Pro=product/converted
Over=overlayed
productNum=$(ls -lR $Pro/*.png | wc -l)
bacNum=$(ls -lR $Bac/*.png | wc -l)
echo $productNum product images
echo $bacNum background images
for nF in $(seq 1 $productNum)
do
	for nB in $(seq 1 $bacNum)
	do
		for pS in $(seq 1 3)
		do
#     	magick convert -resize 50% $Pro/${nF}_fg.png $Pro/${nF}_${pS}_fg.png
	echo resizing $Pro/${nF}_fg.png
	magick convert -resize 5% $Pro/${nF}_fg.png $Over/${nF}_${nB}_${pS}_out.png
#	magick convert $Bac/${nB}_bg.png $Pro/${nF}_${pS}_fg.png -gravity center -composite -format jpg -quality 90 $Over/${nF}_${nB}_${pS}_out.jpg
	echo $Over/${nF}_${nB}_${pS}_out.jpg
		done
	let "nB+=1"
	done

let "nF+=1"
done
