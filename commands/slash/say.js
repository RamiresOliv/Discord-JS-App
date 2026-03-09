const {
  PermissionFlagsBits,
  AttachmentBuilder,
  SlashCommandBuilder,
} = require("discord.js");

exports.run = async (client, interaction) => {
  const msg = interaction.options.getString("content");
  const msgAttachment = interaction.options.getAttachment("attachment");
  if (
    !interaction.guild.members.me
      .permissionsIn(interaction.channel)
      .has(PermissionFlagsBits.ManageMessages)
  ) {
    return interaction.reply({
      content:
        ":question::x: Desculpe mas eu não consigo deletar mensagems nesse canal! :( `MANAGE_MESSAGES`",
      ephemeral: true,
    });
  }
  if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
    return interaction.reply({
      content:
        ":question::x: Desculpe mas você não pode usar esse comando! :( `MANAGE_MESSAGES`",
      ephemeral: true,
    });
  }
  if (msg == null && msgAttachment == null) {
    return interaction.reply({
      content:
        ":question::x: Esse comando precisa de uma mensagem! :( `MESSAGE_EMPTY`",
      ephemeral: true,
    });
  }

  var attach = [];
  if (msgAttachment != null) {
    const file = new AttachmentBuilder(
      msgAttachment.proxyURL,
      msgAttachment.name
    );
    attach.push(file);
  }

  if (msgAttachment != null && msg == "") {
    interaction.reply({
      content: "enviado.",
      ephemeral: true,
    });
    interaction.channel.send({
      files: attach,
    });
  } else {
    interaction.reply({
      content: "enviado.",
      ephemeral: true,
    });
    interaction.channel.send({
      content: msg,
      files: attach,
    });
  }
};

exports.config = new SlashCommandBuilder()
  .setName("say")
  .setDescription("Faz o bot falar qual quer coisa. 'Melhor usar _say text'")
  .addStringOption((option) =>
    option
      .setName("content")
      .setDescription("Oque devo falar?")
      .setMaxLength(2000)
  )
  .addAttachmentOption((option) =>
    option
      .setName("attachment")
      .setDescription("Imagens? Vídeos? Gifs? Scripts? Ou sei lá oque.")
  );

exports.others = {
  InVoiceChannel: false,
};
