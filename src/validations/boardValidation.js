/* eslint-disable no-console */
import Joi, { object } from 'joi';
import { StatusCodes } from 'http-status-codes';

import ApiError from '~/utils/ApiError';
import { BOARD_TYPES } from '~/utils/constants';

const createNew = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': '{{#label}} is required - Customer',
      'string.empty': '{{#label}} is not allowed empty - Customer',
      'string.max': '{{#label}} length must be less than or equal to {{#limit}} characters long - Customer',
      'string.min': '{{#label}} length must be at least {{#limit}} characters long - Customer',
    }),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    type: Joi.string().valid(...Object.values(BOARD_TYPES)).required(),
  });

  try {
    console.log('req.body', req.body);

    await schema.validateAsync(req.body, { abortEarly: false });

    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message));
  }
};

export const boardValidation = {
  createNew,
};
