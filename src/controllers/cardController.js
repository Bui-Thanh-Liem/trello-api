import { StatusCodes } from 'http-status-codes';

import { cardService } from '~/services/cardService';

const createCard = async (req, res, next) => {
  try {
    const newCard = await cardService.createCard(req.body);
    res.status(StatusCodes.OK).json(newCard);
  } catch (error) {
    next(error);
  }
};

export const cardController = {
  createCard,
};
