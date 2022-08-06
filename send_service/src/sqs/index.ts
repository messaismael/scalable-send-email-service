import AWS, { SQS } from 'aws-sdk';
import { CreateQueueRequest } from 'aws-sdk/clients/sqs';
import { QUEUE_NAME, TABLE_NAME } from '../config';
import send_msg from './send_msg';

let sqs = new SQS({ region: "us-east-1" });
AWS.config.logger = console;

let dynamoDb = new AWS.DynamoDB.DocumentClient();

const initQueue = async (Inputdata: { emailFrom: string; message: string; name: string; }) => {

  var params: CreateQueueRequest = {
    QueueName: QUEUE_NAME,
    Attributes: {
      'DelaySeconds': "60",
      'MessageRetentionPeriod': '86400'
    }
  }

  try {
    let res_create_queue = await sqs.createQueue(params).promise();

    try {
      let res_send = await send_msg(sqs, res_create_queue.QueueUrl, Inputdata);

      const dbParams: AWS.DynamoDB.DocumentClient.PutItemInput = {
        TableName: TABLE_NAME,
        Item: {
          messageId: res_send.MessageId,
          emailSended: "false"
        }
      }

      try {
        await dynamoDb.put(dbParams).promise() // save messageId and Status in DynamoDB

        return Promise.resolve({
          success: true,
          message: "Message sended to Queue",
          data: res_send.MessageId
        });

      } catch (err) {
        console.log("Error put dynamoDB", err);
      }

    } catch (err) {
      console.error(err);

      return Promise.reject({
        success: false,
        message: 'Unable to add message to queue',
        data: err
      });
    }

  } catch (error) {

    return { success: false, message: "Unable to initialise the queue", data: error }
  }
}


export default initQueue;