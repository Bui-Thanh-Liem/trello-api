import Joi from 'joi';
import { ObjectId } from 'mongodb';

import { getDB } from '~/config/mongodb';

// Define Collection (Name and Schema)
const BOARD_COLLECTION_NAME = 'boards';
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(50).trim().strict(),
  columnOrderIds: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false),
});

// Validations (phòng khi services trả xuống model dữ liệu không đúng, gán thêm các giá trị mặc định cho collection)
const validateBeforeCreate = async (data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: true });
};

// Create a new board
const createNewBoard = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);

    const newBoard = await getDB().collection(BOARD_COLLECTION_NAME).insertOne(validData);
    return newBoard;
  } catch (error) {
    throw new Error(error);
  }
};

// find board by _id
const findOneById = async (id) => {
  try {
    const newBoard = await getDB()
      .collection(BOARD_COLLECTION_NAME)
      .findOne({ _id: ObjectId.createFromHexString(id) });
    return newBoard;
  } catch (error) {
    throw new Error(error);
  }
};

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNewBoard,
  findOneById,
};
