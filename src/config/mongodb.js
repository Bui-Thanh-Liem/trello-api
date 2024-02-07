import { MongoClient, ServerApiVersion } from 'mongodb';

//
import { env } from '~/config/environment';

// Tạo đối tượng trelloDatabase
let db = null;

// Khởi tạo đối tượng Client để kết nối tới Cluster
const Client = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1, // Xác định phiên bản của API
    strict: true, // Bật chế độ nghiêm ngặc
    deprecationErrors: true, // Cho phép hiển thị thông báo lỗi cho việc sử dụng tính năng đã bị lỗi
  },
});

// Kết nối với database
export const connectDB = async () => {
  try {
    // Kết nối với cluters và tham chiếu tới database theo tên để sử dụng
    await Client.connect();
    db = Client.db(env.DATABASE_NAME);
  } catch (error) {
    await Client.close();
  }
};

// Hủy kết nối với database
export const disconnectDB = async () => {
  console.log('Disconnected Database Client.');
  await Client.close();
};

// Lấy database
export const getDB = () => {
  if (!db) throw new Error('You have to connect Database !');
  return db;
};
