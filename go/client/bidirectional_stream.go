package main

import (
	"context"
	"io"
	"log"
	"main/proto"
	"time"
)

func callSayHelloBidirectionalStreaming(client proto.GreetServiceClient, names *proto.NameList) {
	log.Println("Bidirectional streaming started")
	stream, err := client.SayHelloBidirectionalStreaming(context.Background())
	if err != nil {
		log.Fatal("could not send names:", err)
	}

	waitc := make(chan struct{})
	go func() {
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
		close(waitc)
	}()

	for _, name := range names.Names {
		req := &proto.HelloRequest{
			Name: name,
		}
		if err := stream.Send(req); err != nil {
			log.Fatal("error while sending:", err)
		}
		time.Sleep(2 * time.Second)
	}

	err = stream.CloseSend()
	if err != nil {
		log.Fatal("error while sending:", err)
	}

	<-waitc
	log.Println("Bidirectional streaming finished")
}
