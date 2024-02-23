import { slugify } from '~/utils/formatters';

const createNew = async (bodyReq) => {
  try {
    const boardNew = {
      ...bodyReq,
      slug: slugify(bodyReq.title),
    };

    // Gọi tới model để ghi vào database

    return boardNew;
  } catch (error) {
    throw new Error(error);
  }
};

export const boardServices = {
  createNew,
};
