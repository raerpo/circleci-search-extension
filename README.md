## CircleCI Search Extension

### Motivation
The branch search on the new CircleCI interface frozen the browser so this is an option until they fix their implementation.

### How to use it
- run `yarn install` 
- rename `.env-example` to `.env`
- set your CircleCI URL on the .env file 
- run `yarn build`. 

After that add the extension to your browser as an unpacked extension. [Here's a guide for that on Chrome](https://www.youtube.com/watch?v=hIRX1dpfqHc)

> You need to be logged with your CircleCI credentials for this extension to work.

> It works with Firefox and Chrome