import fs from 'fs';
import path from 'path';
import conncetMongoDB from './controllers/mongodb.js';
import App from './app.js';
import { fileURLToPath } from 'url';
import settings from '../settings.json' assert { type: 'json' };



// eslint-disable-next-line
console.log(`\x1b[31m
BRAKING CHANGE!!!
From now on all the API endpoints will be prefixed as /api
You won't need to change the server code but the front end.

HTTP methods should be used as this.route.METHOD
rather than this.METHOD

The previous way will keep working but will not be served as endpoint
\x1b[0m`);

(() => {
  // Check for clients directory as it is required by this framework
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const statics = path.resolve(__dirname, '..', 'client');
  if (!fs.existsSync(statics)) {
    fs.mkdirSync(statics);
  }

  // Connect to MongoDB
  conncetMongoDB(settings.mongodbURL)
    .then(function (res) {
      console.log(`=> ${res}!`);

      // Boot Up the server & services
      const app = new App();
      app.start();
    })
    .catch(err => console.log(err));
})();
