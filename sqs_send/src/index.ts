import ApiBuilder from 'claudia-api-builder';
import initQueue from './sqs';

const api: any = new ApiBuilder();

api.get('/', (req) => {
  return { success: true, message: "Send Email Servie is Ready" };
});

api.post('/mail', (req) => {
  const { emailFrom, name, message } = req.body;

  return initQueue({name: name, emailFrom: emailFrom, message: message})
    .then((res) => {
      return res;
    }).catch((err) => {
      return err;
    });
});

export = api;