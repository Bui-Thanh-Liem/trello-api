import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';

import ApiError from '~/utils/ApiError';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators';

const createNewColumn = async (req, res, next) => {
  const columnSchema = Joi.object({
    title: Joi.string().required().min(3).max(20).trim().strict(),
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  });

  try {
    await columnSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message));
  }
};

export const columnValidation = {
  createNewColumn,
};
