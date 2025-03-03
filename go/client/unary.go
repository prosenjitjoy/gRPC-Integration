package main

import (
	"context"
	"log"
	"main/proto"
	"time"
)

func callSayHello(client proto.GreetServiceClient) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	res, err := client.SayHello(ctx, &proto.NoParam{})
	if err != nil {
		log.Fatal("could not greet:", err)
	}

	log.Printf("%s\n", res.Message)
}
