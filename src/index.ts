import server from '@app/server';
import env from '@config/env';

server.listen(env.PORT, () => console.log(`Server listening on port ${env.PORT}`));