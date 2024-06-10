/* eslint-disable no-var */
import type { Command } from '@classes/Command';
import type { Client, Collection } from 'discord.js';
import type { LevelWithSilentOrString } from 'pino';

declare global {
  var client: Client;
  var registeredGroupedCommands: Collection<'global' | string, Command[]>;

  namespace NodeJS {
    interface ProcessEnv {
      BOT_TOKEN: string;
      BOT_ID: string;

      LOG_LEVEL: LevelWithSilentOrString;
    }
  }
}

export {};
