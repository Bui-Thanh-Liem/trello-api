import express from 'express';

import { columnValidation } from '~/validations/columnValidation';
import { columnController } from '~/controllers/columnController';

const router = express.Router();

router
  .route('/')
  .post(columnValidation.createNewColumn, columnController.createColumn);

export const COLUMN_ROUTE = router;
