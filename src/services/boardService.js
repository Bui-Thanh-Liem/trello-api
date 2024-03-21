import { StatusCodes } from 'http-status-codes';
import { cloneDeep } from 'lodash';

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
    const getBoardNew = await boardModel.findOneById(
      typeof createdNewBoard.insertedId === 'string'
        ? createdNewBoard.insertedId
        : createdNewBoard.insertedId.toString()
    );

    return getBoardNew;
  } catch (error) {
    throw new Error(error);
  }
};

const getDetails = async (boardId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    //
    const board = await boardModel.getDetails(boardId);

    // Nếu không tìm thấy board thì trả về lỗi not found
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Not Found a board');
    }

    // Chuyển đổi cấu trúc của data phù hợp với dự án fontEnd
    const reponseBoard = cloneDeep(board);
    reponseBoard.columns.forEach((column) => {
      column.cards = reponseBoard.cards.filter((card) => card.columnId.equals(column._id));
    });
    delete reponseBoard.cards;

    return reponseBoard;
  } catch (error) {
    throw error;
  }
};

export const boardService = {
  createNew,
  getDetails,
};
