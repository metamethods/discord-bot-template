import { Command } from '@classes/Command';
import { userEmbed } from '@embeds/user';
import { SlashCommandStringOption } from 'discord.js';
import { defineCommand } from '@util/command';

const command = new Command(
  defineCommand({
    name: 'user',
    description: 'Get user info',
    options: [
      new SlashCommandStringOption()
        .setName('user')
        .setDescription('The UserId to get info for')
    ]
  })
);

command.onCommand('user', async ({ interaction, author, client }) => {
  const userId = interaction.options.getString('user') ?? author.id;
  const user = await client.users.fetch(userId).catch(() => null);

  if (!user) return interaction.reply('Unknown user!');

  return interaction.reply({
    embeds: [userEmbed(user)]
  });
});

export default command;
