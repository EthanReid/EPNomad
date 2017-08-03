# CMake generated Testfile for 
# Source directory: /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/modules/cudabgsegm
# Build directory: /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudabgsegm
# 
# This file includes the relevant testing commands required for 
# testing this directory and lists subdirectories to be tested as well.
add_test(opencv_test_cudabgsegm "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/bin/opencv_test_cudabgsegm" "--gtest_output=xml:opencv_test_cudabgsegm.xml")
set_tests_properties(opencv_test_cudabgsegm PROPERTIES  LABELS "Main;opencv_cudabgsegm;Accuracy" WORKING_DIRECTORY "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/test-reports/accuracy")
add_test(opencv_perf_cudabgsegm "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/bin/opencv_perf_cudabgsegm" "--gtest_output=xml:opencv_perf_cudabgsegm.xml")
set_tests_properties(opencv_perf_cudabgsegm PROPERTIES  LABELS "Main;opencv_cudabgsegm;Performance" WORKING_DIRECTORY "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/test-reports/performance")
add_test(opencv_sanity_cudabgsegm "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/bin/opencv_perf_cudabgsegm" "--gtest_output=xml:opencv_perf_cudabgsegm.xml" "--perf_min_samples=1" "--perf_force_samples=1" "--perf_verify_sanity")
set_tests_properties(opencv_sanity_cudabgsegm PROPERTIES  LABELS "Main;opencv_cudabgsegm;Sanity" WORKING_DIRECTORY "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/test-reports/sanity")
