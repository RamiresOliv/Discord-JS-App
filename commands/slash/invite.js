const { ActionRowBuilder, ButtonBuilder, SlashCommandBuilder } = require("discord.js");

exports.run = async (client, interaction) => {
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setURL(
        "https://discord.com/api/oauth2/authorize?client_id=" + client.user.id + "&permissions=8&scope=bot"
      )
      .setLabel("Invite")
      .setStyle("Link")
  );
  interaction.reply({
    content: "Ei quer me adicionar?! Então porfavor aperte no botão abaixo.",
    ephemeral: false,
    components: [row],
  });
};

exports.config = new SlashCommandBuilder()
	.setName('invite')
	.setDescription("Envia um link para adicionar o bot.")

exports.others = {
  InVoiceChannel: false,
}