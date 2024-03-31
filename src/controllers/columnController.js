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

const update = async (req, res, next) => {
  try {
    const columnId = req.params.id;
    const updatedColumn = await columnService.update(columnId, req.body);
    res.status(StatusCodes.OK).json(updatedColumn);
  } catch (error) {
    next(error);
  }
};

const deleteColumn = async (req, res, next) => {
  try {
    const columnId = req.params.id;
    const resultMessage = await columnService.deleteColumn(columnId);
    res.status(StatusCodes.OK).json(resultMessage);
  } catch (error) {
    next(error);
  }
};

export const columnController = {
  createColumn,
  update,
  deleteColumn,
};
