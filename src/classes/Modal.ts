import type {
  ChatInputCommandInteraction,
  Client,
  ModalBuilder,
  ModalSubmitInteraction,
  User
} from 'discord.js';
import type { Logger } from 'pino';

interface ModalSubmitHandlerOptions {
  client: Client;
  interaction: ModalSubmitInteraction;
  author: User;
  logger: Logger;
}

type ModalSubmitHandler = (
  options: ModalSubmitHandlerOptions
) => Promise<unknown>;

/**
 * A wrapper class for creating Modals.
 */
export class Modal {
  public submitHandler: ModalSubmitHandler | undefined;

  /**
   * Creates a new instance of the Modal class.
   * @param schema The schema for the modal.
   */
  constructor(public schema: ModalBuilder) {}

  /**
   * Handle the submission of the modal.
   * @param handler The handler function to be called when the modal is submitted.
   * @example
   * ```typescript
   * const modal = new Modal(schema);
   * modal.onSubmit(async (options) => {
   *   // Handle the submission logic here
   * });
   * ```
   */
  public async onSubmit(handler: ModalSubmitHandler) {
    this.submitHandler = handler;
  }

  /**
   * A wrapper function to show the modal to an interaction, which would show it to the end user.
   * @param interaction The interaction to show the modal to.
   * @example
   * ```typescript
   * const modal = new Modal(schema);
   * modal.show(interaction);
   * ```
   */
  public async show(interaction: ChatInputCommandInteraction) {
    await interaction.showModal(this.schema);
  }
}
