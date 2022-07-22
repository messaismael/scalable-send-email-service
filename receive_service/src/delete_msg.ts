import { SQS } from 'aws-sdk';
import { DeleteMessageRequest, GetQueueUrlRequest } from 'aws-sdk/clients/sqs';
import { QUEUE_NAME } from './config';

let sqs = new SQS({ region: "us-east-1" });


const delete_msg = async (receiptHandle: string) => {

  var GetQUrlparms: GetQueueUrlRequest = {
    QueueName: QUEUE_NAME + '.fifo'
  }

  try {
    let queueUrl = await sqs.getQueueUrl(GetQUrlparms).promise();

    let params: DeleteMessageRequest = {
      QueueUrl: queueUrl.QueueUrl,
      ReceiptHandle: receiptHandle
    };

    return sqs.deleteMessage(params).promise();
  } catch (err) {

    return Promise.reject(err);
  }
}

export default delete_msg;