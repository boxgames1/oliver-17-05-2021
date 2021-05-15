### Q's

- 1. What would you add to your solution if you had more time?
  - The app is quite simple for now tbh, so it doesn't need much more to do. I prefer to keep things simple. We could add tools to improve developer experience in the long term like proper linter settings, dockerize it, create test utils. I'd also like to improve the UI.

- 2. What would you have done differently if you knew this page was going to get thousands of viewsper second vs per week?
  - If acceptable, i'd probably add some sort of throttling to reduce the amount of processed data. The biggest challenge would be on the backend though which has to manage concurrency.

- 3. What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
  - Well, not so recent but I love React hooks. You can find a couple of examples in the code. It changed the way of working with React. Also the `screen` feature of React Testing Library has helped in the way of writing tests.

- 4. How would you track down a performance issue in production? Have you ever had to do this?
  - I had to face prod issues several times ^^. In terms of the strategy: it depends.
  Specifically for the frontend, if having any observability or report tool that's crucial to have an starting point. Otherwise, I try to reproduce the error locally with the master branch, tracing logs, and of course create a doc as post-mortem which helps to learn from it.

- 5. Can you describe common security concerns to consider for a frontend developer?
  - Tbh, React has done frontend security quite easier. The input validation before sending data to the API also helps to prevent other concerns like the injection. It helps with some common concerns like XSS. The most delicate is of course: auth. Having proper management authentication, tokens and cookies is crucial to avoid any misbehavior, data steal or malicious access. I'm not a security expert though.

- 6. How would you improve the Kraken API that you just used?
  - Not sure if I can build good feedback as I've only used one query ^^. 
  The WS suits nicely this use case and it allows different queries, it works pretty nice overall.
  I could probably have something else if using it more time