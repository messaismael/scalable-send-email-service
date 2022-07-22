import { Context, APIGatewayEvent } from 'aws-lambda';

import sesSend from "./ses";
import delete_msg from './delete_msg';

const handler = async function (event: APIGatewayEvent, context: Context) {
  console.log("event", event);
  const { Records } = event;

  for (let i = 0; i < Records.length; i++) {
    var record = Records[i];
    var formData = JSON.parse(record.body || '{}');

    try {
      let sesRes = await sesSend(formData);
      console.log("Success", { message: 'Email sended' });

      try {
        let deleteRes = await delete_msg(record.receiptHandle);

        console.log("Success", { message: "Message removed from queue" });
      } catch (err) {
        console.error("error deleting message", err);
      }
    } catch (err) {
      console.error("error sending via ses", err);
    }
  }

  return { Status: "finished", success: true };
};

export { handler };