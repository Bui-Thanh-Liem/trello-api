import { slugify } from '~/utils/formatters';
import { boardModel } from '~/models/boardModel';

const createNew = async (bodyReq) => {
  try {
    const boardNewData = {
      ...bodyReq,
      slug: slugify(bodyReq.title),
    };

    // Gọi tới model để ghi vào database
    const createdNewBoard = await boardModel.createNewBoard(boardNewData);

    //
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

export const boardServices = {
  createNew,
};
