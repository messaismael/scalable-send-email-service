import { SQS, AWSError } from 'aws-sdk';
import { SendMessageRequest } from 'aws-sdk/clients/sqs';

type Data = {
  name: string;
  emailFrom: string;
  message: string;
}

const receive_msg = (sqs: SQS, queueUrl: string, inputData: Data) => {
  /*Do something**/
  return Promise.resolve({});
}

export default receive_msg;