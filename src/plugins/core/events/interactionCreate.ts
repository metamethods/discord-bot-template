import type { Command } from '@classes/Command';
import { Event } from '@classes/Event';
import type {
  ChatInputCommandInteraction,
  ModalSubmitInteraction
} from 'discord.js';
import { tryOrDefault } from '@util/try';
import { createLogger } from '@util/logger';

import plugins from '@plugins';
import modals from '@modals';

const logger = createLogger({ name: 'interaction' });

async function chatCommand(interaction: ChatInputCommandInteraction) {
  const commandName = interaction.commandName;
  const commandLogger = logger.child({
    command: commandName,
    author: interaction.user.username
  });
  commandLogger.info(`Received command`);

  let command: Command | undefined;

  // prioritize private commands
  for (const plugin of plugins) {
    if (
      plugin.options.private &&
      plugin.options.guildId === interaction.guildId
    ) {
      command = plugin.options.commands?.find(
        (command) => command.schema.name === commandName
      );
      if (command) break;
    }
  }

  // fallback to public commands
  for (const plugin of plugins) {
    if (!plugin.options.private) {
      command = plugin.options.commands?.find(
        (command) => command.schema.name === commandName
      );
      if (command) break;
    }
  }

  if (!command) return commandLogger.warn(`Command ${commandName} not found`);

  const handlerKey = [
    commandName,
    interaction.options.getSubcommandGroup(),
    tryOrDefault(() => interaction.options.getSubcommand(), undefined)
  ]
    .filter(Boolean)
    .join('.');
  const handler = command.commandHandlers.get(handlerKey);

  if (!handler)
    return commandLogger.warn(`Unhandled command for ${handlerKey}`);

  try {
    await handler({
      interaction,
      client: interaction.client,
      author: interaction.user
    });
  } catch (error) {
    return commandLogger.error(
      `Failed to handle command for ${handlerKey} due to: ${error}`
    );
  }

  commandLogger.info(`Successfully handled command for ${handlerKey}!`);
}

async function modalInteraction(interaction: ModalSubmitInteraction) {
  const modalId = interaction.customId;
  const modalLogger = logger.child({
    modal: modalId,
    author: interaction.user.username
  });

  const modal = modals.find((modal) => modal.schema.data.custom_id === modalId);

  if (!modal) return modalLogger.warn(`Modal ${modalId} not found`);
  if (!modal.submitHandler)
    return modalLogger.warn(`Unhandled modal for ${modalId}`);

  try {
    await modal.submitHandler({
      client: interaction.client,
      interaction,
      author: interaction.user,
      logger: modalLogger
    });
  } catch (error) {
    return modalLogger.error(`Failed to handle modal due to: ${error}`);
  }
}

export default Event.on('interactionCreate', async (interaction) => {
  if (interaction.isChatInputCommand()) return chatCommand(interaction);
  if (interaction.isModalSubmit()) return modalInteraction(interaction);
});
