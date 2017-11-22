magick mogrify -format png -path converted raw/*.jpg
magick mogrify -format png -path converted raw/*.JPG
find 'converted' -maxdepth 1 -name '*.png' | sort -n | awk 'BEGIN{ x=1 }{printf "mv \"%s\" \"converted/%d_bg.png\"\n", $0, x++ }' | bash
