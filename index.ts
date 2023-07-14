import server from './src/server';
import { env } from './src/config/env';

server.listen(env.PORT, () => console.log(`Server listening on port ${env.PORT}`));
