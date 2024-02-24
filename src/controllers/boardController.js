/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes';

import { boardServices } from '~/services/boardService';

const createNew = async (req, res, next) => {
  try {
    console.log('req.body', req.body);
    console.log('req.query', req.query);
    console.log('req.params', req.params);

    // Gọi tới services để xử lý dữ liệu
    const newBoard = await boardServices.createNew(req.body);
    res.status(StatusCodes.CREATED).json(newBoard);
  } catch (error) {
    next(error);
  }
};

export const boardController = {
  createNew,
};
