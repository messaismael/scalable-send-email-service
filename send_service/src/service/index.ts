import AWS, { SQS } from 'aws-sdk';
import { CreateQueueRequest } from 'aws-sdk/clients/sqs';
import { QUEUE_URL, TABLE_NAME } from '../config';
import sendMessage from '../sqs';

let sqs = new SQS({ region: "us-east-1" });
AWS.config.logger = console;

let dynamoDb = new AWS.DynamoDB.DocumentClient();

const sendMessageService = async (Inputdata: { emailFrom: string; message: string; name: string; }) => {
  try {
    let res_send = await sendMessage(sqs, QUEUE_URL, Inputdata);

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
}


export default sendMessageService;