import { columnModel } from '~/models/columnModel';
import { boardModel } from '~/models/boardModel';

const createColumn = async (reqBody) => {
  try {
    const columnNewData = {
      ...reqBody,
    };

    const createColumn = await columnModel.createNewColumn(columnNewData);
    const getColumnNew = await columnModel.findOneById(
      typeof createColumn.insertedId === 'string'
        ? createColumn.insertedId
        : createColumn.insertedId.toString()
    );

    if (getColumnNew) {
      getColumnNew.cards = [];

      // Gọi hàm để cập nhật columnOrderIds trong board
      await boardModel.updateColumnOrderIds(getColumnNew);
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
      updatedAt: Date.now()
    };

    const updatedColumn = await columnModel.update(columnId, updateColumnData);

    return updatedColumn;
  } catch (error) {
    throw new Error(error);
  }
};

export const columnService = {
  createColumn,
  update
};
