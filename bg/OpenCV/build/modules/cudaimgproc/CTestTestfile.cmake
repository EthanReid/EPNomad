# CMake generated Testfile for 
# Source directory: /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/modules/cudaimgproc
# Build directory: /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudaimgproc
# 
# This file includes the relevant testing commands required for 
# testing this directory and lists subdirectories to be tested as well.
add_test(opencv_test_cudaimgproc "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/bin/opencv_test_cudaimgproc" "--gtest_output=xml:opencv_test_cudaimgproc.xml")
set_tests_properties(opencv_test_cudaimgproc PROPERTIES  LABELS "Main;opencv_cudaimgproc;Accuracy" WORKING_DIRECTORY "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/test-reports/accuracy")
add_test(opencv_perf_cudaimgproc "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/bin/opencv_perf_cudaimgproc" "--gtest_output=xml:opencv_perf_cudaimgproc.xml")
set_tests_properties(opencv_perf_cudaimgproc PROPERTIES  LABELS "Main;opencv_cudaimgproc;Performance" WORKING_DIRECTORY "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/test-reports/performance")
add_test(opencv_sanity_cudaimgproc "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/bin/opencv_perf_cudaimgproc" "--gtest_output=xml:opencv_perf_cudaimgproc.xml" "--perf_min_samples=1" "--perf_force_samples=1" "--perf_verify_sanity")
set_tests_properties(opencv_sanity_cudaimgproc PROPERTIES  LABELS "Main;opencv_cudaimgproc;Sanity" WORKING_DIRECTORY "/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/test-reports/sanity")
