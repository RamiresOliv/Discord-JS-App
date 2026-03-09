const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

exports.run = async (client, interaction) => {
  const queue = client.distube.getQueue(interaction.channel);
  if (!queue) {
    return interaction.reply({
      content:
        ":question::x: Não foi possivel executar esse comando pois nenhuma música está tocando agora.",
      ephemeral: true,
    });
  }

  var loopType = "O loop está desativado.";

  if (queue.repeatMode == 1) {
    loopType = "O loop está ativado apenas em uma música.";
  } else if (queue.repeatMode == 2) {
    loopType = "O loop está ativado na fila inteira.";
  }

  const Embed = new EmbedBuilder()
    .setTitle("Queue do servidor")
    .setColor("#5865f2")
    .setThumbnail(interaction.guild.iconURL())
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
  interaction.reply({ embeds: [Embed] });
};

exports.config = new SlashCommandBuilder()
  .setName("queue")
  .setDescription("Mostra todas as músicas na fila.");

exports.others = {
  InVoiceChannel: false,
};
