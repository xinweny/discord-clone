import { IReqUser } from '@api/users/model';
import { IServer } from '@api/servers/model';
import { IServerMember } from '@api/serverMembers/model';
import { IDM } from '@api/dms/model';
import { IReaction } from '@api/messages/reactions/model';

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