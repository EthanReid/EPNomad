# CMake generated Testfile for 
# Source directory: /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/modules/cudawarping
# Build directory: /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping
# 
# This file includes the relevant testing commands required for 
# testing this directory and lists subdirectories to be tested as well.
add_test(opencv_test_cudawarping "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/bin/opencv_test_cudawarping" "--gtest_output=xml:opencv_test_cudawarping.xml")
set_tests_properties(opencv_test_cudawarping PROPERTIES  LABELS "Main;opencv_cudawarping;Accuracy" WORKING_DIRECTORY "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/test-reports/accuracy")
add_test(opencv_perf_cudawarping "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/bin/opencv_perf_cudawarping" "--gtest_output=xml:opencv_perf_cudawarping.xml")
set_tests_properties(opencv_perf_cudawarping PROPERTIES  LABELS "Main;opencv_cudawarping;Performance" WORKING_DIRECTORY "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/test-reports/performance")
add_test(opencv_sanity_cudawarping "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/bin/opencv_perf_cudawarping" "--gtest_output=xml:opencv_perf_cudawarping.xml" "--perf_min_samples=1" "--perf_force_samples=1" "--perf_verify_sanity")
set_tests_properties(opencv_sanity_cudawarping PROPERTIES  LABELS "Main;opencv_cudawarping;Sanity" WORKING_DIRECTORY "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/test-reports/sanity")
