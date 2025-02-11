package main

import (
	"io"
	"log"
	"main/proto"
)

func (hs *HelloServer) SayHelloBidirectionalStreaming(stream proto.GreetService_SayHelloBidirectionalStreamingServer) error {
	for {
		req, err := stream.Recv()
		if err == io.EOF {
			return nil
		}
		if err != nil {
			return err
		}

		log.Println("Got request with name:", req.Name)

		res := &proto.HelloResponse{
			Message: "Hello " + req.Name,
		}
		if err := stream.Send(res); err != nil {
			return err
		}
	}
}
