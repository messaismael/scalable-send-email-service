# Scalable Email Sending Service

## Getting started

These are two lambda functions that allow you to send emails while avoiding the risk of failure in sending by introducing the notion of Queue with AWS SQS.

First of all, we have a microservice that gets email data and sends that as a message in the AWS Queue, saves message status in a DynamoDB table, and another message-sending triggered microservice that receives and processes the message according to its status.

## Resources

[Improve Email Sending with Amazon SQS and DynamoDB](https://medium.com@messaismael/improve-email-sending-with-amazon-sqs-4bca9b9572b1)

## Tools

- **AWS SES**
- **AWS SQS**
- **AWS lambda**
- **AWS DynamoDB**
- **ClaudiaJs**
- **TypeScript**

## Install

    $ git clone https://github.com/messaismael/scalable-send-email-service.git
    $ cd scalable-send-email-service

1 - send_service

    $ cd send_service
    $ npm install

2 - send_service

    $ cd receive_service
    $ npm install

## Configs

This project is powered by claudiaJS, so to propely configure it you can follow [this](https://claudiajs.com/tutorials/installing.html)

## Deploy

**[1. Send service](/send_service/README.md)**

**[2. Receive service](/receive_service/README.md)**

<br>

### Author

[Ismael Messa](https://github.com/messaismael)
