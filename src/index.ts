import 'dotenv/config';

import {
  Client,
  Collection,
  GatewayIntentBits,
  REST,
  Routes
} from 'discord.js';
import { createLogger } from '@util/logger';
import { sum } from '@util/array';
import type { Command } from '@classes/Command';

import plugins from '@plugins';

export const client =
  globalThis.client ??
  new Client({
    intents: [GatewayIntentBits.Guilds]
  });
export const groupedCommands: Collection<'global' | string, Command[]> =
  new Collection();

const logger = createLogger({
  name: 'client'
});

logger.info('Removing any existing listeners');
client.removeAllListeners();

for (const plugin of plugins) {
  const options = plugin.options;

  logger.debug(`Processing plugin ${options.name}`);

  if (options.events)
    for (const event of options.events) {
      logger.debug(`Attaching event listener ${event.event} (${event.type})`);
      client[event.type](event.event, event.handler);
    }

  if (options.commands)
    groupedCommands.set(
      options.guildId ?? 'global',
      (groupedCommands.get(options.guildId ?? 'global') ?? []).concat(
        options.commands
      )
    );
}

if (
  !globalThis.registeredGroupedCommands ||
  JSON.stringify(
    globalThis.registeredGroupedCommands.map((commands) =>
      commands.map((command) => command.toJSON())
    )
  ) !==
    JSON.stringify(
      groupedCommands.map((commands) =>
        commands.map((command) => command.toJSON())
      )
    )
) {
  const rest = new REST().setToken(process.env.BOT_TOKEN);

  logger.info('Refreshing application commands...');
  logger.debug(
    `Registering a total of ${sum(groupedCommands.map((commands) => commands.length))} commands`
  );

  await Promise.all(
    groupedCommands.map((commands, guildId) =>
      rest.put(
        guildId === 'global'
          ? Routes.applicationCommands(process.env.BOT_ID)
          : Routes.applicationGuildCommands(process.env.BOT_ID, guildId),
        {
          body: commands.map((command) => command.toJSON())
        }
      )
    )
  );

  globalThis.registeredGroupedCommands = groupedCommands;
}

if (!globalThis.client) {
  logger.debug('Starting a fresh client instance...');

  globalThis.client = client;
  client.login(process.env.BOT_TOKEN);
} else {
  logger.debug('A client instance already exists');
}
