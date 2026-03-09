const { PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

exports.run = async (client, interaction) => {
  if (!interaction.member.permissions.has(PermissionFlagsBits.Connect)) {
    return interaction.reply({
      content:
        ":question::x: Desculpe mas você não pode entrar em canais de voz! :(",
      ephemeral: true,
    });
  }

  try {
    const queue = client.distube.getQueue(interaction.channel);
    if (!queue) {
      return interaction.reply({
        content: ":question::x: Não estou tocando nada para voltar.",
        ephemeral: true,
      });
    }

    const channel = interaction.member.voice.channel;
    if (queue && channel.id != queue.voiceChannel.id) {
      return interaction.reply({
        content:
          ":x: Você não pode usar esse comando. Pois já estou tocando alguma coisa em outro canal!",
        ephemeral: true,
      });
    }

    const next_song = await queue.previous();
    interaction.reply(
      ":track_previous: Voltando para a ultima música, que é `" +
        next_song.name +
        "`."
    );
  } catch (error) {
    console.log("skip error?:", error);
    return interaction.reply({
      content: ":question::x: Hm, Não foi possivel voltar!",
      ephemeral: true,
    });
  }
};

exports.config = new SlashCommandBuilder()
  .setName("previous")
  .setDescription("Volta para a ultima música.");

exports.others = {
  InVoiceChannel: true,
};
