import { Command } from '@classes/Command';
import { defineCommand } from '@util/command';

const command = new Command(
  defineCommand({
    name: 'ping',
    description: 'Pong!'
  })
);

command.onCommand('ping', async ({ interaction }) => {
  const reply = await interaction.reply({
    content: '🏓 Ping...',
    fetchReply: true
  });
  await interaction.editReply(
    `🏓 Ping... pong! Round trip took ${reply.createdTimestamp - interaction.createdTimestamp}ms!`
  );
});

export default command;
