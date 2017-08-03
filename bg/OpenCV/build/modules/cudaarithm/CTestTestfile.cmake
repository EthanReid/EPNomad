# CMake generated Testfile for 
# Source directory: /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/modules/cudaarithm
# Build directory: /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudaarithm
# 
# This file includes the relevant testing commands required for 
# testing this directory and lists subdirectories to be tested as well.
add_test(opencv_test_cudaarithm "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/bin/opencv_test_cudaarithm" "--gtest_output=xml:opencv_test_cudaarithm.xml")
set_tests_properties(opencv_test_cudaarithm PROPERTIES  LABELS "Main;opencv_cudaarithm;Accuracy" WORKING_DIRECTORY "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/test-reports/accuracy")
add_test(opencv_perf_cudaarithm "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/bin/opencv_perf_cudaarithm" "--gtest_output=xml:opencv_perf_cudaarithm.xml")
set_tests_properties(opencv_perf_cudaarithm PROPERTIES  LABELS "Main;opencv_cudaarithm;Performance" WORKING_DIRECTORY "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/test-reports/performance")
add_test(opencv_sanity_cudaarithm "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/bin/opencv_perf_cudaarithm" "--gtest_output=xml:opencv_perf_cudaarithm.xml" "--perf_min_samples=1" "--perf_force_samples=1" "--perf_verify_sanity")
set_tests_properties(opencv_sanity_cudaarithm PROPERTIES  LABELS "Main;opencv_cudaarithm;Sanity" WORKING_DIRECTORY "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/test-reports/sanity")
