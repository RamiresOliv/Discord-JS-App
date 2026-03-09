const { SlashCommandBuilder } = require("discord.js");
const { getPrefix } = require("../../modules/serverPrefix.js");

exports.run = async (client, interaction) => {
  const current_prefix = await getPrefix(interaction);

  return interaction.reply({
    content: 'Porfavor use o comando "' + current_prefix + 'help" pois esse slash command ainda não está finalizado.',
    ephemeral: true,
  })
};

exports.config = new SlashCommandBuilder()
	.setName('help')
	.setDescription("Mostra os comandos disponiveis do bot.")

exports.others = {
  InVoiceChannel: false,
}