# Receive_service

## Deploy
  
  To create your function, you can use the following command, but firstly you should delete  **claudia.json** file.
  ```
  $ npm run create
  ```
  Set up SQS event triggers, to do this, you must provide the same queue name followed by the suffix ``.fifo`` in the ``.env`` file as below firstly.

  > QUEUE_NAME=email_queue.fifo

    $ npm run add:trigger

  To deploy your function in **dev** environment you can use:
  ```
  $ npm run deploy:dev
  ```

  To deploy your function in **prod** environment you can use:
  ```
  $ npm run deploy:prod
  ```
