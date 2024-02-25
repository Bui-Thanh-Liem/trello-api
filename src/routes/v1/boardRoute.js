import express from 'express';
import { StatusCodes } from 'http-status-codes';

//
import { boardValidation } from '~/validations/boardValidation';
import { boardController } from '~/controllers/boardController';

const router = express.Router();

router
  .route('/')
  .post(boardValidation.createNew, boardController.createNew);

router
  .route('/:id')
  .get(boardController.getDetails)
  .put();

export const BOARD_ROUTE = router;
