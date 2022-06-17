import AWS, { SQS, AWSError } from 'aws-sdk';
import { CreateQueueRequest } from 'aws-sdk/clients/sqs';
import { QUEUE_NAME } from '../config';
import send_msg from './receive_msg';

let sqs = new SQS({ region: "us-east-1" });
AWS.config.logger = console;

const getQueue = async () => {

  var params: CreateQueueRequest = {
    QueueName: QUEUE_NAME + '.fifo'
  }

 try {
    let queueUrl = await sqs.getQueueUrl(params).promise();
    console.log(queueUrl.QueueUrl)

 } catch (error) {

    return { success: false, message: "Unable to get queue url", data: error }
  }
} 


export default getQueue;