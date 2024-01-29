export type RolePermissionNames =
'administrator' |
'viewChannels' |
'manageChannels' |
'manageRoles' |
'manageExpressions' |
'kickMembers' |
'manageServer' |
'createInvite' |
'sendMessages' |
'manageMessages' |
'addReactions' |
'joinCall' |
'speak' |
'video';

export type RolePermissionsData = {
  [key in RolePermissionNames]: boolean;
};