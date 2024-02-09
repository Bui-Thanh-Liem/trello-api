import express from 'express';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

router.route('/').get((req, res) => {
  res
    .status(StatusCodes.OK)
    .json({ message: `GET: lay du lieu card, code: ${StatusCodes.OK}` });
});

export const CARD_ROUTE = router;
