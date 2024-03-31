/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';

//
import { connectDB, disconnectDB } from '~/config/mongodb';
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware';
import { env } from '~/config/environment';
import { corsOptions } from '~/config/cors';
import { APIs_V1 } from '~/routes/v1';

const startServer = () => {
  const app = express();

  // Xử lý CORS
  app.use(cors(corsOptions));

  // Middleware xủ lý dữ liệu Json, và đưa vào req.body
  app.use(express.json());

  // use dùng khi đã định nghĩa nhiều route bên trong rồi.
  app.use('/v1', APIs_V1);

  // Xử lý lỗi tập trung (middleware).
  app.use(errorHandlingMiddleware);

  // Tùy từng môi trường
  if (env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {
      console.log(`3. Trello-api is running on Port: ${process.env.PORT}`);
    });
  } else {
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      console.log(
        `3. Trello-api is running on http://${env.LOCAL_DEV_APP_PORT}:${env.LOCAL_DEV_APP_HOST}/v1`
      );
    });
  }

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
    process.exit(0); // Thoát khỏi quá trình thực thi của node
  }
})();
