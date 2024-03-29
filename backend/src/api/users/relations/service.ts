import { Types } from 'mongoose';

import { CustomError } from '@helpers/CustomError.js';

import { User } from '@api/users/model.js';

import { RelationStatus } from './schema.js';

type SendFriendRequestFields = {
  senderId: Types.ObjectId | string,
} & ({
  username: string,
} | {
  recipientId: Types.ObjectId | string,
});

const getRelation = async (senderId: Types.ObjectId | string, recipientId: Types.ObjectId | string) => {
  const user = await User.findById(recipientId, 'relations')
    .populate({
      path: 'relations.user',
      select: 'displayName username avatarUrl customStatus',
    });

  if (!user || !user.relations) return null;

  const relation = user.relations.find(r => r.userId.equals(senderId));

  return relation;
};

const getRelations = async (userId: Types.ObjectId | string, status: RelationStatus) => {
  const user = await User
    .findById(userId, 'relations')
    .populate({
      path: 'relations.user',
      select: 'displayName username avatarUrl customStatus',
    });

  if (!user) throw new CustomError(400, 'User not found.');

  const relations = (status)
    ? user.relations.filter(
      relation => relation.status.includes(status)
    )
    : user.relations;

  return relations;
};

const sendFriendRequest = async (options: SendFriendRequestFields) => {
  const { senderId } = options;

  const [sender, recipient] = await Promise.all([
    User.findById(senderId, 'relations'),
    'recipientId' in options
      ? User.findById(options.recipientId, 'relations')
      : User.findOne({ username: options.username.toLowerCase() }, 'relations')
  ]);

  if (!sender || !recipient) throw new CustomError(400, 'User not found.');

  if (sender._id.equals(recipient._id)) throw new CustomError(400, 'Cannot add self.');

  const relations = {
    sender: sender.relations.find(relation => relation.userId.equals(recipient._id)),
    recipient: recipient.relations.find(relation => relation.userId.equals(senderId)),
  };

  if (relations.recipient || relations.sender) {
    throw new CustomError(400, 'Relation already exists.', {
      sender: relations.sender || null,
      recipient: relations.recipient || null,
    });
  }

  recipient.relations.push({ userId: senderId, status: RelationStatus.PENDING_FROM });
  sender.relations.push({ userId: recipient._id, status: RelationStatus.PENDING_TO });

  await Promise.all([
    recipient.save(),
    sender.save(),
  ]);

  const relation = sender.relations.slice(-1)[0];

  return relation;
};

const acceptFriendRequest = async (userId: Types.ObjectId | string, relationId: Types.ObjectId | string) => {
  const user = await User.findById(userId, 'relations');

  if (!user) throw new CustomError(400, 'User not found.');

  const fromRelation = user.relations.id(relationId);

  if (!fromRelation || fromRelation.status !== RelationStatus.PENDING_FROM) throw new CustomError(400, 'Friend request does not exist.');

  const sender = await User.findById(fromRelation.userId, 'relations');

  if (!sender) throw new CustomError(400, 'User not found.');

  const toRelation = sender.relations.find(relation => relation.userId.equals(userId));

  if (!toRelation || toRelation.status !== RelationStatus.PENDING_TO) throw new CustomError(400, 'Unable to accept friend request.');

  toRelation.status = RelationStatus.FRIENDS;
  fromRelation.status = RelationStatus.FRIENDS;

  await Promise.all([user.save(), sender.save()]);

  return fromRelation;
};

const blockUser = async (senderId: Types.ObjectId | string, recipientId: Types.ObjectId | string) => {
  const [sender, recipient] = await Promise.all(
    [senderId, recipientId].map(id => User.findById(id, 'relations'))
  );

  if (!sender || !recipient) throw new CustomError(400, 'User not found.');

  const relations = {
    to: sender.relations.find(relation => relation.userId.equals(recipientId)),
    from: recipient.relations.find(relation => relation.userId.equals(senderId)),
  };

  const { to, from } = relations;

  if (to && to.status === RelationStatus.BLOCKED) throw new CustomError(400, 'User already blocked.');

  if (from && from.status !== RelationStatus.BLOCKED) recipient.relations.pull(from._id);

  if (to) {
    to.status = RelationStatus.BLOCKED;
  } else {
    sender.relations.push({ userId: recipientId, status: RelationStatus.BLOCKED });
  }

  await Promise.all([sender.save(), recipient.save()]);

  return to || sender.relations.slice(-1)[0];
};

const remove = async (userId: Types.ObjectId | string, relationId: Types.ObjectId | string) => {
  const user = await User.findById(userId, 'relations');

  if (!user) throw new CustomError(400, 'User not found.');

  const relation = user.relations.id(relationId);

  if (!relation) throw new CustomError(400, 'Relation does not exist');

  const { status } = relation;

  user.relations.pull(relation._id);

  if (status !== RelationStatus.BLOCKED) {
    const recipient = await User.findById(relation.userId, 'relations');

    if (!recipient) throw new CustomError(400, 'User not found.');
      
    const recipientRelation = recipient.relations.find(relation => relation.userId.equals(userId));

    if (recipientRelation) recipient.relations.pull(recipientRelation._id);

    await Promise.all([user.save(), recipient.save()]);
  } else {
    await user.save();
  }

  return relation;
};

export const relationService = {
  getRelation,
  getRelations,
  sendFriendRequest,
  acceptFriendRequest,
  blockUser,
  remove,
};