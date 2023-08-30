import { Types } from 'mongoose';

import { Reaction } from './model';

interface IFields {
  reactorId: Types.ObjectId | string;
  countId: Types.ObjectId | string;
}

const getById = async (id: Types.ObjectId | string) => {
  return await Reaction.findById(id);
};

const getOne = async (fields: IFields) => {
 const reaction = await Reaction.findOne(fields);

 return reaction;
};

const create = async (fields: IFields) => {
  const reaction = new Reaction({
    ...fields,
  });

  await reaction.save();

  return reaction;
};

const remove = async (id: string) => {
  await Reaction.findByIdAndDelete(id);
};

export const reactionService = {
  create,
  getOne,
  getById,
  remove,
};