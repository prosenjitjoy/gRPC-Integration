import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
import { ProtoGrpcType } from "./rpc/greet"
import { GreetServiceClient } from "./rpc/greet_service/GreetService"
import { NameList } from "./rpc/greet_service/NameList"


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
  client.waitForReady(deadline, (err) => {
    if (err) {
      console.error(err)
      return
    }

    callSayHello(client)
    callSayHelloServerStream(client, names)
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
  stream.on("error", function () {
    console.log("error while streaming")
  })
  stream.on("data", function (chunk) {
    console.log(chunk.message)
  })
  stream.on("end", function () {
    console.log("Streaming finished")
  })
}


// const stream = client.RandomNumber({ maxVal: 100 })
// stream.on("data", (chunk) => {
//   console.log(chunk)
// })
// stream.on("end", () => {
//   console.log("communication ended")
// })

// const stream = client.TodoList((err, result) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   console.log(result)
// })

// stream.write({ todo: "walk the wife", status: "never" })
// stream.write({ todo: "walk the dog", status: "pending" })
// stream.write({ todo: "get a real job", status: "impossible" })
// stream.write({ todo: "feed the dog", status: "done" })
// stream.end()

main()