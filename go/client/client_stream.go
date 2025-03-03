package main

import (
	"context"
	"log"
	"main/proto"
	"time"
)

func callSayHelloClientStreaming(client proto.GreetServiceClient, names *proto.NameList) {
	log.Println("Client streaming started")

	stream, err := client.SayHelloClientStreaming(context.Background())
	if err != nil {
		log.Fatal("could not send names:", err)
	}

	for _, name := range names.Names {
		req := &proto.HelloRequest{
			Name: name,
		}
		if err := stream.Send(req); err != nil {
			log.Fatal("error while sending:", err)
		}
		log.Println("Send request with name:", name)
		time.Sleep(2 * time.Second)
	}

	res, err := stream.CloseAndRecv()
	if err != nil {
		log.Fatal("error while receiving:", err)
	}

	log.Println("Streaming finished")
	log.Println(res.Messages)
}
