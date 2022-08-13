import { SQS } from 'aws-sdk';
import { DeleteMessageRequest, GetQueueUrlRequest } from 'aws-sdk/clients/sqs';
import { QUEUE_URL } from './config';

let sqs = new SQS({ region: "us-east-1" });

const deleteMessage = async (receiptHandle: string) => {
  
  let params: DeleteMessageRequest = {
    QueueUrl: QUEUE_URL,
    ReceiptHandle: receiptHandle
  };

  return sqs.deleteMessage(params).promise();
}

export default deleteMessage;