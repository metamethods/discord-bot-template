import { ActionRowBuilder, ModalBuilder, TextInputBuilder } from 'discord.js';

interface ModalSchema {
  id: string;
  title: string;
  fields: TextInputBuilder[];
}

/**
 * Helper function to define a modal.
 * @param schema - Define the modal.
 * @returns {ModalBuilder} The modal that is built from the schema.
 */
export function defineModal(schema: ModalSchema): ModalBuilder {
  const modal = new ModalBuilder()
    .setCustomId(schema.id)
    .setTitle(schema.title);

  modal.addComponents(
    ...schema.fields.map((field) =>
      new ActionRowBuilder<TextInputBuilder>().addComponents(field)
    )
  );

  return modal;
}
