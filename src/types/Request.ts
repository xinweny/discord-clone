import { IReqUser } from '@api/users/model';
import { IServer } from '@api/servers/model';
import { IServerMember } from '@api/serverMembers/model';
import { IDM } from '@api/dms/model';

declare module 'express-serve-static-core' {
  interface Request {
    user?: IReqUser,
    emoji?: Express.Multer.File,
    attachments?: Express.Multer.File[],
    server?: IServer,
    member?: IServerMember,
    dm?: IDM,
  }
}

export default Request;