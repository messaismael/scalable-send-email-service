import { Context, APIGatewayEvent } from 'aws-lambda';

import sesSend from "./ses";
import resend_in_queue from './sqs';

const handler = async function (event: APIGatewayEvent, context: Context) {
  console.log("event", event);
  const { Records } = event;

  for (let i = 0; i < Records.length; i++) {
    var formData = JSON.parse(Records[i].body || '{}');

    console.log("form data", formData);

    try {
      let sesRes = await sesSend(formData);
      console.log("Success", { message: 'Email sended' });
    } catch (err) {
      console.error("Error ses send", err);
      try {
        let sqsBack = await resend_in_queue(formData);

        console.log("Success", { message: "Resended in Queue" });
      } catch (error) {
        console.error("Error sqs send back", err);
      }
    }
  }

  return { Status: "finished", success: true };
};

export { handler };