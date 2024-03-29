import Joi from 'joi';
import { ObjectId } from 'mongodb';

import { getDB } from '~/config/mongodb';
import { BOARD_TYPES } from '~/utils/constants';
import { columnModel } from '~/models/columnModel';
import { cardModel } from '~/models/cardModel';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators';

// Define Collection (Name and Schema)
const BOARD_COLLECTION_NAME = 'boards';
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(50).trim().strict(),
  type: Joi.string()
    .valid(...Object.values(BOARD_TYPES))
    .required(),
  columnOrderIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false),
});

const INVALID_UPDATE_FIELDS = ['_id', 'createdAt'];

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

// Find details of board
const getDetails = async (boardId) => {
  try {
    const board = await getDB()
      .collection(BOARD_COLLECTION_NAME)
      .aggregate([
        { $match: { _id: ObjectId.createFromHexString(boardId), _destroy: false } },
        {
          $lookup: {
            from: columnModel.COLUMN_COLLECTION_NAME,
            localField: '_id', // trên board
            foreignField: 'boardId', // trên column
            as: 'columns',
          },
        },
        {
          $lookup: {
            from: cardModel.CARD_COLLECTION_NAME,
            localField: '_id',
            foreignField: 'boardId',
            as: 'cards',
          },
        },
      ])
      .toArray();
    return board[0] || null;
  } catch (error) {
    throw new Error(error);
  }
};

// Update columnOrderIds
const updateColumnOrderIds = async (column) => {
  try {
    const result = await getDB()
      .collection(BOARD_COLLECTION_NAME)
      .findOneAndUpdate(
        {
          _id: ObjectId.createFromHexString(
            typeof column.boardId === 'string' ? column.boardId : column.boardId.toString()
          ),
        },
        { $push: { columnOrderIds: column._id } },
        { returnDocument: 'after' }
      );
    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (boardId, newBoardUpdateData) => {
  // Không cho phép cập nhật những fields không được phép cập nhật
  Object.keys(newBoardUpdateData).forEach((key) => {
    if (INVALID_UPDATE_FIELDS.includes(key)) {
      delete newBoardUpdateData[key];
    }
  });

  try {
    const result = await getDB()
      .collection(BOARD_COLLECTION_NAME)
      .findOneAndUpdate(
        {
          _id: ObjectId.createFromHexString(typeof boardId === 'string' ? boardId : boardId.toString()),
        },
        { $set: newBoardUpdateData },
        { returnDocument: 'after' }
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNewBoard,
  findOneById,
  getDetails,
  updateColumnOrderIds,
  update,
};
