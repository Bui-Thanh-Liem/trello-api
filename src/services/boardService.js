import { StatusCodes } from 'http-status-codes';

import { slugify } from '~/utils/formatters';
import { boardModel } from '~/models/boardModel';
import ApiError from '~/utils/ApiError';

const createNew = async (bodyReq) => {
  try {
    const boardNewData = {
      ...bodyReq,
      slug: slugify(bodyReq.title),
    };

    // Gọi tới model để ghi vào database
    const createdNewBoard = await boardModel.createNewBoard(boardNewData);

    // Tùy vào từng dụ án có hoặc không có
    const newBoard = await boardModel.findOneById(
      typeof createdNewBoard.insertedId === 'string'
        ? createdNewBoard.insertedId
        : createdNewBoard.insertedId.toString()
    );

    return newBoard;
  } catch (error) {
    throw new Error(error);
  }
};

const getDetails = async (boardId) => {
  try {
    //
    const board = await boardModel.getDetails(boardId);

    // Nếu không tìm thấy board thì trả về lỗi not found
    if (!board) throw new ApiError(StatusCodes.NOT_FOUND, 'Not Found a board');

    return board;
  } catch (error) {
    throw new Error(error);
  }
};

export const boardServices = {
  createNew,
  getDetails
};
