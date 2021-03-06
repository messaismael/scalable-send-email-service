import AWS, { SQS, AWSError } from 'aws-sdk';
import { CreateQueueRequest } from 'aws-sdk/clients/sqs';
import { QUEUE_NAME } from '../config';
import send_msg from './send_msg';

let sqs = new SQS({ region: "us-east-1" });
AWS.config.logger = console;

const initQueue = async (Inputdata: { emailFrom: string; message: string; name: string; }) => {

  var params: CreateQueueRequest = {
    QueueName: QUEUE_NAME,
    Attributes: {
      'FifoQueue': 'true',
      'DelaySeconds': "60",
      'MessageRetentionPeriod': '86400'
    }
  }

  try {
    let res_create_queue = await sqs.createQueue(params).promise();

    try {
      let res_send = await send_msg(sqs, res_create_queue.QueueUrl, Inputdata);

      return Promise.resolve({
        success: true,
        message: "Message sended to Queue",
        data: res_send
      });

    } catch (error) {
      console.error(error);

      return Promise.reject({
        success: false,
        message: 'Unable to add message to queue',
        data: error,
      });
    }

  } catch (error) {

    return { success: false, message: "Unable to initialise the queue", data: error }
  }
}


export default initQueue;