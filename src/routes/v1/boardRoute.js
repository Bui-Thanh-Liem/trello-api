import express from 'express';
import { StatusCodes } from 'http-status-codes';

//
import { boardValidation } from '~/validations/boardValidation';

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    res
      .status(StatusCodes.OK)
      .json({ message: `GET: Get boards, code: ${StatusCodes.OK}` });
  })
  .post(boardValidation.createNew);

export const BOARD_ROUTE = router;
