package main

import (
	"context"
	"io"
	"log"
	"main/proto"
)

func callSayHelloServerStream(client proto.GreetServiceClient, names *proto.NameList) {
	log.Println("Streaming started")

	stream, err := client.SayHelloServerStreaming(context.Background(), names)
	if err != nil {
		log.Fatal("could not send names:", err)
	}

	for {
		message, err := stream.Recv()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatal("error while streaming:", err)
		}

		log.Println(message)
	}

	log.Println("Streaming finished")
}
