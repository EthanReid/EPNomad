#this script changes to the name to num_fg.jpg This keep the file type a jpg
magick mogrify -format jpg -path converted raw/*.jpg
magick mogrify -format jpg -path converted raw/*.JPG
find 'converted' -maxdepth 1 -name '*.png' | sort -n | awk 'BEGIN{ x=1 }{printf "mv \"%s\" \"converted/%02d_bg.png\"\n", $0, x++ }' | bash

