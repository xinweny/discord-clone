import { Schema, Types } from 'mongoose';

export interface ICount extends Types.Subdocument {
  _id: Types.ObjectId;
  name: string;
  count: number;
  type: 'custom' | 'default';
}

const countSchema = new Schema({
  name: { type: String, required: true },
  count: { type: Number, default: 1 },
});

export { countSchema };