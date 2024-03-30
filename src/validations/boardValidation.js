/* eslint-disable no-console */
import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';

import ApiError from '~/utils/ApiError';
import { BOARD_TYPES } from '~/utils/constants';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators';

const createNew = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': '{{#label}} is required - Customer',
      'string.empty': '{{#label}} is not allowed empty - Customer',
      'string.max': '{{#label}} length must be less than or equal to {{#limit}} characters long - Customer',
      'string.min': '{{#label}} length must be at least {{#limit}} characters long - Customer',
    }),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    type: Joi.string()
      .valid(...Object.values(BOARD_TYPES))
      .required(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message));
  }
};

const update = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).trim().strict(),
    description: Joi.string().min(3).max(256).trim().strict(),
    type: Joi.string().valid(...Object.values(BOARD_TYPES)),
    columnOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false, allowUnknown: true });
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message));
  }
};

const moveCardTodifferentColumn = async (req, res, next) => {
  const schema = Joi.object({
    currentCardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),

    prevColumnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    prevCardOrderIds: Joi.array()
      .required()
      .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)),

    nextColumnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    nextCardOrderIds: Joi.array()
      .required()
      .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message));
  }
};

export const boardValidation = {
  createNew,
  update,
  moveCardTodifferentColumn,
};
