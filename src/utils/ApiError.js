/**
 * Định nghĩa riêng một Class ApiError kế thừa class Error sẵn
 * Mục đích để biến đổi những lỗi chỉ hiển thị thông tin cơ bản của thư viện thứ 3 thành lỗi giống như Error
 */
class ApiError extends Error {
  constructor(statusCode, message) {
    // Gọi tới hàm khởi tạo của class Error (class cha) để còn dùng this (kiến thức OOP lập trình hướng đối tượng căn bản)
    // Thằng cha (Error) có property message rồi nên gọi nó luôn trong super cho gọn
    super(message);

    // Tên của cái custom Error này, nếu không set thì mặc định nó sẽ kế thừa là "Error"
    this.name = 'ApiError';

    // Gán thêm http status code của chúng ta ở đây
    this.statusCode = statusCode;

    // Ghi lại Stack Trace (dấu vết ngăn xếp) để thuận tiện cho việc debug
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
