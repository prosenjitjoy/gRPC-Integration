package main

import (
	"log"
	"main/proto"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func main() {
	conn, err := grpc.NewClient(":5000", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatal("did not connect:", err)
	}
	defer conn.Close()

	client := proto.NewGreetServiceClient(conn)

	names := &proto.NameList{
		Names: []string{"John", "Alice", "Bob"},
	}

	callSayHello(client)
	callSayHelloServerStreaming(client, names)
	callSayHelloClientStreaming(client, names)
	callSayHelloBidirectionalStreaming(client, names)
}
