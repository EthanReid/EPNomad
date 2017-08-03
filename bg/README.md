# Generate Script

### How to use

To generate a ton of pictures:

1. Put x amount of backgrounds into `backgrounds/`. x determines how many pictures will be generated for each scraped image
2. Move the scraper `images/` over to this root directory or `bg/`
3. Finally, execute the script and watch as a shit ton of pictures is generated: `python generate.py`

These collection of scripts crop pictures and change their backgrounds.

transparent.cpp essentially changes the picture to a png as that allows for an alpha channel. After that, you can use switch.py to place the png ontop of another image.

Since transparent.cpp is in C++, you must compile it before running it: `g++ $(pkg-config --cflags --libs opencv) transparent.cpp` if that fails try `g++ transparent.cpp $(pkg-config --cflags --libs opencv)`. This will output a file called a.out which you can execute using `./a.out`

### Commands

`./a.out <input image> <output dest>`

`python switch.py <input image> <background image> <output dest>`
