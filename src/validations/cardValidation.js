import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';

import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators';
import ApiError from '~/utils/ApiError';

const createCard = async (req, res, next) => {
  const cardSchema = Joi.object({
    title: Joi.string().required().min(3).max(20).trim().strict(),
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  });

  try {
    await cardSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message));
  }
};

export const cardValidation = {
  createCard,
};
