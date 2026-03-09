const {
  EmbedBuilder,
  version,
  GuildMember,
  SlashCommandBuilder,
  AttachmentBuilder,
} = require("discord.js");
const { readFileSync } = require("fs");
const { ownerId } = require("../../configs/config.json");

exports.run = async (client, interaction, args) => {
  const used = process.memoryUsage().heapUsed / 1024 / 1024;

  const attachment = new AttachmentBuilder(
    __dirname + "/../../images/static/BotThumb.jpeg",
    { name: "thumb.jpeg" }
  );
  const embed = new EmbedBuilder()
    .setAuthor({
      name: "@" + client.owner.username + " - Developer",
      iconURL: client.owner.avatarURL(),
    })
    .setTitle("Minhas informações:")
    .setColor(interaction.guild.members.me.displayHexColor)
    .setThumbnail(client.user.avatarURL())
    .setDescription("Sobre algumas das minhas informações")
    .setFields(
      {
        name: ":tools: Como ele funciona: ",
        value: `Ele pesquisa pela melhor opção no YouTube e toca a musica, se for utilizado o Spotify, ele pesquisa a música pelo YouTube e toca a música pelo YouTube.`,
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
        name: ":card_box: Sistema de DataBase usada: ",
        value: `[Local Datastorage Express](https://www.npmjs.com/package/local-db-express)`,
      },
      {
        name: ":electric_plug: Sistema de Hospedagem usada: ",
        value: `Em busca de uma... _(Ainda)_`,
      }
    )
    .setImage(`attachment://${attachment.name}`)
    .setTimestamp();
  interaction.reply({
    embeds: [embed],
    files: [attachment],
  });
};

exports.config = new SlashCommandBuilder()
  .setName("botinfo")
  .setDescription("Mostra algumas informações sobre o bot");

exports.others = {
  InVoiceChannel: false,
};
