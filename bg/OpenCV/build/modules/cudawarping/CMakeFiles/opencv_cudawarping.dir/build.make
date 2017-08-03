# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.5

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:


#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:


# Remove some rules from gmake that .SUFFIXES does not remove.
SUFFIXES =

.SUFFIXES: .hpux_make_needs_suffix_list


# Suppress display of executed commands.
$(VERBOSE).SILENT:


# A target that is always out of date.
cmake_force:

.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E remove -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/ubuntu/nomad_server_but_refactored/bg/OpenCV

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build

# Include any dependencies generated for this target.
include modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/depend.make

# Include the progress variables for this target.
include modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/progress.make

# Include the compile flags for this target's objects.
include modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/flags.make

modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_pyr_up.cu.o: modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_pyr_up.cu.o.depend
modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_pyr_up.cu.o: modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_pyr_up.cu.o.cmake
modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_pyr_up.cu.o: ../modules/cudawarping/src/cuda/pyr_up.cu
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --blue --bold --progress-dir=/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building NVCC (Device) object modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_pyr_up.cu.o"
	cd /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda && /usr/bin/cmake -E make_directory /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/.
	cd /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda && /usr/bin/cmake -D verbose:BOOL=$(VERBOSE) -D build_configuration:STRING=Release -D generated_file:STRING=/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/./cuda_compile_generated_pyr_up.cu.o -D generated_cubin_file:STRING=/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/./cuda_compile_generated_pyr_up.cu.o.cubin.txt -P /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_pyr_up.cu.o.cmake

modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_remap.cu.o: modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_remap.cu.o.depend
modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_remap.cu.o: modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_remap.cu.o.cmake
modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_remap.cu.o: ../modules/cudawarping/src/cuda/remap.cu
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --blue --bold --progress-dir=/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Building NVCC (Device) object modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_remap.cu.o"
	cd /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda && /usr/bin/cmake -E make_directory /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/.
	cd /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda && /usr/bin/cmake -D verbose:BOOL=$(VERBOSE) -D build_configuration:STRING=Release -D generated_file:STRING=/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/./cuda_compile_generated_remap.cu.o -D generated_cubin_file:STRING=/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/./cuda_compile_generated_remap.cu.o.cubin.txt -P /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_remap.cu.o.cmake

modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_pyr_down.cu.o: modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_pyr_down.cu.o.depend
modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_pyr_down.cu.o: modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_pyr_down.cu.o.cmake
modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_pyr_down.cu.o: ../modules/cudawarping/src/cuda/pyr_down.cu
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --blue --bold --progress-dir=/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_3) "Building NVCC (Device) object modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_pyr_down.cu.o"
	cd /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda && /usr/bin/cmake -E make_directory /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/.
	cd /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda && /usr/bin/cmake -D verbose:BOOL=$(VERBOSE) -D build_configuration:STRING=Release -D generated_file:STRING=/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/./cuda_compile_generated_pyr_down.cu.o -D generated_cubin_file:STRING=/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/./cuda_compile_generated_pyr_down.cu.o.cubin.txt -P /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_pyr_down.cu.o.cmake

modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_resize.cu.o: modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_resize.cu.o.depend
modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_resize.cu.o: modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_resize.cu.o.cmake
modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_resize.cu.o: ../modules/cudawarping/src/cuda/resize.cu
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --blue --bold --progress-dir=/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_4) "Building NVCC (Device) object modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_resize.cu.o"
	cd /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda && /usr/bin/cmake -E make_directory /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/.
	cd /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda && /usr/bin/cmake -D verbose:BOOL=$(VERBOSE) -D build_configuration:STRING=Release -D generated_file:STRING=/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/./cuda_compile_generated_resize.cu.o -D generated_cubin_file:STRING=/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/./cuda_compile_generated_resize.cu.o.cubin.txt -P /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_resize.cu.o.cmake

modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_warp.cu.o: modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_warp.cu.o.depend
modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_warp.cu.o: modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_warp.cu.o.cmake
modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_warp.cu.o: ../modules/cudawarping/src/cuda/warp.cu
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --blue --bold --progress-dir=/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_5) "Building NVCC (Device) object modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_warp.cu.o"
	cd /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda && /usr/bin/cmake -E make_directory /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/.
	cd /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda && /usr/bin/cmake -D verbose:BOOL=$(VERBOSE) -D build_configuration:STRING=Release -D generated_file:STRING=/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/./cuda_compile_generated_warp.cu.o -D generated_cubin_file:STRING=/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/./cuda_compile_generated_warp.cu.o.cubin.txt -P /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_warp.cu.o.cmake

modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/warp.cpp.o: modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/flags.make
modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/warp.cpp.o: ../modules/cudawarping/src/warp.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_6) "Building CXX object modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/warp.cpp.o"
	cd /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping && /usr/bin/c++   $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/opencv_cudawarping.dir/src/warp.cpp.o -c /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/modules/cudawarping/src/warp.cpp

modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/warp.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/opencv_cudawarping.dir/src/warp.cpp.i"
	cd /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping && /usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/modules/cudawarping/src/warp.cpp > CMakeFiles/opencv_cudawarping.dir/src/warp.cpp.i

modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/warp.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/opencv_cudawarping.dir/src/warp.cpp.s"
	cd /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping && /usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/modules/cudawarping/src/warp.cpp -o CMakeFiles/opencv_cudawarping.dir/src/warp.cpp.s

modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/warp.cpp.o.requires:

.PHONY : modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/warp.cpp.o.requires

modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/warp.cpp.o.provides: modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/warp.cpp.o.requires
	$(MAKE) -f modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/build.make modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/warp.cpp.o.provides.build
.PHONY : modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/warp.cpp.o.provides

modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/warp.cpp.o.provides.build: modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/warp.cpp.o


modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/remap.cpp.o: modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/flags.make
modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/remap.cpp.o: ../modules/cudawarping/src/remap.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_7) "Building CXX object modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/remap.cpp.o"
	cd /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping && /usr/bin/c++   $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/opencv_cudawarping.dir/src/remap.cpp.o -c /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/modules/cudawarping/src/remap.cpp

modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/remap.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/opencv_cudawarping.dir/src/remap.cpp.i"
	cd /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping && /usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/modules/cudawarping/src/remap.cpp > CMakeFiles/opencv_cudawarping.dir/src/remap.cpp.i

modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/remap.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/opencv_cudawarping.dir/src/remap.cpp.s"
	cd /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping && /usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/modules/cudawarping/src/remap.cpp -o CMakeFiles/opencv_cudawarping.dir/src/remap.cpp.s

modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/remap.cpp.o.requires:

.PHONY : modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/remap.cpp.o.requires

modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/remap.cpp.o.provides: modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/remap.cpp.o.requires
	$(MAKE) -f modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/build.make modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/remap.cpp.o.provides.build
.PHONY : modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/remap.cpp.o.provides

modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/remap.cpp.o.provides.build: modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/remap.cpp.o


modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/resize.cpp.o: modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/flags.make
modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/resize.cpp.o: ../modules/cudawarping/src/resize.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_8) "Building CXX object modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/resize.cpp.o"
	cd /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping && /usr/bin/c++   $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/opencv_cudawarping.dir/src/resize.cpp.o -c /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/modules/cudawarping/src/resize.cpp

modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/resize.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/opencv_cudawarping.dir/src/resize.cpp.i"
	cd /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping && /usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/modules/cudawarping/src/resize.cpp > CMakeFiles/opencv_cudawarping.dir/src/resize.cpp.i

modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/resize.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/opencv_cudawarping.dir/src/resize.cpp.s"
	cd /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping && /usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/modules/cudawarping/src/resize.cpp -o CMakeFiles/opencv_cudawarping.dir/src/resize.cpp.s

modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/resize.cpp.o.requires:

.PHONY : modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/resize.cpp.o.requires

modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/resize.cpp.o.provides: modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/resize.cpp.o.requires
	$(MAKE) -f modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/build.make modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/resize.cpp.o.provides.build
.PHONY : modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/resize.cpp.o.provides

modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/resize.cpp.o.provides.build: modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/resize.cpp.o


modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/pyramids.cpp.o: modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/flags.make
modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/pyramids.cpp.o: ../modules/cudawarping/src/pyramids.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_9) "Building CXX object modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/pyramids.cpp.o"
	cd /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping && /usr/bin/c++   $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/opencv_cudawarping.dir/src/pyramids.cpp.o -c /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/modules/cudawarping/src/pyramids.cpp

modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/pyramids.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/opencv_cudawarping.dir/src/pyramids.cpp.i"
	cd /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping && /usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/modules/cudawarping/src/pyramids.cpp > CMakeFiles/opencv_cudawarping.dir/src/pyramids.cpp.i

modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/pyramids.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/opencv_cudawarping.dir/src/pyramids.cpp.s"
	cd /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping && /usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/modules/cudawarping/src/pyramids.cpp -o CMakeFiles/opencv_cudawarping.dir/src/pyramids.cpp.s

modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/pyramids.cpp.o.requires:

.PHONY : modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/pyramids.cpp.o.requires

modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/pyramids.cpp.o.provides: modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/pyramids.cpp.o.requires
	$(MAKE) -f modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/build.make modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/pyramids.cpp.o.provides.build
