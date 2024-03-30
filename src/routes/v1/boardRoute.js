import express from 'express';

//
import { boardValidation } from '~/validations/boardValidation';
import { boardController } from '~/controllers/boardController';

const router = express.Router();

router.route('/').post(boardValidation.createNew, boardController.createNew);

router.route('/:id').get(boardController.getDetails).put(boardValidation.update, boardController.update);

// Api riêng cho việc kéo thả card giữa các column khác nhau
router
  .route('/supports/moving_card')
  .put(boardValidation.moveCardTodifferentColumn, boardController.moveCardTodifferentColumn);

export const BOARD_ROUTE = router;
