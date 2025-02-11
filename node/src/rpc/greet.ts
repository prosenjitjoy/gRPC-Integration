import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { GreetServiceClient as _greet_service_GreetServiceClient, GreetServiceDefinition as _greet_service_GreetServiceDefinition } from './greet_service/GreetService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  greet_service: {
    GreetService: SubtypeConstructor<typeof grpc.Client, _greet_service_GreetServiceClient> & { service: _greet_service_GreetServiceDefinition }
    HelloRequest: MessageTypeDefinition
    HelloResponse: MessageTypeDefinition
    MessageList: MessageTypeDefinition
    NameList: MessageTypeDefinition
    NoParam: MessageTypeDefinition
  }
}

