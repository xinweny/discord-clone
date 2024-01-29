import { Schema, Types } from 'mongoose';

export interface ICategory extends Types.Subdocument {
  name: string;
  channelIds: Types.ObjectId[];
}

const categorySchema = new Schema({
  name: { type: String, required: true },
  channelIds: { type: [Types.ObjectId], default: [] }
});

export { categorySchema };