import type {
  RolePermissionNames,
  RolePermissionsData,
} from '@types';

export const PERMISSION_DESCRIPTIONS: {
  [key: string]: {
    [key in RolePermissionNames]?: string;
  };
} = {
  'General Server Permissions': {
    viewChannels: 'Allows members to view channels by default (excluding private channels).',
    manageChannels: 'Allows members to create, edit or delete channels.',
    manageRoles: 'Allows members to create new roles and edit or delete roles lower than their highest role.',
    manageExpressions: 'Allows members to add custom emojis, stickers and sounds in this server.',
    manageServer: 'Allows members to change this server\'s name, description, icon and banner.',
  },
  'Membership Permissions': {
    createInvite: 'Allows members to invite new people to this server',
    kickMembers: 'Allows members to remove other members from this server.',
  },
  'Text Channel Permissions': {
    sendMessages: 'Allows members to send messages in text channels.',
    addReactions: 'Allows members to add new emoji reactions to a message.',
    manageMessages: 'Allows members to delete messages by other members or pin any message.',
  },
  'Voice Channel Permissions': {
    joinCall: 'Allows members to join voice channels and hear others.',
    speak: 'Allow members to talk in voice channels.',
    video: 'Allow members to share their video or screen share.',
  },
  'Advanced Permissions': {
    administrator: 'Members with this permissions will have every permission and will also bypass all channel specific permissions or restrictions. This is a dangerous permission to grant.',
  },
};

export const PERMISSION_NAMES: RolePermissionNames[] = [
  'viewChannels',
  'manageChannels',
  'manageRoles',
  'manageExpressions',
  'manageServer',
  'createInvite',
  'kickMembers',
  'sendMessages',
  'addReactions',
  'manageMessages',
  'joinCall',
  'speak',
  'video',
  'administrator',
];

export const RESET_PERMISSIONS: RolePermissionsData = PERMISSION_NAMES.reduce(
  (o, key) => ({ ...o, [key]: false }),
  {} as RolePermissionsData
);