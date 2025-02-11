// Original file: src/proto/greet.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { HelloRequest as _greet_service_HelloRequest, HelloRequest__Output as _greet_service_HelloRequest__Output } from '../greet_service/HelloRequest';
import type { HelloResponse as _greet_service_HelloResponse, HelloResponse__Output as _greet_service_HelloResponse__Output } from '../greet_service/HelloResponse';
import type { MessageList as _greet_service_MessageList, MessageList__Output as _greet_service_MessageList__Output } from '../greet_service/MessageList';
import type { NameList as _greet_service_NameList, NameList__Output as _greet_service_NameList__Output } from '../greet_service/NameList';
import type { NoParam as _greet_service_NoParam, NoParam__Output as _greet_service_NoParam__Output } from '../greet_service/NoParam';

export interface GreetServiceClient extends grpc.Client {
  SayHello(argument: _greet_service_NoParam, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_greet_service_HelloResponse__Output>): grpc.ClientUnaryCall;
  SayHello(argument: _greet_service_NoParam, metadata: grpc.Metadata, callback: grpc.requestCallback<_greet_service_HelloResponse__Output>): grpc.ClientUnaryCall;
  SayHello(argument: _greet_service_NoParam, options: grpc.CallOptions, callback: grpc.requestCallback<_greet_service_HelloResponse__Output>): grpc.ClientUnaryCall;
  SayHello(argument: _greet_service_NoParam, callback: grpc.requestCallback<_greet_service_HelloResponse__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _greet_service_NoParam, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_greet_service_HelloResponse__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _greet_service_NoParam, metadata: grpc.Metadata, callback: grpc.requestCallback<_greet_service_HelloResponse__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _greet_service_NoParam, options: grpc.CallOptions, callback: grpc.requestCallback<_greet_service_HelloResponse__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _greet_service_NoParam, callback: grpc.requestCallback<_greet_service_HelloResponse__Output>): grpc.ClientUnaryCall;
  
  SayHelloBidirectionalStreaming(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_greet_service_HelloRequest, _greet_service_HelloResponse__Output>;
  SayHelloBidirectionalStreaming(options?: grpc.CallOptions): grpc.ClientDuplexStream<_greet_service_HelloRequest, _greet_service_HelloResponse__Output>;
  sayHelloBidirectionalStreaming(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_greet_service_HelloRequest, _greet_service_HelloResponse__Output>;
  sayHelloBidirectionalStreaming(options?: grpc.CallOptions): grpc.ClientDuplexStream<_greet_service_HelloRequest, _greet_service_HelloResponse__Output>;
  
  SayHelloClientStreaming(metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_greet_service_MessageList__Output>): grpc.ClientWritableStream<_greet_service_HelloRequest>;
  SayHelloClientStreaming(metadata: grpc.Metadata, callback: grpc.requestCallback<_greet_service_MessageList__Output>): grpc.ClientWritableStream<_greet_service_HelloRequest>;
  SayHelloClientStreaming(options: grpc.CallOptions, callback: grpc.requestCallback<_greet_service_MessageList__Output>): grpc.ClientWritableStream<_greet_service_HelloRequest>;
  SayHelloClientStreaming(callback: grpc.requestCallback<_greet_service_MessageList__Output>): grpc.ClientWritableStream<_greet_service_HelloRequest>;
  sayHelloClientStreaming(metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_greet_service_MessageList__Output>): grpc.ClientWritableStream<_greet_service_HelloRequest>;
  sayHelloClientStreaming(metadata: grpc.Metadata, callback: grpc.requestCallback<_greet_service_MessageList__Output>): grpc.ClientWritableStream<_greet_service_HelloRequest>;
  sayHelloClientStreaming(options: grpc.CallOptions, callback: grpc.requestCallback<_greet_service_MessageList__Output>): grpc.ClientWritableStream<_greet_service_HelloRequest>;
  sayHelloClientStreaming(callback: grpc.requestCallback<_greet_service_MessageList__Output>): grpc.ClientWritableStream<_greet_service_HelloRequest>;
  
  SayHelloServerStreaming(argument: _greet_service_NameList, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_greet_service_HelloResponse__Output>;
  SayHelloServerStreaming(argument: _greet_service_NameList, options?: grpc.CallOptions): grpc.ClientReadableStream<_greet_service_HelloResponse__Output>;
  sayHelloServerStreaming(argument: _greet_service_NameList, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_greet_service_HelloResponse__Output>;
  sayHelloServerStreaming(argument: _greet_service_NameList, options?: grpc.CallOptions): grpc.ClientReadableStream<_greet_service_HelloResponse__Output>;
  
}

export interface GreetServiceHandlers extends grpc.UntypedServiceImplementation {
  SayHello: grpc.handleUnaryCall<_greet_service_NoParam__Output, _greet_service_HelloResponse>;
  
  SayHelloBidirectionalStreaming: grpc.handleBidiStreamingCall<_greet_service_HelloRequest__Output, _greet_service_HelloResponse>;
  
  SayHelloClientStreaming: grpc.handleClientStreamingCall<_greet_service_HelloRequest__Output, _greet_service_MessageList>;
  
  SayHelloServerStreaming: grpc.handleServerStreamingCall<_greet_service_NameList__Output, _greet_service_HelloResponse>;
  
}

export interface GreetServiceDefinition extends grpc.ServiceDefinition {
  SayHello: MethodDefinition<_greet_service_NoParam, _greet_service_HelloResponse, _greet_service_NoParam__Output, _greet_service_HelloResponse__Output>
  SayHelloBidirectionalStreaming: MethodDefinition<_greet_service_HelloRequest, _greet_service_HelloResponse, _greet_service_HelloRequest__Output, _greet_service_HelloResponse__Output>
  SayHelloClientStreaming: MethodDefinition<_greet_service_HelloRequest, _greet_service_MessageList, _greet_service_HelloRequest__Output, _greet_service_MessageList__Output>
  SayHelloServerStreaming: MethodDefinition<_greet_service_NameList, _greet_service_HelloResponse, _greet_service_NameList__Output, _greet_service_HelloResponse__Output>
}
