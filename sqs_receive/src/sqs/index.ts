import { SQS } from 'aws-sdk';
import { GetQueueUrlRequest, SendMessageRequest } from 'aws-sdk/clients/sqs';
import { QUEUE_NAME } from '../config';

let sqs = new SQS({ region: "us-east-1" });

type Data = {
  name: string;
  emailFrom: string;
  message: string;
}

const resend_in_queue = async (formtData: Data) => {
  var GetQUrlparms: GetQueueUrlRequest = {
    QueueName: QUEUE_NAME + '.fifo'
  }

  try {
    let queueUrl = await sqs.getQueueUrl(GetQUrlparms).promise();

    let params: SendMessageRequest = {
      MessageBody: JSON.stringify(formtData),
      MessageDeduplicationId: formtData.emailFrom.split("@")[0],
      MessageGroupId: "FifoGroup",
      QueueUrl: queueUrl.QueueUrl
    };

    return sqs.sendMessage(params).promise();
  } catch (err) {
    return Promise.reject(err);
  }
}

export default resend_in_queue;