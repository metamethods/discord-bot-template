import { Command } from '@classes/Command';
import { memberEmbed } from '@embeds/user';
import { GuildMember, SlashCommandUserOption } from 'discord.js';
import { defineCommand } from '@util/command';

const command = new Command(
  defineCommand({
    name: 'member',
    description: 'Get user info',
    options: [
      new SlashCommandUserOption()
        .setName('member')
        .setDescription('The member to get info for')
    ]
  })
);

command.onCommand('member', async ({ interaction }) => {
  const member = interaction.options.getMember('member') ?? interaction.member;

  if (!member) return interaction.reply('Unknown member!');

  return interaction.reply({
    embeds: [memberEmbed(member as GuildMember)]
  });
});

export default command;
