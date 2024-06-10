import {
  type ApplicationCommandOptionBase,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandGroupBuilder
} from 'discord.js';

/**
 * Represents the base schema for a command.
 */
interface BaseCommandSchema {
  name: string;
  description: string;
}

/**
 * Represents the schema for a command.
 */
interface CommandSchema extends BaseCommandSchema {
  options?: ApplicationCommandOptionBase[];
  subcommands?: (
    | SlashCommandSubcommandBuilder
    | SlashCommandSubcommandGroupBuilder
  )[];
  command?: SlashCommandBuilder;
}

/**
 * Defines a command using the provided schema.
 * @param schema - The schema for the command.
 * @returns The built SlashCommandBuilder.
 * @example
 * const commandSchema: CommandSchema = {
 *   name: 'example',
 *   description: 'An example command',
 *   options: [
 *     // Add command options here
 *   ],
 *   subcommands: [
 *     // Add subcommands here
 *   ]
 * };
 * const command = defineCommand(commandSchema);
 */
export function defineCommand(schema: CommandSchema): SlashCommandBuilder {
  const command =
    schema.command ??
    new SlashCommandBuilder()
      .setName(schema.name)
      .setDescription(schema.description);

  if (schema.options) command.options.push(...schema.options);
  if (schema.subcommands)
    for (const subcommand of schema.subcommands)
      if (subcommand instanceof SlashCommandSubcommandBuilder)
        command.addSubcommand(subcommand);
      else command.addSubcommandGroup(subcommand);

  return command;
}

/**
 * Represents the schema for a subcommand.
 */
interface SubcommandSchema extends BaseCommandSchema {
  options?: ApplicationCommandOptionBase[];
  command?: SlashCommandSubcommandBuilder;
}

/**
 * Defines a subcommand using the provided schema.
 * @param schema - The schema for the subcommand.
 * @returns The built SlashCommandSubcommandBuilder.
 * @example
 * const subcommandSchema: SubcommandSchema = {
 *   name: 'example',
 *   description: 'An example subcommand',
 *   options: [
 *     // Add subcommand options here
 *   ]
 * };
 * const subcommand = defineSubcommand(subcommandSchema);
 */
export function defineSubcommand(
  schema: SubcommandSchema
): SlashCommandSubcommandBuilder {
  const subcommand =
    schema.command ??
    new SlashCommandSubcommandBuilder()
      .setName(schema.name)
      .setDescription(schema.description);

  if (schema.options) subcommand.options.push(...schema.options);

  return subcommand;
}

/**
 * Represents the schema for a subcommand group.
 */
interface SubcommandGroupSchema extends BaseCommandSchema {
  subcommands: SlashCommandSubcommandBuilder[];
  command?: SlashCommandSubcommandGroupBuilder;
}

/**
 * Defines a subcommand group using the provided schema.
 * @param schema - The schema for the subcommand group.
 * @returns The built SlashCommandSubcommandGroupBuilder.
 * @example
 * const subcommandGroupSchema: SubcommandGroupSchema = {
 *   name: 'example',
 *   description: 'An example subcommand group',
 *   subcommands: [
 *     // Add subcommands here
 *   ]
 * };
 * const subcommandGroup = defineSubcommandGroup(subcommandGroupSchema);
 */
export function defineSubcommandGroup(
  schema: SubcommandGroupSchema
): SlashCommandSubcommandGroupBuilder {
  const group =
    schema.command ??
    new SlashCommandSubcommandGroupBuilder()
      .setName(schema.name)
      .setDescription(schema.description);

  for (const subcommand of schema.subcommands) group.addSubcommand(subcommand);

  return group;
}
