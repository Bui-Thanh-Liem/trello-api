/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes';

const createNew = async (req, res, next) => {
  try {
    console.log('req.body', req.body);
    console.log('req.query', req.query);
    console.log('req.params', req.params);
    res.status(StatusCodes.CREATED).json({
      message: `POST: Create boards controller, code: ${StatusCodes.CREATED}`,
    });
  } catch (error) {
    next(error);
  }
};

export const boardController = {
  createNew,
};
