import { StatusCodes } from 'http-status-codes';

import { boardService } from '~/services/boardService';

const createNew = async (req, res, next) => {
  try {
    // Gọi tới services để xử lý dữ liệu
    const newBoard = await boardService.createNew(req.body);
    res.status(StatusCodes.CREATED).json(newBoard);
  } catch (error) {
    next(error);
  }
};

const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    //
    const board = await boardService.getDetails(boardId);

    res.status(StatusCodes.OK).json(board);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const updatedBoard = await boardService.update(boardId, req.body);
    res.status(StatusCodes.OK).json(updatedBoard);
  } catch (error) {
    next(error);
  }
};

const moveCardTodifferentColumn = async (req, res, next) => {
  try {
    const result = await boardService.moveCardTodifferentColumn(req.body);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const boardController = {
  createNew,
  getDetails,
  update,
  moveCardTodifferentColumn
};
