import ApiBuilder from 'claudia-api-builder';
import { sendEmail } from './ses/sendEmail';
import initQueue from './sqs';

const api: any = new ApiBuilder();

api.get('/', (req) => {
  return { success: true, message: "Send Email Servie is Ready" };
});

api.post('/mail', (req) => {
  const { emailFrom, name, message } = req.body;

  /* return sendEmail({ emailFrom: email, name: name, message: message })
    .then((res) => {
      return { success: true, message: "Email sent successfull", data: res }
    })
    .catch((err) => {
      return { success: false, message: "Unable to send email", data: err }
    }) */
    return initQueue({name: name, emailFrom: emailFrom, message: message})
      .then((res) => {
        return res;
      }).catch((err) => {
        return err;
      });
});

export = api;