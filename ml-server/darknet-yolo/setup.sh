#!/usr/bin/env bash

# update and upgrade
sudo apt-get update
sudo dpkg --configure -a
sudo apt-get upgrade -y

# install node.js
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 8.10.0

# install GraphicsMagick
sudo apt-get install -y graphicsmagick

mkdir epnomad
cd epnomad/

# install and compile darknet from scratch
git clone 'https://github.com/AlexeyAB/darknet'
cd darknet
make GPU=1 CUDNN=1