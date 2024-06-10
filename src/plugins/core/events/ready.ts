import { Event } from '@classes/Event';
import { createLogger } from '@util/logger';

const logger = createLogger({ name: 'ready' });

export default Event.once('ready', async (client) => {
  logger.info(`Logged in as ${client.user?.tag}!`);
});
