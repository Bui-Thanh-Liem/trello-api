import express from 'express';
import { StatusCodes } from 'http-status-codes';

//
import { BOARD_ROUTE } from '~/routes/v1/boardRoute';
import { CARD_ROUTE } from '~/routes/v1/cardRoute';

// Tạo đối tượng router để gôm các routes có cùng tính chất chung (Version)
const router = express.Router();

router.get('/status', (req, res) => {
  res
    .status(StatusCodes.OK)
    .json({ message: `Status app OK, status: ${StatusCodes.OK}` });
});

router.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({message: 'Home APIs V1'});
});

router.use('/board', BOARD_ROUTE);
router.use('/card', CARD_ROUTE);

export const APIs_V1 = router;
