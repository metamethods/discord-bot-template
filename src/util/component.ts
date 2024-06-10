import { TextInputBuilder, TextInputStyle } from 'discord.js';

interface TextComponentSchema {
  id: string;
  label: string;
  style: TextInputStyle;
  placeholder?: string;
  required?: boolean;
  length?: {
    min?: number;
    max?: number;
  };
}

/**
 * Defines a text component based on the provided schema.
 * @param schema - The schema object containing the configuration for the text component.
 * @returns A TextInputBuilder instance representing the defined text component.
 * @example
 * // Define a text component with required fields
 * const schema = {
 *   id: 'textComponent',
 *   label: 'Enter your name',
 *   style: 'PRIMARY',
 *   required: true,
 * };
 * const textComponent = defineTextComponent(schema);
 *
 * // Define a text component with optional fields
 * const schema = {
 *   id: 'textComponent',
 *   label: 'Enter your email',
 *   style: 'SECONDARY',
 *   placeholder: 'example@example.com',
 *   length: {
 *     min: 5,
 *     max: 50,
 *   },
 * };
 * const textComponent = defineTextComponent(schema);
 */
export function defineTextComponent(
  schema: TextComponentSchema
): TextInputBuilder {
  const component = new TextInputBuilder()
    .setCustomId(schema.id)
    .setLabel(schema.label)
    .setStyle(schema.style)
    .setRequired(schema.required);

  if (schema.placeholder) component.setPlaceholder(schema.placeholder);
  if (schema.length) {
    if (schema.length.min) component.setMinLength(schema.length.min);
    if (schema.length.max) component.setMaxLength(schema.length.max);
  }

  return component;
}
