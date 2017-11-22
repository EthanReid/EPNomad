magick mogrify -format png -alpha remove -fuzz 10% -transparent white -path converted raw/*.jpg
magick mogrify -format png -alpha remove -fuzz 10% -transparent white  -path converted raw/*.JPG
find 'converted' -maxdepth 1 -name '*.png' | sort -n | awk 'BEGIN{ x=1 }{printf "mv \"%s\" \"converted/%d_fg.png\"\n", $0, x++ }' | bash
