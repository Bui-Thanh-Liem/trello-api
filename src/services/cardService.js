import { cardModel } from '~/models/cardModel';
import { columnModel } from '~/models/columnModel';

const createCard = async (reqBody) => {
  try {
    const cardNewData = {
      ...reqBody,
    };

    const createCard = await cardModel.createCard(cardNewData);
    const getCardNew = await cardModel.findOneById(createCard.insertedId);

    // Update cardOrderIds trong Column
    await columnModel.updateCardOrderIds(getCardNew);

    return getCardNew;
  } catch (error) {
    throw new Error(error);
  }
};

export const cardService = {
  createCard,
};
