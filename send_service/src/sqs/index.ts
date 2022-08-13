import { SQS } from 'aws-sdk';
import { SendMessageRequest } from 'aws-sdk/clients/sqs';

type Data = {
  name: string;
  emailFrom: string;
  message: string;
}

const sendMessage = (sqs: SQS, queueUrl: string, inputData: Data) => {

  let params: SendMessageRequest = {
    MessageBody: JSON.stringify(inputData),
    QueueUrl: queueUrl
  };

  return sqs.sendMessage(params).promise();
}

export default sendMessage;