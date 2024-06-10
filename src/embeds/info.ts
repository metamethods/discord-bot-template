import type { EmbedBuilder } from 'discord.js';
import { defineEmbed } from '@util/embed';

export function successEmbed(text: string): EmbedBuilder {
  return defineEmbed({
    title: 'Success',
    description: text,
    color: 'Green'
  });
}

export function errorEmbed(text: string): EmbedBuilder {
  return defineEmbed({
    title: 'Uh oh!',
    description: text,
    color: 'Red'
  });
}
