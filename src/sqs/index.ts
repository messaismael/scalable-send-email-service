import AWS, { SQS, AWSError } from 'aws-sdk';
import { CreateQueueRequest } from 'aws-sdk/clients/sqs';
import { QUEUE_NAME } from '../config';
import send_msg from './send_msg';

let sqs = new SQS({ region: "us-east-1" });
AWS.config.logger = console;

const initQueue = async (Inputdata: { emailFrom: string; message: string; name: string; }) => {

  var params: CreateQueueRequest = {
    QueueName: QUEUE_NAME + '.fifo',
    Attributes: {
      'FifoQueue': 'true',
      'DelaySeconds': "60",
      'MessageRetentionPeriod': '86400'
      }
  }

 /*  try {
    let res_create_queue = await sqs.createQueue(params).promise(); */
    try {

      let res_send = await send_msg(sqs, "https://sqs.us-east-1.amazonaws.com/531706640264/send_email.fifo", Inputdata);

      return Promise.resolve({ 
        success: true,
        message: "email sended successfully", 
        queueUrl:"https://sqs.us-east-1.amazonaws.com/531706640264/send_email.fifo", 
        data: res_send
      });

    } catch (error) {
      console.error(error);

      return Promise.reject({ 
        success: false,
        message: 'Unable to add this message in the queue',
        queueUrl:"https://sqs.us-east-1.amazonaws.com/531706640264/send_email.fifo",
        data: error,
      });
    }
/*  } catch (error) {

    return { success: false, message: "Unable to create this queue", data: error }
  } */
} 


export default initQueue;