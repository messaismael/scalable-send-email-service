# Receive_service

## Config
  Create and `.env` file from `envSample` file.

## Deploy
  
  To create your function, you can use the following command, but firstly you should delete  **claudia.json** file.
  ```
  $ npm run create
  ```
  Set up SQS event triggers and create the table in DynamoDB, to do this, you must provide the same queue and table name in the ``.env`` file the run the following command.

    $ npm run add:trigger
    $ npm run create:table

  

  To deploy your function in **dev** environment you can use:
  ```
  $ npm run deploy:dev
  ```

  To deploy your function in **prod** environment you can use:
  ```
  $ npm run deploy:prod
  ```
