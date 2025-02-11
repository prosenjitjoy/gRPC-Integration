package main

import (
	"io"
	"log"
	"main/proto"
)

func (hs *HelloServer) SayHelloClientStreaming(stream proto.GreetService_SayHelloClientStreamingServer) error {
	var messages []string
	for {
		req, err := stream.Recv()
		if err == io.EOF {
			return stream.SendAndClose(&proto.MessageList{
				Messages: messages,
			})
		}
		if err != nil {
			return err
		}
		log.Println("Got request with name:", req.Name)
		messages = append(messages, "Hello "+req.Name)
	}
}
