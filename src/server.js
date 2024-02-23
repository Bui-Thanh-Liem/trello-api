import express from 'express';

//
import { connectDB, disconnectDB } from '~/config/mongodb';
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware';
import { env } from '~/config/environment';
import { APIs_V1 } from '~/routes/v1';

const startServer = () => {
  const app = express();

  //
  app.use(express.json());

  // use dùng khi đã định nghĩa nhiều phương thức bên trong rồi.
  app.use('/v1', APIs_V1);

  // Xử lý lỗi tập trung (middleware).
  app.use(errorHandlingMiddleware);

  //
  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(
      `3. Trello-api is running on http://${env.APP_HOST}:${env.APP_PORT}/v1`
    );
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
