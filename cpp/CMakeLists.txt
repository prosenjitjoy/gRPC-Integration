cmake_minimum_required(VERSION 3.31)
project(cpp-client LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 26)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(Qt6 6.8 REQUIRED COMPONENTS Core Protobuf Grpc)

set(proto_files "${CMAKE_CURRENT_LIST_DIR}/proto/greet.proto")

qt_standard_project_setup()
qt_add_executable(cpp-client main.cpp)

qt_add_protobuf(cpp-client PROTO_FILES ${proto_files})
qt_add_grpc(cpp-client CLIENT PROTO_FILES ${proto_files})

target_link_libraries(cpp-client PRIVATE Qt::Core Qt::Protobuf Qt::Grpc)

include(GNUInstallDirs)
install(TARGETS cpp-client
    BUNDLE  DESTINATION .
    RUNTIME DESTINATION ${CMAKE_INSTALL_BINDIR}
    LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR}
)
