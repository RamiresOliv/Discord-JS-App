const {
  EmbedBuilder,
  version,
  GuildMember,
  SlashCommandBuilder,
} = require("discord.js");
const { ownerId } = require("../../configs/config.json");

exports.run = async (client, message, args) => {
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  const embed = new EmbedBuilder()
    .setAuthor({
      name: "@" + client.owner.username + " - Developer",
      iconURL: client.owner.avatarURL(),
    })
    .setTitle("Minhas informações:")
    .setColor(message.guild.members.me.displayHexColor)
    .setThumbnail(client.user.avatarURL())
    .setDescription("Sobre algumas das minhas informações")
    .setFields(
      {
        name: "<:Ram:976592630999838740> Memoria em uso _(aproximadamente)_: ",
        value: `${Math.round(used * 100) / 100}MB`,
      },
      {
        name: ":package: Biblioteca: ",
        value: "[Discord.js " + version + "v](https://discord.js.org)",
      },
      {
        name: ":headphones: Sistema de Audio usado: ",
        value: `[DisTube](https://distube.js.org)`,
      },
      {
        name: ":paperclips: Sistema de DataBase usada: ",
        value: `[Local Datastorage Express](https://www.npmjs.com/package/local-db-express)`,
      },
      {
        name: "Sistema de Hospedagem usada: ",
        value: `Em busca de uma... _(Ainda)_`,
      }
    )
    .setTimestamp();
  message.reply({ embeds: [embed] });
};
exports.config = {
  name: "botinfo",
  usage: "botinfo",
  aliases: ["bi", "info", "bot"],
  description: "Mostra algumas informações sobre o bot",

  InVoiceChannel: false,
};
