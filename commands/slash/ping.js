const { SlashCommandBuilder } = require("discord.js");

exports.run = async (client, interaction) => {
  await interaction.reply(
    `🏓Pong! A latência é de \`${
      Date.now() - interaction.createdTimestamp
    }ms\`. latência da API é de \`${Math.round(client.ws.ping)}ms\``
  );
};

exports.config = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Pong!");

exports.others = {
  InVoiceChannel: false,
};