.PHONY : modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/pyramids.cpp.o.provides

modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/pyramids.cpp.o.provides.build: modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/pyramids.cpp.o


# Object files for target opencv_cudawarping
opencv_cudawarping_OBJECTS = \
"CMakeFiles/opencv_cudawarping.dir/src/warp.cpp.o" \
"CMakeFiles/opencv_cudawarping.dir/src/remap.cpp.o" \
"CMakeFiles/opencv_cudawarping.dir/src/resize.cpp.o" \
"CMakeFiles/opencv_cudawarping.dir/src/pyramids.cpp.o"

# External object files for target opencv_cudawarping
opencv_cudawarping_EXTERNAL_OBJECTS = \
"/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_pyr_up.cu.o" \
"/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_remap.cu.o" \
"/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_pyr_down.cu.o" \
"/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_resize.cu.o" \
"/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_warp.cu.o"

lib/libopencv_cudawarping.so.3.2.0: modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/warp.cpp.o
lib/libopencv_cudawarping.so.3.2.0: modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/remap.cpp.o
lib/libopencv_cudawarping.so.3.2.0: modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/resize.cpp.o
lib/libopencv_cudawarping.so.3.2.0: modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/pyramids.cpp.o
lib/libopencv_cudawarping.so.3.2.0: modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_pyr_up.cu.o
lib/libopencv_cudawarping.so.3.2.0: modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_remap.cu.o
lib/libopencv_cudawarping.so.3.2.0: modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_pyr_down.cu.o
lib/libopencv_cudawarping.so.3.2.0: modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_resize.cu.o
lib/libopencv_cudawarping.so.3.2.0: modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_warp.cu.o
lib/libopencv_cudawarping.so.3.2.0: modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/build.make
lib/libopencv_cudawarping.so.3.2.0: lib/libopencv_imgproc.so.3.2.0
lib/libopencv_cudawarping.so.3.2.0: /usr/lib/x86_64-linux-gnu/libGLU.so
lib/libopencv_cudawarping.so.3.2.0: /usr/lib/x86_64-linux-gnu/libGL.so
lib/libopencv_cudawarping.so.3.2.0: /usr/lib/x86_64-linux-gnu/libtbb.so
lib/libopencv_cudawarping.so.3.2.0: 3rdparty/ippicv/ippicv_lnx/lib/intel64/libippicv.a
lib/libopencv_cudawarping.so.3.2.0: lib/libopencv_core.so.3.2.0
lib/libopencv_cudawarping.so.3.2.0: lib/libopencv_cudev.so.3.2.0
lib/libopencv_cudawarping.so.3.2.0: modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_10) "Linking CXX shared library ../../lib/libopencv_cudawarping.so"
	cd /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/opencv_cudawarping.dir/link.txt --verbose=$(VERBOSE)
	cd /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping && $(CMAKE_COMMAND) -E cmake_symlink_library ../../lib/libopencv_cudawarping.so.3.2.0 ../../lib/libopencv_cudawarping.so.3.2 ../../lib/libopencv_cudawarping.so

lib/libopencv_cudawarping.so.3.2: lib/libopencv_cudawarping.so.3.2.0
	@$(CMAKE_COMMAND) -E touch_nocreate lib/libopencv_cudawarping.so.3.2

lib/libopencv_cudawarping.so: lib/libopencv_cudawarping.so.3.2.0
	@$(CMAKE_COMMAND) -E touch_nocreate lib/libopencv_cudawarping.so

# Rule to build all files generated by this target.
modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/build: lib/libopencv_cudawarping.so

.PHONY : modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/build

modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/requires: modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/warp.cpp.o.requires
modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/requires: modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/remap.cpp.o.requires
modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/requires: modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/resize.cpp.o.requires
modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/requires: modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/src/pyramids.cpp.o.requires

.PHONY : modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/requires

modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/clean:
	cd /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping && $(CMAKE_COMMAND) -P CMakeFiles/opencv_cudawarping.dir/cmake_clean.cmake
.PHONY : modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/clean

modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/depend: modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_pyr_up.cu.o
modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/depend: modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_remap.cu.o
modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/depend: modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_pyr_down.cu.o
modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/depend: modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_resize.cu.o
modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/depend: modules/cudawarping/CMakeFiles/cuda_compile.dir/src/cuda/cuda_compile_generated_warp.cu.o
	cd /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/ubuntu/nomad_server_but_refactored/bg/OpenCV /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/modules/cudawarping /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping /home/ubuntu/nomad_server_but_refactored/bg/OpenCV/build/modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : modules/cudawarping/CMakeFiles/opencv_cudawarping.dir/depend
