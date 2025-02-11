package main

import (
	"log"
	"main/proto"
	"time"
)

func (hs *HelloServer) SayHelloServerStreaming(req *proto.NameList, stream proto.GreetService_SayHelloServerStreamingServer) error {
	log.Printf("Got request with names: %v", req.Names)

	for _, name := range req.Names {
		res := &proto.HelloResponse{
			Message: "Hello " + name,
		}
		if err := stream.Send(res); err != nil {
			return err
		}
		time.Sleep(2 * time.Second)
	}

	return nil
}
