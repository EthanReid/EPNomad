# CMake generated Testfile for 
# Source directory: /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/modules/cudaobjdetect
# Build directory: /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudaobjdetect
# 
# This file includes the relevant testing commands required for 
# testing this directory and lists subdirectories to be tested as well.
add_test(opencv_test_cudaobjdetect "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/bin/opencv_test_cudaobjdetect" "--gtest_output=xml:opencv_test_cudaobjdetect.xml")
set_tests_properties(opencv_test_cudaobjdetect PROPERTIES  LABELS "Main;opencv_cudaobjdetect;Accuracy" WORKING_DIRECTORY "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/test-reports/accuracy")
add_test(opencv_perf_cudaobjdetect "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/bin/opencv_perf_cudaobjdetect" "--gtest_output=xml:opencv_perf_cudaobjdetect.xml")
set_tests_properties(opencv_perf_cudaobjdetect PROPERTIES  LABELS "Main;opencv_cudaobjdetect;Performance" WORKING_DIRECTORY "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/test-reports/performance")
add_test(opencv_sanity_cudaobjdetect "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/bin/opencv_perf_cudaobjdetect" "--gtest_output=xml:opencv_perf_cudaobjdetect.xml" "--perf_min_samples=1" "--perf_force_samples=1" "--perf_verify_sanity")
set_tests_properties(opencv_sanity_cudaobjdetect PROPERTIES  LABELS "Main;opencv_cudaobjdetect;Sanity" WORKING_DIRECTORY "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/test-reports/sanity")
