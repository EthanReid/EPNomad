#!/bin/bash
Bac=Background/converted
Pro=product/raw
Over=overlayed
productNum=$(ls -lR $Pro/*.png | wc -l)
bacNum=$(ls -lR $Bac/*.png | wc -l)
#       magick convert -resize 50% $Pro/${nF}_fg.png $Pro/${nF}_${pS}_fg.png
        echo resizing $Pro/1_fg.png
        magick convert $Pro/1_fg.jpg -resize 100x100 -quality 100 $Over/test1_1_1_out.png
#       magick convert $Bac/${nB}_bg.png $Pro/${nF}_${pS}_fg.png -gravity center -composite -format jpg$
        



