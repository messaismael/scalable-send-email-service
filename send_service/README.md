# Send_service

## Configs

  If you haven't created a Queue yet, to create one, you must add a `.env` file from the `envSample` file theN provide the **Queue_Name** and **TABLE_Name** and the following command will create a queue and retruned the queue url required in all the `env.json` and `dev.json` files. Regarding the DynamoDB table the second command will create that.
  >> queue url is also required in the the `receive_service` folder.

  ```
  $ npm run create:queue
  $ npm run create:table
  ```

## Deploy
  
  To create your function, you can use the following command before this you should delete the  **claudia.json**  file.
  ```
  $ npm run create
  ```

  To deploy your function in **dev** environment you can use:
  ```
  $ npm run deploy:dev
  ```

  To deploy your function in **prod** environment you can use:
  ```
  $ npm run deploy:prod
  ```
