import { Context, APIGatewayEvent } from 'aws-lambda';

import sesSend from "./ses";

const handler = async function (event: APIGatewayEvent, context: Context) {
  console.log("event", event);
  const { Records } = event;

  for (let i = 0; i < Records.length; i++) {
    var formData = JSON.parse(Records[i].body || '{}');

    console.log("form data", formData);

    try {
      let sesRes = await sesSend(formData);
      console.log("response", {success:true, messaage:'email sended', data:sesRes});
    } catch (err) {
      console.error(err);
      // do something
    }
  }

  return { Status: "finished", success: true };
};

export { handler };