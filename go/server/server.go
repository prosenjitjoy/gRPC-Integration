package main

import (
	"log"
	"main/proto"
	"net"

	"google.golang.org/grpc"
)

type HelloServer struct {
	proto.GreetServiceServer
}

func main() {
	lis, err := net.Listen("tcp", ":5000")
	if err != nil {
		log.Fatalf("Failed to start the server %v", err)
	}
	grpcServer := grpc.NewServer()
	proto.RegisterGreetServiceServer(grpcServer, &HelloServer{})

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("Failed to start: %v", err)
	}

	log.Printf("server started at %v", lis.Addr())
}
