# CMake generated Testfile for 
# Source directory: /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/modules/cudev/test
# Build directory: /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudev/test
# 
# This file includes the relevant testing commands required for 
# testing this directory and lists subdirectories to be tested as well.
add_test(opencv_test_cudev "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/bin/opencv_test_cudev" "--gtest_output=xml:opencv_test_cudev.xml")
set_tests_properties(opencv_test_cudev PROPERTIES  LABELS "Main;opencv_cudev;Accuracy" WORKING_DIRECTORY "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/test-reports/accuracy")
