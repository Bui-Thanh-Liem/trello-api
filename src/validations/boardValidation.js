/* eslint-disable no-console */
import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';

const createNew = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Bui Thanh Liem , required',
      'string.empty': 'Bui Thanh Liem , empty',
      'string.max':
        '{{#label}} length must be less than or equal to {{#limit}} characters long , Bui Thanh Liem',
      'string.min':
        '{{#label}} length must be at least {{#limit}} characters long , Bui Thanh Liem',
    }),
    description: Joi.string().required().min(3).max(256).trim().strict(),
  });

  try {
    console.log('req.body', req.body);

    await schema.validateAsync(req.body, { abortEarly: false });

    // res.status(StatusCodes.CREATED).json({
    //   message: `POST: Create boards validations, code: ${StatusCodes.CREATED}`,
    // });

    next();
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ error: new Error(error).message });
  }
};

export const boardValidation = {
  createNew,
};
