import { boardModel } from '~/models/boardModel';
import { columnModel } from '~/models/columnModel';
import { cardModel } from '~/models/cardModel';
import ApiError from '~/utils/ApiError';
import { StatusCodes } from 'http-status-codes';


const createColumn = async (reqBody) => {
  try {
    const columnNewData = {
      ...reqBody,
    };

    const createColumn = await columnModel.createNewColumn(columnNewData);
    const getColumnNew = await columnModel.findOneById(createColumn.insertedId);

    if (getColumnNew) {
      getColumnNew.cards = [];

      // Gọi hàm để cập nhật columnOrderIds trong board
      await boardModel.pushColumnOrderIds(getColumnNew);
    }

    return getColumnNew;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (columnId, reqBody) => {
  try {
    const updateColumnData = {
      ...reqBody,
      updatedAt: Date.now(),
    };

    const updatedColumn = await columnModel.update(columnId, updateColumnData);

    return updatedColumn;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteColumn = async (columnId) => {
  try {
    // Find column by id
    const targetColumn = await columnModel.findOneById(columnId);

    if (!targetColumn) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Not Found a board');
    }

    // Delete the column
    await columnModel.deleteOneById(columnId);

    // Delete card have columnId
    await cardModel.deleteCardsByColumnId(columnId);

    // Update columnOrderIds
    await boardModel.pullColumnOrderIds(targetColumn);

    return { resultMessage: 'column deleted successfully!' };
  } catch (error) {
    throw new Error(error);
  }
};

export const columnService = {
  createColumn,
  update,
  deleteColumn,
};
