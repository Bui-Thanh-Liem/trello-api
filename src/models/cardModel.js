import Joi from 'joi';
import { ObjectId } from 'mongodb';

import { getDB } from '~/config/mongodb';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators';

// Define Collection (name & schema)
const CARD_COLLECTION_NAME = 'cards';
const CARD_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),

  title: Joi.string().required().min(3).max(20).trim().strict(),
  description: Joi.string().optional(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false),
});

const INVALID_UPDATE_FIELDS = ['_id', 'boardId', 'createdAt'];

// Validate
const validateBeforeCreate = async (data) => {
  return await CARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarlyUpdate: false });
};

// Create a new card
const createCard = async (data) => {
  try {
    const cardNewData = await validateBeforeCreate(data);
    const cardNewDataToObjectId = {
      ...cardNewData,
      boardId: ObjectId.createFromHexString(cardNewData.boardId),
      columnId: ObjectId.createFromHexString(cardNewData.columnId),
    };
    const createCard = await getDB().collection(CARD_COLLECTION_NAME).insertOne(cardNewDataToObjectId);
    return createCard;
  } catch (error) {
    throw new Error(error);
  }
};

// find a card by _id
const findOneById = async (id) => {
  id = id.toString();
  try {
    const card = await getDB()
      .collection(CARD_COLLECTION_NAME)
      .findOne({ _id: ObjectId.createFromHexString(id) });
    return card;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (cardId, updateData) => {
  Object.keys(updateData).forEach((key) => {
    if (INVALID_UPDATE_FIELDS.includes(key)) {
      delete updateData[key];
    }
  });

  // Đổi tất cả các gía trị liên quan ObjectId sang ObjectId
  if (updateData.columnId) updateData.columnId = ObjectId.createFromHexString(updateData.columnId);

  try {
    const updatedCard = await getDB()
      .collection(CARD_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: ObjectId.createFromHexString(cardId) },
        { $set: updateData },
        { returnDocument: 'after' }
      );
    return updatedCard;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteCardsByColumnId = async (columnId) => {
  try {
    const result = await getDB()
      .collection(CARD_COLLECTION_NAME)
      .deleteMany({ columnId: ObjectId.createFromHexString(columnId) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const cardModel = {
  CARD_COLLECTION_NAME,
  CARD_COLLECTION_SCHEMA,
  createCard,
  update,
  findOneById,
  deleteCardsByColumnId,
};
