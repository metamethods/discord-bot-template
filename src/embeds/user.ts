import type { EmbedBuilder, GuildMember, User } from 'discord.js';
import { defineEmbed, defineField } from '@util/embed';

export function userEmbed(user: User): EmbedBuilder {
  return defineEmbed({
    title: user.username,
    images: {
      thumbnail: user.displayAvatarURL({ size: 256 }),
      image: user.displayAvatarURL({ size: 1024 })
    },
    fields: [
      defineField('User ID', user.id),
      defineField('Created At', user.createdAt.toDateString()),
      defineField('Bot', user.bot ? 'Yes' : 'No'),
      defineField('System', user.system ? 'Yes' : 'No'),
      defineField('Badges', user.flags?.toArray().join(', ') || 'None')
    ]
  });
}

export function memberEmbed(member: GuildMember): EmbedBuilder {
  return defineEmbed({
    title: member.displayName,
    images: {
      thumbnail: member.user.displayAvatarURL({ size: 256 }),
      image:
        // member.user.bannerURL({ size: 1024 }) ??
        member.user.displayAvatarURL({ size: 1024 })
    },
    fields: [
      defineField('User ID', member.id),
      defineField('Joined At', member.joinedAt?.toDateString() ?? 'Unknown'),
      defineField('Created At', member.user.createdAt.toDateString()),
      defineField('Bot', member.user.bot ? 'Yes' : 'No'),
      defineField('System', member.user.system ? 'Yes' : 'No'),
      defineField('Badges', member.user.flags?.toArray().join(', ') || 'None'),
      defineField(
        'Roles',
        member.roles.cache.map((role) => role.name).join(', ')
      )
    ]
  });
}
