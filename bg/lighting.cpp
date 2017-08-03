#include <cv.h>
#include <highgui.h>
#include <iostream>

using namespace cv;

int main(int argc, char** argv)	
{
	double alpha = atof(argv[3]);
	int beta = atoi(argv[4]);
	Mat image = imread(argv[1]);	
	
	Mat after = Mat::zeros( image.size(), image.type() );
	
	for( int y = 0; y < image.rows; y++ ) {
		for( int x = 0; x < image.cols; x++ ) {
			for( int c = 0; c < 3; c++ ) {
					after.at<Vec3b>(y,x)[c] =
					saturate_cast<uchar>( alpha*( image.at<Vec3b>(y,x)[c] ) + beta );
			}
		}
	}

	std::string dest = argv[2];
	imwrite(dest + ".jpg", after );

	return 0;
}