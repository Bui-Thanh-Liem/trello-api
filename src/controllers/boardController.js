/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes';

const createNew = async (req, res) => {
  try {
    console.log('req.body', req.body);
    console.log('req.query', req.query);
    console.log('req.params', req.params);
    res.status(StatusCodes.CREATED).json({
      message: `POST: Create boards controller, code: ${StatusCodes.CREATED}`,
    });
    res
      .status(StatusCodes.CREATED)
      .render('<h1>Liem view</h1>', { html: true });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const boardController = {
  createNew,
};
