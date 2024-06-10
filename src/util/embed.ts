import {
  Collection,
  EmbedBuilder,
  type ColorResolvable,
  type EmbedField,
  type EmbedFooterOptions
} from 'discord.js';

interface EmbedSchema {
  title: string;
  description?: string;
  images?: {
    thumbnail?: string;
    image?: string;
  };
  color?: ColorResolvable;
  fields?: EmbedField[];
  footer?: EmbedFooterOptions;
}

/**
 * Helper function to define an embed.
 * @param schema - The schema to define the embed.
 * @returns {EmbedBuilder} The embed that is built from the schema.
 * @example
 * const embedSchema = {
 *   title: 'Example Embed',
 *   description: 'This is an example embed.',
 *   color: 'BLUE',
 *   fields: [
 *     defineField('Field 1', 'Value 1'),
 *     defineField('Field 2', 'Value 2', true)
 *   ],
 *   footer: defineFooter('Example Footer', 'https://example.com/footer-icon.png')
 * };
 * const embed = defineEmbed(embedSchema);
 */
export function defineEmbed(schema: EmbedSchema): EmbedBuilder {
  return new EmbedBuilder()
    .setTitle(schema.title)
    .setDescription(schema.description ?? null)
    .setColor(schema.color ?? null)
    .setFooter(schema.footer ?? null)
    .setImage(schema.images?.image ?? null)
    .setThumbnail(schema.images?.thumbnail ?? null)
    .addFields(schema.fields ?? [])
    .setTimestamp();
}

/**
 * Helper function to define a field for an embed.
 * @param name - The name of the field.
 * @param value - The value of the field.
 * @param inline - Whether the field should be displayed inline or not.
 * @returns {EmbedField} The defined field.
 * @example
 * const field = defineField('Field Name', 'Field Value', true);
 */
export function defineField(
  name: string,
  value: string,
  inline = false
): EmbedField {
  return { name, value, inline };
}

/**
 * Convert a collection to an array of embed fields.
 * @param collection - The collection to convert.
 * @returns {EmbedField[]} The array of embed fields.
 * @example
 * const collection = new Collection<string, string | { text: string; inline?: boolean }>();
 * collection.set('Field 1', 'Value 1');
 * collection.set('Field 2', { text: 'Value 2', inline: true });
 * const fields = collectionToFields(collection);
 */
export function collectionToFields(
  collection: Collection<string, string | { text: string; inline?: boolean }>
): EmbedField[] {
  return collection.map((value, name) =>
    defineField(
      name,
      typeof value == 'string' ? value : value.text,
      typeof value == 'object' ? value.inline : false
    )
  );
}

/**
 * Helper function to define a footer for an embed.
 * @param text - The text of the footer.
 * @param [iconURL] - The URL of the footer icon.
 * @returns {EmbedFooterOptions} The defined footer.
 * @example
 * const footer = defineFooter('Footer Text', 'https://example.com/footer-icon.png');
 */
export function defineFooter(
  text: string,
  iconURL?: string
): EmbedFooterOptions {
  return { text, iconURL };
}
