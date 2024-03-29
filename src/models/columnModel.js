import Joi from 'joi';
import { ObjectId } from 'mongodb';

import { getDB } from '~/config/mongodb';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators';

// Define Collection (name & schema)
const COLUMN_COLLECTION_NAME = 'columns';
const COLUMN_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(20).trim().strict(),

  // Items trong mảng cardOrderIds là ObjectId nên cần thêm pattern cho chuẩn.
  cardOrderIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false),
});

const INVALID_UPDATE_FIELDS = ['_id', 'boardId', 'createdAt'];

// Validate
const validateBeforeCreate = async (data) => {
  return await COLUMN_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: true });
};

// Create a new Column
const createNewColumn = async (data) => {
  try {
    // Validate , add field for Column
    const columnNewData = await validateBeforeCreate(data);

    // boardId: String -> boardId: ObjectId
    const columnNewDataToObjectId = {
      ...columnNewData,
      boardId: ObjectId.createFromHexString(columnNewData.boardId),
    };

    // Add data for database
    const newColumn = await getDB().collection(COLUMN_COLLECTION_NAME).insertOne(columnNewDataToObjectId);
    return newColumn;
  } catch (error) {
    throw new Error(error);
  }
};

// Find a column by _id
const findOneById = async (id) => {
  try {
    const column = await getDB()
      .collection(COLUMN_COLLECTION_NAME)
      .findOne({ _id: ObjectId.createFromHexString(id) });
    return column;
  } catch (error) {
    throw new Error(error);
  }
};

const updateCardOrderIds = async (card) => {
  try {
    const result = await getDB()
      .collection(COLUMN_COLLECTION_NAME)
      .findOneAndUpdate(
        {
          _id: ObjectId.createFromHexString(
            typeof card.columnId === 'string' ? card.columnId : card.columnId.toString()
          ),
        },
        { $push: { cardOrderIds: card._id } },
        { returnDocument: 'after' }
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (columnId, updateColumnData) => {
  Object.keys(updateColumnData).forEach((key) => {
    if (INVALID_UPDATE_FIELDS.includes(key)) {
      delete updateColumnData[key];
    }
  });

  try {
    const updatedColumn = await getDB()
      .collection(COLUMN_COLLECTION_NAME)
      .findOneAndUpdate(
        {
          _id: ObjectId.createFromHexString(typeof columnId === 'string' ? columnId : columnId.toString()),
        },
        {
          $set: updateColumnData,
        },
        {
          returnDocument: 'after',
        }
      );
    return updatedColumn;
  } catch (error) {
    throw new Error(error);
  }
};

export const columnModel = {
  COLUMN_COLLECTION_NAME,
  COLUMN_COLLECTION_SCHEMA,
  createNewColumn,
  findOneById,
  updateCardOrderIds,
  update,
};
