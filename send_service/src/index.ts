import ApiBuilder from 'claudia-api-builder';
import initQueue from './sqs';

const api: any = new ApiBuilder();

api.get('/', (req) => {
  return { success: true, message: "Send to Queue Service" };
});

api.post('/mail', (req) => {
  
  return initQueue({...req.body})
    .then((res) => {
      return res;
    }).catch((err) => {
      return err;
    });
});

export = api;