const { PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");
const { getPrefix } = require("../../modules/serverPrefix.js");

exports.run = async (client, interaction) => {
  const prefix = await getPrefix(interaction.channel);

  const tips = [
    [
      "Quando for usar o comando `" +
        prefix +
        "play` ou (</play:" +
        client.SlashCommandData["play"].id +
        ">) você pode colocar por exemplo `EVVORTEX - FATAL` em vez de apenas o nome do video que seria `FATAL`, então use desse jeito: `[AUTOR DA música] - [NOME DA música]`, desse jeito facilita muito para o bot achar",
    ],
  ];

  const selectedTip = tips[Math.floor(Math.random() * tips.length)];
  return interaction.reply({
    content: selectedTip[0],
    files: selectedTip[1],
    ephemeral: true,
  });
};

exports.config = new SlashCommandBuilder()
  .setName("tip")
  .setDescription("Mostra uma dica boa para você");

exports.others = {
  InDev: true,
  InVoiceChannel: false,
};
