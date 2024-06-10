import type { Event } from '@classes/Event';
import type { Command } from './Command';

interface PluginOptions<Private extends boolean> {
  /**
   * Represents the options for a plugin.
   *
   * @template Private - A type parameter indicating whether the plugin is private or not.
   */
  name: string;
  /**
   * Commands that are part of this plugin.
   */
  commands?: Command[];
  /**
   * Events that will be registered with the client.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  events?: Event<any>[];
  /**
   * Whether or not this plugin should only be available in a specific guild.
   */
  private?: Private;
  /**
   * The guild ID that this plugin should be restricted to.
   *
   * @template Private - A type parameter indicating whether the plugin is private or not.
   */
  guildId?: Private extends true ? string : never;
}

/**
 * Contains a set of commands and events that can be registered with the client.
 * You can also restrict the plugin to only be available in a specific guild.
 */
export class Plugin<Private extends boolean> {
  constructor(public options: PluginOptions<Private>) {}
}
