import express from 'express';

import { cardValidation } from '~/validations/cardValidation';
import { cardController } from '~/controllers/cardController';

const router = express.Router();

router
  .route('/')
  .post(cardValidation.createCard, cardController.createCard);

export const CARD_ROUTE = router;
