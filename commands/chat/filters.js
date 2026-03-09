const { EmbedBuilder } = require("discord.js");
const { filters } = require("../../configs/config.json");
const { getPrefix } = require("../../modules/serverPrefix.js");

exports.run = async (client, message, args) => {
  const prefix = await getPrefix(message);

  const filtersTEST = [
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
  ];

  const queue = client.distube.getQueue(message);

  const Embed = new EmbedBuilder()
    .setTitle("Filtros disponiveis:")
    .setColor("#5865f2")
    .setDescription("Em breve sera adicionado os filtros personalizáveis!")
    .setThumbnail(message.guild.members.me.avatarURL())
    .setTimestamp();

  for (const filter of Object.keys(filters)) {
    Embed.addFields([
      {
        name: "Filtro: " + filter,
        value:
          "Metodo de uso: `" +
          prefix +
          "filter " +
          filter +
          "`\n----------------------",
        inline: false,
      },
    ]);
  }
  message.reply({ embeds: [Embed] });
};

exports.config = {
  name: "filters",
  usage: "filters",
  aliases: ["filtros", "filtragens", "filtering"],
  description: "Mostra todos os filtros disponiveis.",

  InVoiceChannel: false,
};
