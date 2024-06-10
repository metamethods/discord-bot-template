import { Plugin } from '@classes/Plugin';

import ping from './commands/ping';
import user from './commands/user';

import interactionCreate from './events/interactionCreate';
import ready from './events/ready';
import member from './commands/member';
import suggest from './commands/suggest';

// DO NOT remove any of the events that are imported here. (You can remove the commands if you want though)
export default new Plugin({
  name: 'Core',
  commands: [ping, user, member, suggest],
  events: [interactionCreate, ready]
});
