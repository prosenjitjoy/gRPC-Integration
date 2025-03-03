tools:
	go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
	go install google.golang.org/protobuf/cmd/protoc-gen-go@latest

generate:
	protoc --go_out=. --go-grpc_out=. proto/*.proto

grpc-server:
	go run server/*.go

grpc-client:
	go run client/*.go