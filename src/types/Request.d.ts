import { IReqUser } from '../api/users/User';
import { IServer } from '../api/servers/Server';
import { IServerMember } from '../api/servers/serverMembers/ServerMember';
import { IDM } from '../api/dms/DM';
import { IReaction } from '../api/messages/reactions/Reaction';

declare module 'express-serve-static-core' {
  interface Request {
    user?: IReqUser,
    avatar?: Express.Multer.File,
    banner?: Express.Multer.File,
    emoji?: Express.Multer.File,
    attachments?: Express.Multer.File[],
    server?: IServer,
    member?: IServerMember,
    dm?: IDM,
    reaction?: IReaction,
  }
}

export default Request;