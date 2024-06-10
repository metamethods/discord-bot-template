# Discord Bot Template
This is a full typescript discord bot template thats super customizeable!

## Features
- Command Handler
- Command/Event Hot reloading
- Easy to use API

## Installation
### Requirements
- [Bun](https://bun.sh/) _This is mainly used for hot reloading the bot_
- [ESlint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Node.js](https://nodejs.org/en/) _For running the out/index.js file if you built it_

### Steps
1. Clone the repository
2. Run `bun install` (or `bun i`) to install the dependencies
3. Add in the necessary environment variables in a `.env` file:
```conf
BOT_TOKEN="..."
BOT_ID="..."

LOG_LEVEL="debug" # Use 'info' for production
```
3. Run `bun dev` to start the bot in development mode
4. Profit!!!

## Usage
### Adding Commands
To create commands, you can either make a new plugin, or use the alread existing core plugin in `src/plugins/core`. To create a new plugin, please refer to [Creating Plugins](#creating-plugins).
In the desired plugin folder, create a new file in the `commands` folder with the following template:
```typescript
import { Command } from '@classes/Command';
import { defineCommand } from '@util/command';

// Create a new command
const command = new Command(
  defineCommand({
    name: 'my-command',
    description: 'Wow a very cool command!'
  })
);

// Handle the command
command.onCommand('my-command', async ({ interaction }) => {
  await interaction.reply('Hello World!');
});

// And export the command for it to be used in the Plugin file
export default command;
```
Then in the plugin file, (which is the `index.ts` file) import the command and add it to the plugin:
```typescript
...
import myCommand from './commands/my-command';

export default new Plugin({
  name: 'MyPlugin',
  commands: [..., myCommand],
  events: [...]
});
```
And that's it! The command should now be available in the bot when you save when running the bot via `bun dev`.

### Creating Plugins
To create a new plugin, create a new folder in the `src/plugins` folder with the name of the plugin. Inside the folder, you will create a new `index.ts` file with the following template:
```typescript
import { Plugin } from '@classes/Plugin';

export default new Plugin({
  name: 'MyPlugin', // The name of the plugin (used for logging and debugging)
  commands: [...], // Add your commands here
  events: [...], // Add your events here
  private: true, // If the plugin commands should be restricted to a specific guild (Events are always global)
  guildId: '000000000000000000' // The guild id to restrict the commands to
});
```
Then just add the commands and events to the `commands` and `events` arrays respectively. You can take a look in the `src/plugins/core` as an example. __DO NOT__ delete the `core` plugin as it is required for the bot to function properly.

### Creating Modals
To create a modal that can be used in a command, create a new file in the `src/modals` folder with the following template:
```typescript
import { Modal } from '@classes/Modal';
import { TextInputStyle } from 'discord.js';
import { defineTextComponent } from '@util/component';
import { defineModal } from '@util/modal';

const modal = new Modal(
  defineModal({
    id: 'mymodal',
    title: 'My Modal',
    fields: [
      defineTextComponent({
        id: 'input',
        ...
      })
    ]
  })
);

modal.onSubmit(async ({ interaction }) => {
  const input = interaction.fields.getTextInputValue('input');

  await interaction.reply(`You entered: ${input}!`);
});

export default modal;
```
Then in the `index.ts` file of the modals folder, import the modal and add it to the modals array.
You can now use the modal in a command by importing it into a command and running modal.show(chatInputInteraction) to show the modal to the user.
```typescript
...
import myModal from '@modals/my-modal';

command.onCommand('my-command', async ({ interaction }) => {
  await myModal.show(interaction);
});
```

## Contributing
Contributions are always welcome! This is most likely unstable, and a bit messy, so any help is appreciated!