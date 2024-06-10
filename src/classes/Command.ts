/**
 * Represents a command in a Discord bot.
 */
import {
  Collection,
  type ChatInputCommandInteraction,
  type Client,
  type SlashCommandBuilder,
  type User
} from 'discord.js';

/**
 * Custom options for a command.
 */
interface CommandOptions {}

/**
 * Options for a command handler.
 */
interface CommandHandlerOptions {
  interaction: ChatInputCommandInteraction;
  client: Client;
  author: User;
}

/**
 * A function that handles a command.
 */
type CommandHandler = (options: CommandHandlerOptions) => Promise<unknown>;

/**
 * A wrapper class for creating Commands.
 */
export class Command {
  /**
   * Collection of command handlers.
   */
  public commandHandlers: Collection<string, CommandHandler> = new Collection();

  /**
   * Creates a new Command instance.
   * @param schema The command schema.
   * @param options The command options.
   */
  constructor(
    public schema: SlashCommandBuilder,
    public options: CommandOptions = {}
  ) {}

  /**
   * Get the JSON representation of the command schema.
   * @returns The JSON representation of the command schema.
   * @example
   * ```typescript
   * const command = new Command(schema, options);
   * const json = command.toJSON();
   * console.log(json);
   * ```
   */
  public toJSON() {
    return this.schema.toJSON();
  }

  /**
   * Register a command handler for this command.
   * @param command A string representing the command name.
   * @param handler The handler function to be called when the command is invoked.
   * @example
   * ```typescript
   * const command = new Command(schema, options);
   * command.onCommand('ping', async (options) => {
   *   // Handle the 'ping' command
   * });
   * ```
   * @example
   * ```typescript
   * const command = new Command(schema, options);
   * const.onCommand('ping.sub', async (options) => {
   *  // Handle the subcommand 'sub' in the 'ping' command
   * });
   * ```
   */
  public onCommand(command: string, handler: CommandHandler) {
    this.commandHandlers.set(command, handler);
  }
}
