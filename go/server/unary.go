package main

import (
	"context"
	"main/proto"
)

func (hs *HelloServer) SayHello(ctx context.Context, req *proto.NoParam) (*proto.HelloResponse, error) {
	return &proto.HelloResponse{
		Message: "Hello TypeScript",
	}, nil
}
