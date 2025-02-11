.DEFAULT_GOAL := run

generate:
	protoc --go_out=. --go-grpc_out=. proto/greet.proto

run: generate
	go run server/*.go