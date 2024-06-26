import { Command } from '@classes/Command';
import { defineCommand } from '@util/command';

import suggestion from '@modals/suggestion';

const command = new Command(
  defineCommand({
    name: 'suggest',
    description: 'Suggest a feature'
  })
);

command.onCommand('suggest', async ({ interaction }) => {
  await suggestion.showModal(interaction);
});

export default command;
