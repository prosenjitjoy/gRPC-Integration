import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
import { ProtoGrpcType } from "./rpc/greet"
import { GreetServiceClient } from "./rpc/greet_service/GreetService"
import { NameList } from "./rpc/greet_service/NameList"
import { HelloRequest } from "./rpc/greet_service/HelloRequest"


const packageDef = protoLoader.loadSync("src/proto/greet.proto")
const grpcObj = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType
const greetService = grpcObj.greet_service

function main() {
  const client = new greetService.GreetService("localhost:5000", grpc.credentials.createInsecure())

  const names: NameList = {
    names: ["John", "Alice", "Bob"]
  }

  const deadline = new Date()
  deadline.setSeconds(deadline.getSeconds() + 5)
  client.waitForReady(deadline, function (err) {
    if (err) {
      console.error(err.message)
      return
    }

    // callSayHello(client)
    // callSayHelloServerStream(client, names)
    // callSayHelloClientStreaming(client, names)
    callSayHelloBidirectionalStreaming(client, names)
  })
}

function callSayHello(client: GreetServiceClient) {
  client.SayHello({}, function (err, res) {
    if (err) {
      console.error("could not greet:", err.message)
      return
    }
    if (res) {
      console.log(res.message)
    }
  })
}

function callSayHelloServerStream(client: GreetServiceClient, names: NameList) {
  console.log("Streaming started")

  const stream = client.SayHelloServerStreaming(names)
  stream.on("error", function (err) {
    console.error("error while streaming:", err.message)
  })
  stream.on("data", function (chunk) {
    console.log(chunk.message)
  })
  stream.on("end", function () {
    console.log("Streaming finished")
  })
}

function callSayHelloClientStreaming(client: GreetServiceClient, names: NameList) {
  console.log("Client streaming started")

  const stream = client.SayHelloClientStreaming(function (err, res) {
    if (err) {
      console.error("error while sending:", err.message)
      return
    }
    if (res) {
      console.log("Client streaming finished")
      console.log(res)
    }
  })

  for (const aname of names.names as string[]) {
    stream.write({ name: aname }, function () {
      console.log("Send request with name:", aname)
    })
  }

  stream.end()
}

function callSayHelloBidirectionalStreaming(client: GreetServiceClient, names: NameList) {
  console.log("Bidirectional streaming started")

  const stream = client.SayHelloBidirectionalStreaming()
  stream.on("error", function (err) {
    console.error("error while streaming:", err.message)
  })
  stream.on("data", function (chunk) {
    console.log(chunk.message)
  })
  stream.on("end", function () {
    console.log("Streaming finished")
  })

  for (const aname of names.names as string[]) {
    stream.write({ name: aname })
  }
  stream.end()
}

main()