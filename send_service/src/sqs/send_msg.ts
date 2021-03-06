import { SQS } from 'aws-sdk';
import { SendMessageRequest } from 'aws-sdk/clients/sqs';

type Data = {
  name: string;
  emailFrom: string;
  message: string;
}

const send_msg = (sqs: SQS, queueUrl: string, inputData: Data) => {

  let params: SendMessageRequest = {
    MessageBody: JSON.stringify(inputData),
    MessageDeduplicationId: Buffer.from(inputData.emailFrom).toString('base64'),
    MessageGroupId: "FifoGroup",
    QueueUrl: queueUrl
  };

  return sqs.sendMessage(params).promise();
}

export default send_msg;