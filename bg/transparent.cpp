#include <stdio.h>
#include <opencv2/opencv.hpp>
using namespace cv;

// g++ $(pkg-config --cflags --libs opencv) transparent.cpp

// 1: input
// 2: output
int main(int argc, char** argv ) {
	Mat src=imread(argv[1],1);
	Mat dst;
	Mat tmp,alpha;

	cvtColor(src,tmp,CV_BGR2GRAY);
	threshold(tmp,alpha,254,255,THRESH_BINARY_INV);

	Mat rgb[3];
	split(src,rgb);

	Mat rgba[4]={rgb[0],rgb[1],rgb[2],alpha};
	merge(rgba,4,dst);
	imwrite(argv[2],dst);

    return 0;
}