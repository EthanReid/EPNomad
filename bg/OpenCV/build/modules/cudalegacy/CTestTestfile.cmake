# CMake generated Testfile for 
# Source directory: /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/modules/cudalegacy
# Build directory: /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudalegacy
# 
# This file includes the relevant testing commands required for 
# testing this directory and lists subdirectories to be tested as well.
add_test(opencv_test_cudalegacy "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/bin/opencv_test_cudalegacy" "--gtest_output=xml:opencv_test_cudalegacy.xml")
set_tests_properties(opencv_test_cudalegacy PROPERTIES  LABELS "Main;opencv_cudalegacy;Accuracy" WORKING_DIRECTORY "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/test-reports/accuracy")
add_test(opencv_perf_cudalegacy "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/bin/opencv_perf_cudalegacy" "--gtest_output=xml:opencv_perf_cudalegacy.xml")
set_tests_properties(opencv_perf_cudalegacy PROPERTIES  LABELS "Main;opencv_cudalegacy;Performance" WORKING_DIRECTORY "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/test-reports/performance")
add_test(opencv_sanity_cudalegacy "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/bin/opencv_perf_cudalegacy" "--gtest_output=xml:opencv_perf_cudalegacy.xml" "--perf_min_samples=1" "--perf_force_samples=1" "--perf_verify_sanity")
set_tests_properties(opencv_sanity_cudalegacy PROPERTIES  LABELS "Main;opencv_cudalegacy;Sanity" WORKING_DIRECTORY "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/test-reports/sanity")
