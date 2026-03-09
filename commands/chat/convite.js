const { ActionRowBuilder, ButtonBuilder } = require("discord.js");

exports.run = async (client, message, args) => {
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setURL(
        "https://discord.com/api/oauth2/authorize?client_id=757666380723126345&permissions=8&scope=bot"
      )
      .setLabel("Invite")
      .setStyle("Link")
  );
  message.reply({
    content: "Ei quer me adicionar?! Então porfavor aperte no botão abaixo.",
    ephemeral: true,
    components: [row],
  });
};

exports.config = {
  name: "invite",
  usage: "invite",
  aliases: ["convite"],
  description: "Envia um link para adicionar o bot.",

  InVoiceChannel: false,
};
