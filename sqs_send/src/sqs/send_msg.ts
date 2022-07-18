import { SQS, AWSError } from 'aws-sdk';
import { SendMessageRequest } from 'aws-sdk/clients/sqs';

type Data = {
  name: string;
  emailFrom: string;
  message: string;
}

const send_msg = (sqs: SQS, queueUrl: string, inputData: Data) => {

  let params: SendMessageRequest = {
    MessageAttributes: {
      "Name": {
        DataType: "String",
        StringValue: inputData.name
      },
      "EmailFrom": {
        DataType: "String",
        StringValue: inputData.emailFrom
      }
    },
    MessageBody: JSON.stringify(inputData),
    MessageDeduplicationId: inputData.emailFrom.split("@")[0],
    MessageGroupId: "FifoGroup",
    QueueUrl: queueUrl
  };

  return sqs.sendMessage(params).promise();
}

export default send_msg;