import express from 'express';

//
import { connectDB, getDB, disconnectDB } from '~/config/mongodb';
import { env } from '~/config/environment';

const startServer = () => {
  const app = express();
  app.get('/', async (req, res) => {
    console.log(env.AUTHOR);
    res.end('<h1>Hello World!</h1><hr>');
  });
  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`3. Trello-api is running at http://${env.APP_HOST}:${env.APP_PORT}/`);
  });

  process.on('SIGINT', () => {
    disconnectDB();
    console.log('Disconnected Client Database');
  });
};

(async () => {
  try {
    console.log('1. start thread');
    await connectDB();
    console.log('2. Connect Database Successfully');

    startServer();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();
