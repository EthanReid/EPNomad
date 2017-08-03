# CMake generated Testfile for 
# Source directory: /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/modules/cudaoptflow
# Build directory: /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudaoptflow
# 
# This file includes the relevant testing commands required for 
# testing this directory and lists subdirectories to be tested as well.
add_test(opencv_test_cudaoptflow "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/bin/opencv_test_cudaoptflow" "--gtest_output=xml:opencv_test_cudaoptflow.xml")
set_tests_properties(opencv_test_cudaoptflow PROPERTIES  LABELS "Main;opencv_cudaoptflow;Accuracy" WORKING_DIRECTORY "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/test-reports/accuracy")
add_test(opencv_perf_cudaoptflow "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/bin/opencv_perf_cudaoptflow" "--gtest_output=xml:opencv_perf_cudaoptflow.xml")
set_tests_properties(opencv_perf_cudaoptflow PROPERTIES  LABELS "Main;opencv_cudaoptflow;Performance" WORKING_DIRECTORY "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/test-reports/performance")
add_test(opencv_sanity_cudaoptflow "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/bin/opencv_perf_cudaoptflow" "--gtest_output=xml:opencv_perf_cudaoptflow.xml" "--perf_min_samples=1" "--perf_force_samples=1" "--perf_verify_sanity")
set_tests_properties(opencv_sanity_cudaoptflow PROPERTIES  LABELS "Main;opencv_cudaoptflow;Sanity" WORKING_DIRECTORY "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/test-reports/sanity")
