import express from 'express';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res
      .status(StatusCodes.OK)
      .json({ message: `GET: lay du lieu boards, code: ${StatusCodes.OK}` });
  })
  .post((req, res) => {
    res
      .status(StatusCodes.CREATED)
      .json({
        message: `POST: tao boards, code: ${StatusCodes.CREATED}`,
      });
  });

export const BOARD_ROUTE = router;
