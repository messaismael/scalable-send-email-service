import ApiBuilder from 'claudia-api-builder';
import sendMessageService from './service';

const api: any = new ApiBuilder();

api.get('/', (req) => {
  return { success: true, message: "Hello World !!" };
});

api.post('/mail', (req) => {
  
  return sendMessageService({...req.body})
    .then((res) => {
      return res;
    }).catch((err) => {
      return err;
    });
});

export = api;