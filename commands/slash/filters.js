const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { filters } = require("../../configs/config.json");
const { getPrefix } = require("../../modules/serverPrefix.js");

exports.run = async (client, interaction) => {
  const prefix = await getPrefix(interaction.channel);

  const filtersTest = [
    "nightcore",
    "vaporwave",
    "flanger",
    "gate",
    "haas",
    "reverse",
    "surround",
    "mcompand",
    "phaser",
    "tremolo",
    "earwax",
    "bassboost",
    "superbassboost",
  ];

  const queue = client.distube.getQueue(interaction.channel);

  const Embed = new EmbedBuilder()
    .setTitle("Filtros disponiveis:")
    .setColor("#5865f2")
    .setDescription("Em breve sera adicionado os filtros personalizáveis!")
    .setThumbnail(interaction.guild.members.me.avatarURL())
    .setTimestamp();

  for (const filter of Object.keys(filters)) {
    Embed.addFields([
      {
        name: "Filtro: " + filter,
        value:
          "Metodo de uso: " +
          "</filter:" +
          client.SlashCommandData["filter"].id +
          "> `" +
          filter +
          "`\n----------------------",
        inline: false,
      },
    ]);
  }
  interaction.reply({ embeds: [Embed] });
};

exports.config = new SlashCommandBuilder()
  .setName("filters")
  .setDescription("Mostra todos os filtros disponiveis.");

exports.others = {
  InVoiceChannel: false,
};
