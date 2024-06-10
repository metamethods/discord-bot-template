import { Modal } from '@classes/Modal';
import { TextInputStyle } from 'discord.js';
import { defineTextComponent } from '@util/component';
import { defineModal } from '@util/modal';

const modal = new Modal(
  defineModal({
    id: 'suggestion',
    title: 'Suggestion',
    fields: [
      defineTextComponent({
        id: 'suggestion',
        label: 'Suggestion',
        style: TextInputStyle.Paragraph,
        placeholder: 'Enter your suggestion here...',
        required: true,
        length: {
          min: 10,
          max: 1024
        }
      })
    ]
  })
);

modal.onSubmit(async ({ interaction }) => {
  const suggestion = interaction.fields.getTextInputValue('suggestion');

  const reply = await interaction.reply({
    content: `Thanks for your suggestion, it will now be thrown into the void! Heres what you said: \`${suggestion}\``,
    fetchReply: true
  });
  await new Promise((resolve) => setTimeout(resolve, 5000));
  await reply.delete();
});

export default modal;
