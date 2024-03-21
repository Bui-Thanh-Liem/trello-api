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

    // Gọi hàm để cập nhật columnOrderIds trong board
    await boardModel.updateColumnOrderIds(getColumnNew);

    return getColumnNew;
  } catch (error) {
    throw new Error(error);
  }
};

export const columnService = {
  createColumn,
};
