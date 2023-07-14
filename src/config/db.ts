import mongoose from 'mongoose';

import { env } from '@config';

mongoose.connect(env.MONGODB_URI, {});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Successfully connected to MongoDB'));

export { db };