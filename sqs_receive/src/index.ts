const handler = function (event, context) {
  console.log("event", event);
  context.succeed('hello world');
};

export { handler };