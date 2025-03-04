#include <QCoreApplication>
#include <QtCore/QUrl>
#include <QtGrpc/QGrpcHttp2Channel>
#include <memory>

#include "greet.qpb.h"
#include "greet_client.grpc.qpb.h"

class Greet : public QObject {
 public:
  explicit Greet(std::shared_ptr<QGrpcHttp2Channel> channel) {
    m_client.attachChannel(std::move(channel));
  }

  void callSayHello() {
    greet_service::NoParam noParam;
    m_callReply = m_client.SayHello(noParam);

    QObject::connect(m_callReply.get(), &QGrpcCallReply::finished, this,
                     &Greet::unaryFinished, Qt::SingleShotConnection);
  }

  void callSayHelloServerStreaming(const greet_service::NameList &nameList) {
    m_serverStream = m_client.SayHelloServerStreaming(nameList);

    QObject::connect(m_serverStream.get(), &QGrpcServerStream::finished, this,
                     &Greet::serverStreamFinished, Qt::SingleShotConnection);

    QObject::connect(m_serverStream.get(), &QGrpcServerStream::messageReceived,
                     this, &Greet::serverStreamMessageReceived);
  }

  void callSayHelloClientStreaming(const greet_service::NameList &nameList) {
    greet_service::HelloRequest initialRequest;
    initialRequest.setName(nameList.names()[0]);
    qDebug() << "Sending request with name: " << nameList.names()[0];
    m_clientStream = m_client.SayHelloClientStreaming(initialRequest);

    for (int i = 1; i < nameList.names().size(); i++) {
      greet_service::HelloRequest request;
      request.setName(nameList.names()[i]);
      qDebug() << "Sending request with name: " << nameList.names()[i];
      m_clientStream->writeMessage(request);
    }
    m_clientStream->writesDone();

    QObject::connect(m_clientStream.get(), &QGrpcClientStream::finished, this,
                     &Greet::clientStreamFinished);
  }

  void callSayHelloBidirectionalStreaming(
      const greet_service::NameList &nameList) {
    greet_service::HelloRequest initialRequest;
    initialRequest.setName(nameList.names()[0]);
    m_bidiStream = m_client.SayHelloBidirectionalStreaming(initialRequest);

    QObject::connect(m_bidiStream.get(), &QGrpcBidiStream::finished, this,
                     &Greet::bidiFinished);

    QObject::connect(m_bidiStream.get(), &QGrpcBidiStream::messageReceived,
                     this, &Greet::bidiMessageReceived);

    for (int i = 1; i < nameList.names().size(); i++) {
      greet_service::HelloRequest request;
      request.setName(nameList.names()[i]);
      m_bidiStream->writeMessage(request);
    }
    m_bidiStream->writesDone();
  }

 private slots:
  void unaryFinished(const QGrpcStatus &status) {
    greet_service::HelloResponse unaryResponse;
    if (status.isOk()) {
      if (m_callReply->read(&unaryResponse)) {
        qDebug() << "Client (UnaryCall) finished, received: "
                 << unaryResponse.message();
      } else {
        qDebug() << "Client (UnaryCall) deserialization failed";
      }
    } else {
      qDebug() << "Client (UnaryCall) failed: " << status.message();
    }
  }

  void serverStreamFinished(const QGrpcStatus &status) {
    if (status.isOk()) {
      qDebug() << "Client (ServerStreaming) finished";
    } else {
      qDebug() << "Client (ServerStreaming) failed";
    }
  }

  void serverStreamMessageReceived() {
    greet_service::HelloResponse serverStreamResponse;
    if (m_serverStream->read(&serverStreamResponse)) {
      qDebug() << "Client (ServerStream), got request with name: "
               << serverStreamResponse.message();
    } else {
      qDebug() << "Client (ServerStream) deserialization failed";
    }
  }

  void clientStreamFinished(const QGrpcStatus &status) {
    greet_service::MessageList clientStreamResponse;
    if (status.isOk()) {
      if (m_clientStream->read(&clientStreamResponse)) {
        qDebug() << "Client (ClientStreaming) finished, received: "
                 << clientStreamResponse.messages();
      }
      m_clientStream.reset();
    } else {
      qDebug() << "Client (ClientStreaming) failed: " << status.message();
    }
  }

  void bidiFinished(const QGrpcStatus &status) {
    if (status.isOk()) {
      qDebug() << "Client (BidirectionalStreaming) finished";
    } else {
      qDebug() << "Client (BidirectionalStreaming) failed: "
               << status.message();
    }
    m_bidiStream.reset();
  }

  void bidiMessageReceived() {
    greet_service::HelloResponse bidiResponse;
    if (m_bidiStream->read(&bidiResponse)) {
      qDebug() << "Client (BidirectionalStreaming) received: "
               << bidiResponse.message();
    } else {
      qDebug() << "Client (BidirectionalStreaming) deserialization failed";
    }
  }

 private:
  greet_service::GreetService::Client m_client;
  std::unique_ptr<QGrpcCallReply> m_callReply;
  std::unique_ptr<QGrpcServerStream> m_serverStream;
  std::unique_ptr<QGrpcClientStream> m_clientStream;
  std::unique_ptr<QGrpcBidiStream> m_bidiStream;
};

int main(int argc, char *argv[])
{
    QCoreApplication a(argc, argv);

    std::shared_ptr<QGrpcHttp2Channel> channel =
        std::make_shared<QGrpcHttp2Channel>(QUrl("http://localhost:5000"));

    greet_service::NameList nameList;
    nameList.setNames(QStringList{"John", "Alice", "Bob"});

    Greet greet(channel);
    greet.callSayHello();
    greet.callSayHelloServerStreaming(nameList);
    greet.callSayHelloClientStreaming(nameList);
    greet.callSayHelloBidirectionalStreaming(nameList);

    return a.exec();
}
