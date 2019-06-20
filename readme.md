#UpLearn Challenge 

According to the assigment, we need to create a function called fetch that return an object with attributes of links and assets.

the function is considered to be a part of web app which can take the followings:

> Aws Lambda or Google function

the function reside in `services/scraper.js` the file itself can be deployed inside Google function or Lambda where it doesn't need a
server to manage and the code runs in parallel and processes each trigger individually.

> Micro service

using a light framework like express.js we can put the function into a small microservice where it is 
developed, deployed, operated, and scaled without affecting the functioning of other services.

> part of Monolith web app

The function is self contained into single file in services folder, where it get imported when needed to be used in particular route or controller or another service.




## Running this application
You can run the application by typing:

`npm install` to install the required packages.

`npm start` to start the application .

## Testing this application

If you are running windows then simpley run `npm test` if you are running linux/MacOs type `npm run linux-test`
