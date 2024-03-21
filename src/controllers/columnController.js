import { StatusCodes } from 'http-status-codes';

import { columnService } from '~/services/columnService';

const createColumn = async (req, res, next) => {
  try {
    const newColumn = await columnService.createColumn(req.body);
    res.status(StatusCodes.CREATED).json(newColumn);
  } catch (error) {
    next(error);
  }
};

export const columnController = {
  createColumn,
};
