# CMake generated Testfile for 
# Source directory: /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/modules/cudafeatures2d
# Build directory: /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudafeatures2d
# 
# This file includes the relevant testing commands required for 
# testing this directory and lists subdirectories to be tested as well.
add_test(opencv_test_cudafeatures2d "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/bin/opencv_test_cudafeatures2d" "--gtest_output=xml:opencv_test_cudafeatures2d.xml")
set_tests_properties(opencv_test_cudafeatures2d PROPERTIES  LABELS "Main;opencv_cudafeatures2d;Accuracy" WORKING_DIRECTORY "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/test-reports/accuracy")
add_test(opencv_perf_cudafeatures2d "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/bin/opencv_perf_cudafeatures2d" "--gtest_output=xml:opencv_perf_cudafeatures2d.xml")
set_tests_properties(opencv_perf_cudafeatures2d PROPERTIES  LABELS "Main;opencv_cudafeatures2d;Performance" WORKING_DIRECTORY "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/test-reports/performance")
add_test(opencv_sanity_cudafeatures2d "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/bin/opencv_perf_cudafeatures2d" "--gtest_output=xml:opencv_perf_cudafeatures2d.xml" "--perf_min_samples=1" "--perf_force_samples=1" "--perf_verify_sanity")
set_tests_properties(opencv_sanity_cudafeatures2d PROPERTIES  LABELS "Main;opencv_cudafeatures2d;Sanity" WORKING_DIRECTORY "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/test-reports/sanity")
