const { EmbedBuilder, Permissions } = require("discord.js");

exports.run = async (client, message, args) => {
  const queue = client.distube.getQueue(message);
  if (!queue) return message.channel.send(`:x: Nada está tocando :(`);

  var loopType = "O loop está desativado.";

  if (queue.repeatMode == 1) {
    loopType = "O loop está ativado apenas em uma música.";
  } else if (queue.repeatMode == 2) {
    loopType = "O loop está ativado na fila inteira.";
  }

  const Embed = new EmbedBuilder()
    .setTitle("Queue do servidor")
    .setColor("#5865f2")
    .setThumbnail(message.guild.iconURL())
    .setFooter({ text: loopType })
    .setTimestamp();

  queue.songs.map((song, i) => {
    if (i == 0) {
      Embed.addFields({
        name: "Tocando: " + song.name,
        value: "-------------------",
        inline: false,
      });
    } else {
      Embed.addFields({
        name: i + ". " + song.name,
        value: "-------------------",
        inline: false,
      });
    }
  });
  message.reply({ embeds: [Embed] });
};

exports.config = {
  name: "queue",
  usage: "queue",
  aliases: ["q", "fila"],
  description: "Mostra todas as músicas na fila.",

  InVoiceChannel: true,
};
